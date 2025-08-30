import React, { useState } from 'react';
import { MapPin, Filter, Package, Truck, CreditCard, Download, Eye, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CompanyDashboard = () => {
  const [batches, setBatches] = useState([
    {
      id: 'BATCH001',
      hubName: 'Central MRF Delhi',
      hubDistance: '12km',
      wasteType: 'Plastic',
      quantity: '45kg',
      price: '₹1,350',
      quality: 'Grade A',
      availability: 'Available',
      hubContact: '+91-9876543230'
    },
    {
      id: 'BATCH002',
      hubName: 'South Delhi MRF',
      hubDistance: '8km',
      wasteType: 'Paper',
      quantity: '60kg',
      price: '₹900',
      quality: 'Grade B',
      availability: 'Available',
      hubContact: '+91-9876543231'
    },
    {
      id: 'BATCH003',
      hubName: 'Noida Industrial MRF',
      hubDistance: '25km',
      wasteType: 'Metal',
      quantity: '25kg',
      price: '₹2,500',
      quality: 'Grade A',
      availability: 'Reserved',
      hubContact: '+91-9876543232'
    },
    {
      id: 'BATCH004',
      hubName: 'Gurgaon MRF',
      hubDistance: '18km',
      wasteType: 'E-waste',
      quantity: '15kg',
      price: '₹3,750',
      quality: 'Grade A',
      availability: 'Available',
      hubContact: '+91-9876543233'
    }
  ]);

  const [orders, setOrders] = useState([
    {
      id: 'ORD001',
      batchId: 'BATCH005',
      wasteType: 'Plastic',
      quantity: '50kg',
      totalAmount: '₹1,500',
      status: 'delivered',
      orderDate: '2024-01-10',
      deliveryDate: '2024-01-12',
      hubName: 'Central MRF Delhi'
    },
    {
      id: 'ORD002',
      batchId: 'BATCH006',
      wasteType: 'Metal',
      quantity: '30kg',
      totalAmount: '₹3,000',
      status: 'in-transit',
      orderDate: '2024-01-14',
      estimatedDelivery: '2024-01-16',
      hubName: 'Noida Industrial MRF'
    }
  ]);

  const [selectedBatch, setSelectedBatch] = useState<any>(null);
  const [purchaseModal, setPurchaseModal] = useState(false);
  const [filters, setFilters] = useState({
    wasteType: '',
    maxDistance: '',
    minQuantity: ''
  });

  const [deliveryOption, setDeliveryOption] = useState('recycler-pickup');
  const [paymentMethod, setPaymentMethod] = useState('escrow');

  const purchaseBatch = () => {
    if (!selectedBatch) return;

    const newOrder = {
      id: 'ORD' + String(Date.now()).slice(-3),
      batchId: selectedBatch.id,
      wasteType: selectedBatch.wasteType,
      quantity: selectedBatch.quantity,
      totalAmount: selectedBatch.price,
      status: 'processing',
      orderDate: new Date().toISOString().split('T')[0],
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      hubName: selectedBatch.hubName
    };

    setOrders(prev => [newOrder, ...prev]);
    setBatches(prev => prev.map(b => 
      b.id === selectedBatch.id ? { ...b, availability: 'Reserved' } : b
    ));
    setPurchaseModal(false);
    setSelectedBatch(null);
  };

  const filteredBatches = batches.filter(batch => {
    if (filters.wasteType && batch.wasteType !== filters.wasteType) return false;
    if (filters.maxDistance && parseInt(batch.hubDistance) > parseInt(filters.maxDistance)) return false;
    if (filters.minQuantity && parseInt(batch.quantity) < parseInt(filters.minQuantity)) return false;
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'default';
      case 'Reserved': return 'secondary';
      case 'processing': return 'secondary';
      case 'in-transit': return 'outline';
      case 'delivered': return 'default';
      default: return 'outline';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-main">
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Recyclers Dashboard</h1>
              <p className="text-muted-foreground">GreenTech Recyclers - Waste Procurement</p>
            </div>
            <Badge variant="outline" className="text-lg px-3 py-1">
              EPR Compliance: 85%
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="marketplace" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="marketplace">Batch Marketplace</TabsTrigger>
            <TabsTrigger value="orders">My Orders</TabsTrigger>
            <TabsTrigger value="compliance">Compliance Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="marketplace" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filter Available Batches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Waste Type</Label>
                    <Select
                      value={filters.wasteType || "all"}
                      onValueChange={(value) =>
                        setFilters(prev => ({ ...prev, wasteType: value === "all" ? "" : value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All types</SelectItem>
                        <SelectItem value="Plastic">Plastic</SelectItem>
                        <SelectItem value="Paper">Paper</SelectItem>
                        <SelectItem value="Metal">Metal</SelectItem>
                        <SelectItem value="E-waste">E-waste</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Max Distance (km)</Label>
                    <Input
                      type="number"
                      placeholder="50"
                      value={filters.maxDistance}
                      onChange={(e) => setFilters(prev => ({ ...prev, maxDistance: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Min Quantity (kg)</Label>
                    <Input
                      type="number"
                      placeholder="10"
                      value={filters.minQuantity}
                      onChange={(e) => setFilters(prev => ({ ...prev, minQuantity: e.target.value }))}
                    />
                  </div>

                  <div className="flex items-end">
                    <Button onClick={() => setFilters({ wasteType: '', maxDistance: '', minQuantity: '' })}>
                      Clear Filters
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Batch Listings */}
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Available Batches ({filteredBatches.length})</h2>
                <Button variant="outline">
                  <MapPin className="h-4 w-4 mr-2" />
                  Map View
                </Button>
              </div>

              {filteredBatches.map((batch) => (
                <Card key={batch.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{batch.id}</h3>
                          <Badge variant={getStatusColor(batch.availability)}>
                            {batch.availability}
                          </Badge>
                          <Badge variant="outline">{batch.quality}</Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Package className="h-3 w-3" />
                              {batch.wasteType} - {batch.quantity}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {batch.hubName} ({batch.hubDistance})
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-success">{batch.price}</div>
                            <div className="text-sm text-muted-foreground">Market Price</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 ml-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedBatch(batch)}>
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Batch Details - {batch.id}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Hub Name</Label>
                                  <p className="font-medium">{batch.hubName}</p>
                                </div>
                                <div>
                                  <Label>Distance</Label>
                                  <p className="font-medium">{batch.hubDistance}</p>
                                </div>
                                <div>
                                  <Label>Waste Type</Label>
                                  <p className="font-medium">{batch.wasteType}</p>
                                </div>
                                <div>
                                  <Label>Quantity</Label>
                                  <p className="font-medium">{batch.quantity}</p>
                                </div>
                                <div>
                                  <Label>Quality Grade</Label>
                                  <p className="font-medium">{batch.quality}</p>
                                </div>
                                <div>
                                  <Label>Contact</Label>
                                  <p className="font-medium">{batch.hubContact}</p>
                                </div>
                              </div>
                              <div>
                                <Label>Chain of Custody Available</Label>
                                <div className="text-sm text-muted-foreground mt-1">
                                  ✓ Vendor collection records<br/>
                                  ✓ Kabadiwala transport logs<br/>
                                  ✓ Hub QC verification<br/>
                                  ✓ EPR compliance documentation
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        {batch.availability === 'Available' && (
                          <Dialog open={purchaseModal} onOpenChange={setPurchaseModal}>
                            <DialogTrigger asChild>
                              <Button size="sm" onClick={() => setSelectedBatch(batch)}>
                                <CreditCard className="h-4 w-4 mr-1" />
                                Buy Batch
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Purchase Batch - {selectedBatch?.id}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="bg-muted p-4 rounded-lg">
                                  <div className="flex justify-between items-center">
                                    <span>Total Amount:</span>
                                    <span className="text-xl font-bold text-success">{selectedBatch?.price}</span>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <Label>Delivery Option</Label>
                                  <Select value={deliveryOption} onValueChange={setDeliveryOption}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="recycler-pickup">Recycler Pickup (Free)</SelectItem>
                                      <SelectItem value="hub-delivery">Hub Coordinated Delivery (+₹200)</SelectItem>
                                      <SelectItem value="shared-logistics">Shared Logistics (+₹150)</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div className="space-y-2">
                                  <Label>Payment Method</Label>
                                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="escrow">Escrow Payment (Recommended)</SelectItem>
                                      <SelectItem value="direct">Direct Payment</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <Button onClick={purchaseBatch} className="w-full" size="lg">
                                  <CreditCard className="h-4 w-4 mr-2" />
                                  Confirm Purchase
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Order History</h2>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Orders
              </Button>
            </div>

            <div className="grid gap-4">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{order.id}</h3>
                          <Badge variant={getStatusColor(order.status)}>
                            {order.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <div>Batch: {order.batchId} | {order.wasteType} - {order.quantity}</div>
                          <div>Hub: {order.hubName}</div>
                          <div>Order Date: {order.orderDate}</div>
                          {order.deliveryDate && <div>Delivered: {order.deliveryDate}</div>}
                          {order.estimatedDelivery && <div>Est. Delivery: {order.estimatedDelivery}</div>}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold">{order.totalAmount}</div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          PDF
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>EPR Target</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">85%</div>
                  <div className="w-full bg-muted rounded-full h-2 mt-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <p className="text-muted-foreground text-sm mt-1">15% remaining</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">284kg</div>
                  <p className="text-muted-foreground">Waste procured</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Certificates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-muted-foreground">Valid EPR certificates</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Downloadable Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['Monthly EPR Report', 'Chain of Custody Audit', 'Vendor Compliance Summary', 'Payment Settlement Report'].map((report) => (
                    <div key={report} className="flex justify-between items-center p-3 border rounded-lg">
                      <span>{report}</span>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download PDF
                      </Button>
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

export default CompanyDashboard;
