import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Package, Clock, User } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface Vendor {
  id: string;
  location: string;
  coordinates: { lat: number; lng: number };
  wasteType: string;
  quantity: string;
  status: 'available' | 'assigned' | 'collected';
  submittedAt: string;
  contactPhone?: string;
}

interface LeafletMapProps {
  vendors: Vendor[];
  userRole: 'government' | 'kabadiwala';
  onAcceptTask?: (vendorId: string) => void;
}

// Fix default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const LeafletMap: React.FC<LeafletMapProps> = ({ vendors, userRole, onAcceptTask }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  const getMarkerIcon = (status: string) => {
    const color = status === 'available' ? '#22c55e' : 
                  status === 'assigned' ? '#f59e0b' : '#6b7280';
    
    return L.divIcon({
      className: 'custom-div-icon',
      html: `
        <div style="
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: ${color};
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          color: white;
          font-weight: bold;
        ">
          📦
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
  };

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView([28.6139, 77.2090], 11);

    // Add OpenStreetMap tiles (no API key required)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || !vendors.length) return;

    // Clear existing markers
    markersRef.current.forEach(marker => {
      mapInstanceRef.current?.removeLayer(marker);
    });
    markersRef.current = [];

    // Add new markers
    vendors.forEach((vendor) => {
      const marker = L.marker([vendor.coordinates.lat, vendor.coordinates.lng], {
        icon: getMarkerIcon(vendor.status)
      }).addTo(mapInstanceRef.current!);

      const popupContent = `
        <div style="padding: 8px; min-width: 200px; font-family: system-ui;">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
            <h4 style="margin: 0; font-weight: 600; font-size: 14px;">Vendor #${vendor.id}</h4>
            <span style="
              background: ${vendor.status === 'available' ? '#22c55e' : vendor.status === 'assigned' ? '#f59e0b' : '#6b7280'}; 
              color: white; 
              padding: 2px 6px; 
              border-radius: 8px; 
              font-size: 11px;
              text-transform: capitalize;
            ">
              ${vendor.status}
            </span>
          </div>
          <div style="color: #666; font-size: 13px; line-height: 1.4;">
            <div style="margin-bottom: 3px;">📍 ${vendor.location}</div>
            <div style="margin-bottom: 3px;">📦 ${vendor.wasteType} - ${vendor.quantity}</div>
            <div style="margin-bottom: 3px;">🕒 ${vendor.submittedAt}</div>
            ${vendor.contactPhone && userRole === 'kabadiwala' ? 
              `<div style="margin-bottom: 6px;">📞 ${vendor.contactPhone}</div>` : ''}
            ${userRole === 'kabadiwala' && vendor.status === 'available' && onAcceptTask ? 
              `<button 
                onclick="window.acceptTask('${vendor.id}')" 
                style="
                  background: #3b82f6; 
                  color: white; 
                  border: none; 
                  padding: 6px 12px; 
                  border-radius: 4px; 
                  cursor: pointer; 
                  width: 100%; 
                  margin-top: 6px;
                  font-size: 12px;
                "
              >
                Accept Task
              </button>` : ''}
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);
      
      marker.on('click', () => {
        setSelectedVendor(vendor);
      });

      markersRef.current.push(marker);
    });

    // Fit map bounds to show all markers
    if (vendors.length > 0) {
      const group = L.featureGroup(markersRef.current);
      mapInstanceRef.current.fitBounds(group.getBounds(), { padding: [20, 20] });
    }

    // Set up global accept task function
    (window as any).acceptTask = (vendorId: string) => {
      if (onAcceptTask) {
        onAcceptTask(vendorId);
      }
    };

  }, [vendors, userRole, onAcceptTask]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            {userRole === 'government' ? 'City Waste Collection Overview' : 'Available Collection Tasks'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div 
              ref={mapRef} 
              className="w-full h-96 rounded-lg border border-border"
              style={{ minHeight: '400px' }}
            />
            
            {/* Map Legend */}
            <div className="absolute bottom-4 right-4 bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-border">
              <div className="text-xs space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-warning"></div>
                  <span>Assigned</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-muted"></div>
                  <span>Collected</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vendor List */}
      <div className="grid gap-4">
        <h3 className="text-lg font-semibold">
          {userRole === 'government' ? 'Recent Submissions' : 'Task List'}
        </h3>
        <div className="grid gap-3">
          {vendors.map((vendor) => (
            <Card 
              key={vendor.id} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => {
                if (mapInstanceRef.current) {
                  mapInstanceRef.current.setView([vendor.coordinates.lat, vendor.coordinates.lng], 15);
                  // Find and open the marker popup
                  const marker = markersRef.current.find((m, index) => 
                    vendors[index].id === vendor.id
                  );
                  if (marker) {
                    marker.openPopup();
                  }
                }
                setSelectedVendor(vendor);
              }}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">Vendor #{vendor.id}</h4>
                      <Badge variant={vendor.status === 'available' ? 'default' : 'secondary'}>
                        {vendor.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {vendor.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Package className="h-3 w-3" />
                        {vendor.wasteType} - {vendor.quantity}
                      </div>
                    </div>
                  </div>
                  {userRole === 'kabadiwala' && vendor.status === 'available' && onAcceptTask && (
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAcceptTask(vendor.id);
                      }}
                    >
                      Accept
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeafletMap;