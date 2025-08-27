import React, { useState } from 'react';
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

interface VendorMapProps {
  vendors: Vendor[];
  userRole: 'government' | 'kabadiwala';
  onAcceptTask?: (vendorId: string) => void;
}

const VendorMap: React.FC<VendorMapProps> = ({ vendors, userRole, onAcceptTask }) => {
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [mapCenter] = useState({ lat: 28.6139, lng: 77.2090 }); // Delhi center

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-success';
      case 'assigned': return 'bg-warning';
      case 'collected': return 'bg-muted';
      default: return 'bg-muted';
    }
  };

  const getWasteTypeIcon = (type: string) => {
    return <Package className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      <div className="relative bg-gradient-subtle rounded-lg overflow-hidden">
        {/* Map Header */}
        <div className="absolute top-4 left-4 right-4 z-10">
          <Card className="bg-card/95 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                {userRole === 'government' ? 'City Waste Collection Overview' : 'Available Collection Tasks'}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Mock Map Container */}
        <div className="h-96 bg-gradient-to-br from-primary/5 to-accent/5 relative">
          {/* Map Grid Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-8 grid-rows-6 h-full">
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} className="border border-muted"></div>
              ))}
            </div>
          </div>

          {/* Vendor Markers */}
          {vendors.map((vendor, index) => {
            const x = 15 + (index % 6) * 12; // Spread vendors across map
            const y = 20 + Math.floor(index / 6) * 15;
            
            return (
              <div
                key={vendor.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110 ${
                  selectedVendor?.id === vendor.id ? 'z-20 scale-125' : 'z-10'
                }`}
                style={{ left: `${x}%`, top: `${y}%` }}
                onClick={() => setSelectedVendor(vendor)}
              >
                <div className={`w-8 h-8 rounded-full ${getStatusColor(vendor.status)} border-2 border-background shadow-lg flex items-center justify-center`}>
                  {getWasteTypeIcon(vendor.wasteType)}
                </div>
                {selectedVendor?.id === vendor.id && (
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-64">
                    <Card className="bg-card/95 backdrop-blur-sm shadow-xl">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <h4 className="font-semibold">Vendor #{vendor.id}</h4>
                            <Badge variant={vendor.status === 'available' ? 'default' : 'secondary'}>
                              {vendor.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {vendor.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Package className="h-3 w-3" />
                              {vendor.wasteType} - {vendor.quantity}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {vendor.submittedAt}
                            </div>
                            {vendor.contactPhone && userRole === 'kabadiwala' && (
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {vendor.contactPhone}
                              </div>
                            )}
                          </div>
                          {userRole === 'kabadiwala' && vendor.status === 'available' && onAcceptTask && (
                            <Button
                              size="sm"
                              className="w-full mt-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                onAcceptTask(vendor.id);
                                setSelectedVendor(null);
                              }}
                            >
                              Accept Task
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-4 right-4">
          <Card className="bg-card/95 backdrop-blur-sm">
            <CardContent className="p-3">
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
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Vendor List */}
      <div className="grid gap-4">
        <h3 className="text-lg font-semibold">
          {userRole === 'government' ? 'Recent Submissions' : 'Task List'}
        </h3>
        <div className="grid gap-3">
          {vendors.map((vendor) => (
            <Card key={vendor.id} className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedVendor(vendor)}>
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

export default VendorMap;