/// <reference types="google.maps" />
import React, { useState, useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MapPin, Package, Clock, User, Key, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';

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

interface GoogleMapComponentProps {
  vendors: Vendor[];
  userRole: 'government' | 'kabadiwala';
  onAcceptTask?: (vendorId: string) => void;
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ vendors, userRole, onAcceptTask }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [apiKey, setApiKey] = useState<string>('');
  const [showApiDialog, setShowApiDialog] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  // Load API key from localStorage
  useEffect(() => {
    const savedApiKey = localStorage.getItem('google_maps_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    } else {
      setShowApiDialog(true);
    }
  }, []);

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('google_maps_api_key', apiKey.trim());
      setShowApiDialog(false);
      loadGoogleMaps();
    }
  };

  const loadGoogleMaps = async () => {
    if (!apiKey || !mapRef.current) return;

    try {
      const loader = new Loader({
        apiKey: apiKey,
        version: 'weekly',
        libraries: ['places']
      });

      await loader.load();
      
      const mapInstance = new google.maps.Map(mapRef.current, {
        center: { lat: 28.6139, lng: 77.2090 }, // Delhi center
        zoom: 12,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });

      setMap(mapInstance);
      setMapLoaded(true);

      const infoWindowInstance = new google.maps.InfoWindow();
      setInfoWindow(infoWindowInstance);

    } catch (error) {
      console.error('Error loading Google Maps:', error);
    }
  };

  // Load map when API key is available
  useEffect(() => {
    if (apiKey && !mapLoaded) {
      loadGoogleMaps();
    }
  }, [apiKey, mapLoaded]);

  // Add markers when map and vendors are ready
  useEffect(() => {
    if (!map || !vendors.length) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add new markers
    vendors.forEach((vendor) => {
      const marker = new google.maps.Marker({
        position: vendor.coordinates,
        map: map,
        title: `Vendor ${vendor.id}`,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: vendor.status === 'available' ? '#22c55e' : 
                     vendor.status === 'assigned' ? '#f59e0b' : '#6b7280',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        }
      });

      marker.addListener('click', () => {
        setSelectedVendor(vendor);
        
        if (infoWindow) {
          const contentString = `
            <div style="padding: 12px; min-width: 250px;">
              <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                <h4 style="margin: 0; font-weight: 600;">Vendor #${vendor.id}</h4>
                <span style="background: ${vendor.status === 'available' ? '#22c55e' : vendor.status === 'assigned' ? '#f59e0b' : '#6b7280'}; 
                            color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px;">
                  ${vendor.status}
                </span>
              </div>
              <div style="color: #666; font-size: 14px; line-height: 1.5;">
                <div style="margin-bottom: 4px;">📍 ${vendor.location}</div>
                <div style="margin-bottom: 4px;">📦 ${vendor.wasteType} - ${vendor.quantity}</div>
                <div style="margin-bottom: 4px;">🕒 ${vendor.submittedAt}</div>
                ${vendor.contactPhone && userRole === 'kabadiwala' ? 
                  `<div style="margin-bottom: 8px;">📞 ${vendor.contactPhone}</div>` : ''}
                ${userRole === 'kabadiwala' && vendor.status === 'available' && onAcceptTask ? 
                  `<button id="accept-btn-${vendor.id}" style="background: #3b82f6; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; width: 100%; margin-top: 8px;">
                    Accept Task
                  </button>` : ''}
              </div>
            </div>
          `;

          infoWindow.setContent(contentString);
          infoWindow.open(map, marker);

          // Add event listener for accept button after content is set
          if (userRole === 'kabadiwala' && vendor.status === 'available' && onAcceptTask) {
            google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
              const acceptBtn = document.getElementById(`accept-btn-${vendor.id}`);
              if (acceptBtn) {
                acceptBtn.addEventListener('click', () => {
                  onAcceptTask(vendor.id);
                  infoWindow.close();
                });
              }
            });
          }
        }
      });

      markersRef.current.push(marker);
    });

    // Fit map bounds to show all markers
    if (vendors.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      vendors.forEach(vendor => {
        bounds.extend(vendor.coordinates);
      });
      map.fitBounds(bounds);
    }

  }, [map, vendors, infoWindow, userRole, onAcceptTask]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-success';
      case 'assigned': return 'bg-warning';
      case 'collected': return 'bg-muted';
      default: return 'bg-muted';
    }
  };

  if (!apiKey || showApiDialog) {
    return (
      <Dialog open={showApiDialog} onOpenChange={setShowApiDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Google Maps API Key Required
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              To display interactive maps, please enter your Google Maps API key. 
              You can get one from the Google Cloud Console.
            </p>
            <div className="space-y-2">
              <Label htmlFor="api-key">Google Maps API Key</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="Enter your API key..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => {
                setShowApiDialog(false);
                // Import and use mock map as fallback
                import('./VendorMap').then(({ default: VendorMap }) => {
                  // This would be handled by parent component
                });
              }} className="flex-1">
                Use Mock Map
              </Button>
              <Button onClick={saveApiKey} className="flex-1" disabled={!apiKey.trim()}>
                Save & Load Map
              </Button>
            </div>
            <div className="text-xs text-muted-foreground p-3 bg-muted rounded-lg">
              <p className="font-medium mb-1">How to get a Google Maps API key:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Go to Google Cloud Console</li>
                <li>Create a new project or select existing</li>
                <li>Enable Maps JavaScript API</li>
                <li>Create credentials (API Key)</li>
                <li>Restrict the key to your domain for security</li>
              </ol>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              {userRole === 'government' ? 'City Waste Collection Overview' : 'Available Collection Tasks'}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowApiDialog(true)}
            >
              <Settings className="h-4 w-4 mr-1" />
              API Settings
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div 
              ref={mapRef} 
              className="w-full h-96 rounded-lg"
              style={{ minHeight: '400px' }}
            />
            
            {!mapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-lg">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                  <p className="text-sm text-muted-foreground">Loading Google Maps...</p>
                </div>
              </div>
            )}

            {/* Map Legend */}
            <div className="absolute bottom-4 right-4 bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
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
                if (map) {
                  map.panTo(vendor.coordinates);
                  map.setZoom(15);
                  // Trigger marker click to show info window
                  const marker = markersRef.current.find(m => 
                    m.getTitle() === `Vendor ${vendor.id}`
                  );
                  if (marker) {
                    google.maps.event.trigger(marker, 'click');
                  }
                }
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

export default GoogleMapComponent;