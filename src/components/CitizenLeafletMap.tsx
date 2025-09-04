import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Package, Clock, User, Camera } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Vendor, CitizenReport, MissedCall } from '@/data/demoData';

interface CitizenLeafletMapProps {
  vendors?: Vendor[];
  citizenReports?: CitizenReport[];
  missedCalls?: MissedCall[];
  userRole: 'government' | 'kabadiwala' | 'citizen';
  onAcceptTask?: (id: string, type: 'vendor' | 'citizen') => void;
  onUpdateWasteType?: (id: string, wasteType: string) => void;
}

// Fix default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const CitizenLeafletMap: React.FC<CitizenLeafletMapProps> = ({ 
  vendors = [], 
  citizenReports = [], 
  missedCalls = [],
  userRole, 
  onAcceptTask,
  onUpdateWasteType 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const getVendorMarkerIcon = (status: string) => {
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

  const getCitizenMarkerIcon = (status: string) => {
    const color = status === 'reported' ? '#3b82f6' : 
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
          👥
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
  };

  const getMissedCallMarkerIcon = (status: string) => {
    const color = status === 'Awaiting waste type confirmation' ? '#ef4444' : 
                  status === 'Confirmed' ? '#22c55e' : '#6b7280';
    
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
          📞
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
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => {
      mapInstanceRef.current?.removeLayer(marker);
    });
    markersRef.current = [];

    // Add vendor markers
    vendors.forEach((vendor) => {
      const marker = L.marker([vendor.coordinates.lat, vendor.coordinates.lng], {
        icon: getVendorMarkerIcon(vendor.status)
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
                onclick="window.acceptTask('${vendor.id}', 'vendor')" 
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
      markersRef.current.push(marker);
    });

    // Add citizen report markers
    citizenReports.forEach((report) => {
      const marker = L.marker([report.coordinates.lat, report.coordinates.lng], {
        icon: getCitizenMarkerIcon(report.status)
      }).addTo(mapInstanceRef.current!);

      const popupContent = `
        <div style="padding: 8px; min-width: 200px; font-family: system-ui;">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
            <h4 style="margin: 0; font-weight: 600; font-size: 14px;">Citizen Report #${report.id}</h4>
            <span style="
              background: ${report.status === 'reported' ? '#3b82f6' : report.status === 'assigned' ? '#f59e0b' : '#6b7280'}; 
              color: white; 
              padding: 2px 6px; 
              border-radius: 8px; 
              font-size: 11px;
              text-transform: capitalize;
            ">
              ${report.status}
            </span>
          </div>
          <div style="color: #666; font-size: 13px; line-height: 1.4;">
            <div style="margin-bottom: 3px;">👤 ${report.citizenName}</div>
            <div style="margin-bottom: 3px;">📍 ${report.location}</div>
            <div style="margin-bottom: 3px;">🗑️ ${report.wasteType}</div>
            <div style="margin-bottom: 3px;">📝 ${report.description}</div>
            <div style="margin-bottom: 3px;">🕒 ${report.submittedAt}</div>
            <div style="margin-bottom: 3px;">⭐ ${report.points} points</div>
            ${userRole === 'kabadiwala' && report.status === 'reported' && onAcceptTask ? 
              `<button 
                onclick="window.acceptTask('${report.id}', 'citizen')" 
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
      markersRef.current.push(marker);
    });

    // Add missed call markers
    missedCalls.forEach((call) => {
      const marker = L.marker([call.coordinates.lat, call.coordinates.lng], {
        icon: getMissedCallMarkerIcon(call.status)
      }).addTo(mapInstanceRef.current!);

      const wasteTypes = ['Plastic', 'Paper', 'Metal', 'Glass', 'E-waste', 'Organic', 'Textile', 'Mixed'];
      const wasteTypeOptions = wasteTypes.map(type => 
        `<option value="${type}" ${call.wasteType === type ? 'selected' : ''}>${type}</option>`
      ).join('');

      const popupContent = `
        <div style="padding: 8px; min-width: 200px; font-family: system-ui;">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
            <h4 style="margin: 0; font-weight: 600; font-size: 14px;">Missed Call #${call.id}</h4>
            <span style="
              background: ${call.status === 'Awaiting waste type confirmation' ? '#ef4444' : call.status === 'Confirmed' ? '#22c55e' : '#6b7280'}; 
              color: white; 
              padding: 2px 6px; 
              border-radius: 8px; 
              font-size: 11px;
            ">
              ${call.status}
            </span>
          </div>
          <div style="color: #666; font-size: 13px; line-height: 1.4;">
            <div style="margin-bottom: 3px;">👤 ${call.callerType}</div>
            <div style="margin-bottom: 3px;">📍 ${call.location}</div>
            <div style="margin-bottom: 3px;">🕒 ${call.missedCallTime}</div>
            ${call.wasteType ? `<div style="margin-bottom: 3px;">🗑️ ${call.wasteType}</div>` : ''}
            ${call.confirmedBy ? `<div style="margin-bottom: 3px;">✅ Confirmed by ${call.confirmedBy}</div>` : ''}
            ${call.confirmedAt ? `<div style="margin-bottom: 3px;">⏰ ${call.confirmedAt}</div>` : ''}
            ${call.notes ? `<div style="margin-bottom: 3px;">📝 ${call.notes}</div>` : ''}
            ${userRole === 'kabadiwala' && call.status === 'Awaiting waste type confirmation' && onUpdateWasteType ? 
              `<div style="margin-top: 8px;">
                <label style="display: block; margin-bottom: 4px; font-size: 12px; font-weight: bold;">Update Waste Type:</label>
                <select 
                  id="wasteType-${call.id}" 
                  style="width: 100%; padding: 4px; border: 1px solid #ccc; border-radius: 4px; font-size: 12px; margin-bottom: 6px;"
                >
                  <option value="">Select waste type</option>
                  ${wasteTypeOptions}
                </select>
                <button 
                  onclick="window.updateWasteType('${call.id}', document.getElementById('wasteType-${call.id}').value)" 
                  style="
                    background: #22c55e; 
                    color: white; 
                    border: none; 
                    padding: 6px 12px; 
                    border-radius: 4px; 
                    cursor: pointer; 
                    width: 100%;
                    font-size: 12px;
                  "
                >
                  Confirm Waste Type
                </button>
              </div>` : ''}
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);
      markersRef.current.push(marker);
    });

    // Fit map bounds to show all markers
    if (vendors.length > 0 || citizenReports.length > 0 || missedCalls.length > 0) {
      const group = L.featureGroup(markersRef.current);
      mapInstanceRef.current.fitBounds(group.getBounds(), { padding: [20, 20] });
    }

    // Set up global functions
    (window as any).acceptTask = (id: string, type: 'vendor' | 'citizen') => {
      if (onAcceptTask) {
        onAcceptTask(id, type);
      }
    };

    (window as any).updateWasteType = (id: string, wasteType: string) => {
      if (onUpdateWasteType && wasteType) {
        onUpdateWasteType(id, wasteType);
      }
    };

  }, [vendors, citizenReports, missedCalls, userRole, onAcceptTask, onUpdateWasteType]);

  const allReports = [
    ...vendors.map(v => ({ ...v, type: 'vendor' as const })),
    ...citizenReports.map(r => ({ ...r, type: 'citizen' as const })),
    ...missedCalls.map(mc => ({ ...mc, type: 'missedCall' as const }))
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            {userRole === 'government' ? 'City Waste Collection Overview' : 
             userRole === 'kabadiwala' ? 'Available Collection Tasks' :
             'Waste Reports Map'}
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
                <div className="font-medium mb-2">Legend</div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                  <span>Vendor Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span>Citizen Report</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive"></div>
                  <span>Missed Call - Pending</span>
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

      {/* Reports List */}
      {userRole !== 'citizen' && (
        <div className="grid gap-4">
          <h3 className="text-lg font-semibold">
            {userRole === 'government' ? 'All Reports' : 'Available Tasks'}
          </h3>
          <div className="grid gap-3">
            {allReports.map((report) => (
              <Card 
                key={`${report.type}-${report.id}`} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => {
                  if (mapInstanceRef.current) {
                    mapInstanceRef.current.setView([report.coordinates.lat, report.coordinates.lng], 15);
                  }
                }}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                       <div className="flex items-center gap-2">
                         <h4 className="font-medium">
                           {report.type === 'vendor' ? `Vendor #${report.id}` : 
                            report.type === 'citizen' ? `Citizen Report #${report.id}` :
                            `Missed Call #${report.id}`}
                         </h4>
                         <Badge variant={
                           (report.status === 'available' || report.status === 'reported' || report.status === 'Awaiting waste type confirmation') ? 'destructive' : 
                           (report.status === 'Confirmed' || report.status === 'assigned') ? 'default' : 'secondary'
                         }>
                           {report.status}
                         </Badge>
                         <Badge variant="outline">
                           {report.type === 'vendor' ? '📦 Vendor' : 
                            report.type === 'citizen' ? '👥 Citizen' : '📞 Missed Call'}
                         </Badge>
                       </div>
                       <div className="text-sm text-muted-foreground">
                         <div className="flex items-center gap-1">
                           <MapPin className="h-3 w-3" />
                           {report.location}
                         </div>
                         <div className="flex items-center gap-1">
                           <Package className="h-3 w-3" />
                           {report.wasteType || 'Waste type not confirmed'} 
                           {report.type === 'vendor' && (report as any).quantity && ` - ${(report as any).quantity}`}
                         </div>
                         {report.type === 'citizen' && (
                           <div className="flex items-center gap-1">
                             <User className="h-3 w-3" />
                             {(report as any).citizenName} • {(report as any).points} pts
                           </div>
                         )}
                          {report.type === 'missedCall' && (
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {(report as any).callerType} • Call #{report.id}
                            </div>
                          )}
                       </div>
                    </div>
                     {userRole === 'kabadiwala' && (
                       <div className="flex flex-col gap-1">
                         {((report.status === 'available' || report.status === 'reported') && 
                           (report.type === 'vendor' || report.type === 'citizen') && onAcceptTask) && (
                           <Button
                             size="sm"
                             onClick={(e) => {
                               e.stopPropagation();
                               onAcceptTask(report.id, report.type);
                             }}
                           >
                             Accept
                           </Button>
                         )}
                         {(report.status === 'Awaiting waste type confirmation' && 
                           report.type === 'missedCall' && onUpdateWasteType) && (
                           <Button
                             size="sm"
                             variant="success"
                             onClick={(e) => {
                               e.stopPropagation();
                               // This would open a waste type selection dialog in a real implementation
                               const wasteType = prompt('Select waste type: Plastic, Paper, Metal, Glass, E-waste, Organic, Textile, Mixed');
                               if (wasteType) {
                                 onUpdateWasteType(report.id, wasteType);
                               }
                             }}
                           >
                             Confirm Type
                           </Button>
                         )}
                       </div>
                     )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CitizenLeafletMap;