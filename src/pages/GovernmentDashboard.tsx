import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, TrendingUp, Users, MapPin, DollarSign, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VendorMap from '@/components/VendorMap';
import CitizenLeafletMap from '@/components/CitizenLeafletMap';
import { mockVendors, mockCitizenReports, mockMissedCalls } from '@/data/demoData';
const recycLinkLogo = '/lovable-uploads/1dd08f06-2005-4008-a9b6-5a13326e7a8f.png';

const GovernmentDashboard = () => {
  const [activeView, setActiveView] = useState('overview');

  // Using demo data from central location

  return (
    <div className="min-h-screen bg-gradient-main">
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img src={recycLinkLogo} alt="RecycLink logo - three interlocking circles" className="h-8 w-8 filter contrast-125 brightness-110" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">RecycLink</h1>
                <p className="text-muted-foreground">Government Dashboard - Delhi Municipal Corporation</p>
              </div>
            </Link>
            <Badge variant="outline" className="text-lg px-3 py-1">
              Admin Access
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">City Overview</TabsTrigger>
            <TabsTrigger value="map">Vendor Map</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="zones">Pilot Zones</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,247</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Daily Collection</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2.4 tons</div>
                  <p className="text-xs text-muted-foreground">+8% from yesterday</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹8.5L</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Government Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹1.2L</div>
                  <p className="text-xs text-muted-foreground">5% platform share</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Waste Type Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { type: 'Plastic', percentage: 35, color: 'bg-blue-500' },
                      { type: 'Paper', percentage: 28, color: 'bg-green-500' },
                      { type: 'Metal', percentage: 20, color: 'bg-yellow-500' },
                      { type: 'Glass', percentage: 12, color: 'bg-red-500' },
                      { type: 'E-waste', percentage: 5, color: 'bg-purple-500' },
                    ].map((item) => (
                      <div key={item.type} className="flex items-center space-x-2">
                        <div className={`w-4 h-4 rounded ${item.color}`}></div>
                        <span className="text-sm flex-1">{item.type}</span>
                        <span className="text-sm font-medium">{item.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Collection Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { area: 'Connaught Place', collections: 45, trend: '+12%' },
                      { area: 'Karol Bagh', collections: 38, trend: '+8%' },
                      { area: 'Lajpat Nagar', collections: 32, trend: '+15%' },
                      { area: 'Khan Market', collections: 28, trend: '+5%' },
                      { area: 'Saket', collections: 25, trend: '+10%' },
                    ].map((area) => (
                      <div key={area.area} className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{area.area}</div>
                          <div className="text-sm text-muted-foreground">{area.collections} collections</div>
                        </div>
                        <Badge variant="outline">{area.trend}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            <CitizenLeafletMap 
              vendors={mockVendors} 
              citizenReports={mockCitizenReports}
              missedCalls={mockMissedCalls}
              userRole="government" 
            />
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Platform Fee (3%)</span>
                      <span className="font-medium">₹45,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Government Share (2%)</span>
                      <span className="font-medium">₹30,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Compliance Fees</span>
                      <span className="font-medium">₹15,000</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Total This Month</span>
                      <span>₹90,000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May'].map((month, index) => {
                      const amount = 30000 + (index * 15000) + Math.random() * 10000;
                      return (
                        <div key={month} className="flex justify-between items-center">
                          <span>{month} 2024</span>
                          <span className="font-medium">₹{Math.floor(amount).toLocaleString()}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="zones" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Policy & Pilot Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Active Pilot Zones</h4>
                    <p className="text-sm text-muted-foreground">12 zones covering 150 wards</p>
                    <Button variant="outline" size="sm">Manage Zones</Button>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">MOUs Signed</h4>
                    <p className="text-sm text-muted-foreground">8 companies, 25 hubs</p>
                    <Button variant="outline" size="sm">View Agreements</Button>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Compliance Rate</h4>
                    <p className="text-sm text-muted-foreground">92% EPR targets met</p>
                    <Button variant="outline" size="sm">Generate Report</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pilot Zone Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { zone: 'Central Delhi Zone 1', wards: 12, vendors: 156, collection: '45kg/day', status: 'active' },
                    { zone: 'South Delhi Zone 2', wards: 8, vendors: 89, collection: '32kg/day', status: 'active' },
                    { zone: 'East Delhi Zone 3', wards: 15, vendors: 203, collection: '67kg/day', status: 'expanding' },
                    { zone: 'West Delhi Zone 4', wards: 10, vendors: 134, collection: '38kg/day', status: 'active' },
                  ].map((zone) => (
                    <div key={zone.zone} className="border p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{zone.zone}</h4>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <div>{zone.wards} wards • {zone.vendors} vendors</div>
                            <div>Avg. collection: {zone.collection}</div>
                          </div>
                        </div>
                        <Badge variant={zone.status === 'expanding' ? 'default' : 'secondary'}>
                          {zone.status}
                        </Badge>
                      </div>
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

export default GovernmentDashboard;