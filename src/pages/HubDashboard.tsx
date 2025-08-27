import React, { useState } from 'react';
import { Scan, Package, Upload, Download, CheckCircle, Eye, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const HubDashboard = () => {
  const [batches, setBatches] = useState([
    {
      id: 'BATCH001',
      wasteType: 'Plastic',
      totalWeight: '45kg',
      status: 'available',
      qcPhotos: 2,
      vendorCount: 8,
      createdAt: '2024-01-15',
      price: '₹1,350'
    },
    {
      id: 'BATCH002',
      wasteType: 'Paper',
      totalWeight: '60kg',
      status: 'reserved',
      qcPhotos: 3,
      vendorCount: 12,
      createdAt: '2024-01-14',
      price: '₹900',
      reservedBy: 'GreenTech Recyclers'
    },
    {
      id: 'BATCH003',
      wasteType: 'Metal',
      totalWeight: '25kg',
      status: 'picked-up',
      qcPhotos: 1,
      vendorCount: 5,
      createdAt: '2024-01-13',
      price: '₹2,500',
      pickedBy: 'MetalMax Industries'
    }
  ]);

  const [newBatch, setNewBatch] = useState({
    batchId: '',
    weight: '',
    wasteType: 'Plastic',
    qcNotes: ''
  });

  const [selectedBatch, setSelectedBatch] = useState<any>(null);

  const generateBatchId = () => {
    const id = 'BATCH' + String(Date.now()).slice(-6);
    setNewBatch(prev => ({ ...prev, batchId: id }));
  };

  const createBatch = () => {
    if (!newBatch.batchId || !newBatch.weight) return;

    const batch = {
      id: newBatch.batchId,
      wasteType: newBatch.wasteType,
      totalWeight: newBatch.weight + 'kg',
      status: 'available',
      qcPhotos: 1,
      vendorCount: Math.floor(Math.random() * 10) + 1,
      createdAt: new Date().toISOString().split('T')[0],
      price: '₹' + (parseFloat(newBatch.weight) * (newBatch.wasteType === 'Metal' ? 100 : newBatch.wasteType === 'Plastic' ? 30 : 15))
    };

    setBatches(prev => [batch, ...prev]);
    setNewBatch({ batchId: '', weight: '', wasteType: 'Plastic', qcNotes: '' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'default';
      case 'reserved': return 'secondary';
      case 'picked-up': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-main">
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Hub Dashboard</h1>
              <p className="text-muted-foreground">MRF Collection & Batch Management</p>
            </div>
            <Badge variant="outline" className="text-lg px-3 py-1">
              Hub ID: MRF001
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="receive" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="receive">Receive Drop</TabsTrigger>
            <TabsTrigger value="batches">Batch Management</TabsTrigger>
            <TabsTrigger value="analytics">Hub Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="receive" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scan className="h-5 w-5" />
                  Process Collection Drop
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="batch-id">Batch ID</Label>
                    <div className="flex gap-2">
                      <Input
                        id="batch-id"
                        placeholder="BATCH001 or scan QR"
                        value={newBatch.batchId}
                        onChange={(e) => setNewBatch(prev => ({ ...prev, batchId: e.target.value }))}
                      />
                      <Button variant="outline" onClick={generateBatchId}>
                        <QrCode className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight">Total Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="0.0"
                      value={newBatch.weight}
                      onChange={(e) => setNewBatch(prev => ({ ...prev, weight: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="waste-type">Waste Type</Label>
                    <select
                      id="waste-type"
                      className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      value={newBatch.wasteType}
                      onChange={(e) => setNewBatch(prev => ({ ...prev, wasteType: e.target.value }))}
                    >
                      <option value="Plastic">Plastic</option>
                      <option value="Paper">Paper</option>
                      <option value="Metal">Metal</option>
                      <option value="Glass">Glass</option>
                      <option value="E-waste">E-waste</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="qc-photo">QC Photo Upload</Label>
                    <div className="flex items-center gap-2">
                      <Input type="file" id="qc-photo" accept="image/*" />
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="qc-notes">QC Notes</Label>
                  <Textarea
                    id="qc-notes"
                    placeholder="Quality control observations, contamination level, etc."
                    value={newBatch.qcNotes}
                    onChange={(e) => setNewBatch(prev => ({ ...prev, qcNotes: e.target.value }))}
                  />
                </div>

                <Button onClick={createBatch} className="w-full" size="lg">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Create Batch & Generate Receipt
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="batches" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Batch Inventory</h2>
              <div className="flex gap-2">
                <Badge variant="default">{batches.filter(b => b.status === 'available').length} Available</Badge>
                <Badge variant="secondary">{batches.filter(b => b.status === 'reserved').length} Reserved</Badge>
                <Badge variant="outline">{batches.filter(b => b.status === 'picked-up').length} Picked Up</Badge>
              </div>
            </div>

            <div className="grid gap-4">
              {batches.map((batch) => (
                <Card key={batch.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{batch.id}</h3>
                          <Badge variant={getStatusColor(batch.status)}>
                            {batch.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Package className="h-3 w-3" />
                              {batch.wasteType} - {batch.totalWeight}
                            </span>
                            <span>{batch.vendorCount} vendors</span>
                            <span>{batch.qcPhotos} QC photos</span>
                          </div>
                          <div>Created: {batch.createdAt}</div>
                          {batch.reservedBy && <div>Reserved by: {batch.reservedBy}</div>}
                          {batch.pickedBy && <div>Picked up by: {batch.pickedBy}</div>}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-success">{batch.price}</div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedBatch(batch)}>
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Batch Details - {batch.id}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Waste Type</Label>
                                  <p className="font-medium">{batch.wasteType}</p>
                                </div>
                                <div>
                                  <Label>Total Weight</Label>
                                  <p className="font-medium">{batch.totalWeight}</p>
                                </div>
                                <div>
                                  <Label>Vendor Count</Label>
                                  <p className="font-medium">{batch.vendorCount}</p>
                                </div>
                                <div>
                                  <Label>Market Price</Label>
                                  <p className="font-medium text-success">{batch.price}</p>
                                </div>
                              </div>
                              <div>
                                <Label>Chain of Custody</Label>
                                <div className="text-sm text-muted-foreground mt-1">
                                  <div>• {batch.vendorCount} vendors submitted waste</div>
                                  <div>• Collected by kabadiwalas</div>
                                  <div>• Received at MRF001 on {batch.createdAt}</div>
                                  <div>• QC verified with {batch.qcPhotos} photos</div>
                                </div>
                              </div>
                              <Button className="w-full">
                                <Download className="h-4 w-4 mr-2" />
                                Download Compliance PDF
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Throughput</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">142kg</div>
                  <p className="text-muted-foreground">+12% from yesterday</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Active Batches</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{batches.filter(b => b.status === 'available').length}</div>
                  <p className="text-muted-foreground">Ready for pickup</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Today</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success">₹4,750</div>
                  <p className="text-muted-foreground">From 3 batches sold</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Waste Type Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['Plastic', 'Paper', 'Metal', 'Glass'].map((type) => {
                    const percentage = Math.floor(Math.random() * 40) + 10;
                    return (
                      <div key={type} className="flex items-center justify-between">
                        <span>{type}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-muted rounded-full">
                            <div 
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">{percentage}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default HubDashboard;