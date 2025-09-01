import React, { useState } from 'react';
import { CheckCircle, Clock, MapPin, Camera, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import CitizenLeafletMap from '@/components/CitizenLeafletMap';
import { mockVendors, mockCitizenReports, mockMissedCalls } from '@/data/demoData';

const KabadiwalaPage = () => {
  const [tasks, setTasks] = useState([
    { 
      id: 'V001', 
      location: 'Connaught Place', 
      coordinates: { lat: 28.6304, lng: 77.2177 },
      wasteType: 'Plastic', 
      quantity: '5kg', 
      status: 'available' as const, 
      contactPhone: '9876543210',
      submittedAt: '2 hours ago'
    },
    { 
      id: 'V002', 
      location: 'Karol Bagh', 
      coordinates: { lat: 28.6507, lng: 77.1900 },
      wasteType: 'Paper', 
      quantity: '8kg', 
      status: 'available' as const, 
      contactPhone: '9876543211',
      submittedAt: '1 hour ago'
    },
    { 
      id: 'V003', 
      location: 'Lajpat Nagar', 
      coordinates: { lat: 28.5656, lng: 77.2430 },
      wasteType: 'Metal', 
      quantity: '3kg', 
      status: 'assigned' as const, 
      contactPhone: '9876543212',
      submittedAt: '30 mins ago'
    },
    { 
      id: 'V004', 
      location: 'Khan Market', 
      coordinates: { lat: 28.5984, lng: 77.2319 },
      wasteType: 'E-waste', 
      quantity: '2kg', 
      status: 'available' as const, 
      contactPhone: '9876543213',
      submittedAt: '45 mins ago'
    },
    { 
      id: 'V005', 
      location: 'Saket', 
      coordinates: { lat: 28.5244, lng: 77.2066 },
      wasteType: 'Glass', 
      quantity: '4kg', 
      status: 'available' as const, 
      contactPhone: '9876543214',
      submittedAt: '3 hours ago'
    },
  ]);

  const [activeTab, setActiveTab] = useState('map');
  const [isOnline, setIsOnline] = useState(true);
  const [collection, setCollection] = useState({
    vendorId: '',
    wasteType: 'Plastic',
    quantity: '',
    notes: ''
  });

  const acceptTask = (id: string, type: 'vendor' | 'citizen' = 'vendor') => {
    console.log('Accepting task:', id, 'of type:', type);
    // Update task status logic
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, status: 'assigned' as const } : task
    ));
  };

  const updateWasteType = (id: string, wasteType: string) => {
    console.log('Updating waste type for missed call:', id, 'to', wasteType);
    // In a real implementation, this would update the missed call record
    // For demo purposes, we'll just log it
    alert(`Waste type updated to: ${wasteType} for missed call #${id}`);
  };

  const logCollection = () => {
    console.log('Logging collection:', collection);
    // Add to offline storage if needed
    setCollection({ vendorId: '', wasteType: 'Plastic', quantity: '', notes: '' });
  };

  const syncOfflineData = () => {
    console.log('Syncing offline data...');
    // Sync logic here
  };

  return (
    <div className="min-h-screen bg-gradient-main">
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Kabadiwala Portal</h1>
              <p className="text-muted-foreground">Collection & Task Management</p>
            </div>
            <div className="flex items-center gap-2">
              {isOnline ? (
                <Badge variant="default" className="gap-1">
                  <Wifi className="h-3 w-3" />
                  Online
                </Badge>
              ) : (
                <Badge variant="secondary" className="gap-1">
                  <WifiOff className="h-3 w-3" />
                  Offline
                </Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="map">Task Map</TabsTrigger>
            <TabsTrigger value="tasks">Task List</TabsTrigger>
            <TabsTrigger value="collection">Log Collection</TabsTrigger>
            <TabsTrigger value="offline">Offline Data</TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="space-y-4">
            <CitizenLeafletMap 
              vendors={mockVendors}
              citizenReports={mockCitizenReports}
              missedCalls={mockMissedCalls}
              userRole="kabadiwala"
              onAcceptTask={acceptTask}
              onUpdateWasteType={updateWasteType}
            />
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            <div className="grid gap-4">
              {tasks.map((task) => (
                <Card key={task.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">Task #{task.id}</h3>
                          <Badge variant={task.status === 'available' ? 'default' : 'secondary'}>
                            {task.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {task.location}
                          </div>
                          <div>{task.wasteType} - {task.quantity}</div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {task.submittedAt}
                          </div>
                          <div>Contact: {task.contactPhone}</div>
                        </div>
                      </div>
                      {task.status === 'available' && (
                        <Button onClick={() => acceptTask(task.id)} size="sm">
                          Accept Task
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="collection" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Log New Collection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vendor-id">Vendor ID (Optional)</Label>
                    <Input
                      id="vendor-id"
                      placeholder="V001 or leave blank"
                      value={collection.vendorId}
                      onChange={(e) => setCollection(prev => ({ ...prev, vendorId: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="waste-type">Waste Type</Label>
                    <Select value={collection.wasteType} onValueChange={(value) => setCollection(prev => ({ ...prev, wasteType: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Plastic">Plastic</SelectItem>
                        <SelectItem value="Paper">Paper</SelectItem>
                        <SelectItem value="Metal">Metal</SelectItem>
                        <SelectItem value="Glass">Glass</SelectItem>
                        <SelectItem value="E-waste">E-waste</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity (kg)</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="0.0"
                      value={collection.quantity}
                      onChange={(e) => setCollection(prev => ({ ...prev, quantity: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="photo">Photo Upload</Label>
                    <div className="flex items-center gap-2">
                      <Input type="file" id="photo" accept="image/*" />
                      <Button variant="outline" size="sm">
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Collection Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Quality, location details, etc."
                    value={collection.notes}
                    onChange={(e) => setCollection(prev => ({ ...prev, notes: e.target.value }))}
                  />
                </div>

                <Button onClick={logCollection} className="w-full" size="lg">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Log Collection
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="offline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <WifiOff className="h-5 w-5" />
                  Offline Data Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">
                    {isOnline ? 'All data is synced' : 'Working offline - data will sync when connection is restored'}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold">3</div>
                      <div className="text-sm text-muted-foreground">Pending Uploads</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold">7</div>
                      <div className="text-sm text-muted-foreground">Cached Tasks</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold">12MB</div>
                      <div className="text-sm text-muted-foreground">Storage Used</div>
                    </div>
                  </div>

                  <Button onClick={syncOfflineData} disabled={!isOnline} className="w-full">
                    <Wifi className="h-4 w-4 mr-2" />
                    Sync Data
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Collections (Offline)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { id: 'C001', type: 'Plastic', qty: '3kg', time: '10:30 AM', synced: false },
                    { id: 'C002', type: 'Paper', qty: '5kg', time: '09:15 AM', synced: true },
                    { id: 'C003', type: 'Metal', qty: '2kg', time: '08:45 AM', synced: false },
                  ].map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{item.type} - {item.qty}</div>
                        <div className="text-sm text-muted-foreground">{item.time}</div>
                      </div>
                      <Badge variant={item.synced ? 'default' : 'secondary'}>
                        {item.synced ? 'Synced' : 'Pending'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default KabadiwalaPage;