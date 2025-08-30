import React, { useState } from 'react';
import { DollarSign, AlertTriangle, CheckCircle, Clock, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const SettlementDashboard = () => {
  const [transactions, setTransactions] = useState([
    {
      id: 'TXN001',
      batchId: 'BATCH001',
      amount: 1350,
      status: 'completed',
      vendorReward: 675,
      kabadiwalaFee: 270,
      hubFee: 135,
      govtFee: 135,
      platformFee: 135,
      completedAt: '2024-01-15',
      escrowReleased: true
    },
    {
      id: 'TXN002',
      batchId: 'BATCH002',
      amount: 900,
      status: 'pending-pod',
      vendorReward: 450,
      kabadiwalaFee: 180,
      hubFee: 90,
      govtFee: 90,
      platformFee: 90,
      escrowReleased: false
    },
    {
      id: 'TXN003',
      batchId: 'BATCH003',
      amount: 2500,
      status: 'in-escrow',
      vendorReward: 1250,
      kabadiwalaFee: 500,
      hubFee: 250,
      govtFee: 250,
      platformFee: 250,
      escrowReleased: false
    }
  ]);

  const [disputes, setDisputes] = useState([
    {
      id: 'DSP001',
      transactionId: 'TXN002',
      type: 'quality',
      description: 'Batch quality not as described',
      reportedBy: 'Recyclers',
      status: 'open',
      amount: 900,
      createdAt: '2024-01-14'
    }
  ]);

  const [splitRatios, setSplitRatios] = useState({
    vendor: 50,
    kabadiwala: 20,
    hub: 10,
    government: 10,
    platform: 10
  });

  const releaseEscrow = (txnId: string) => {
    setTransactions(prev => prev.map(txn => 
      txn.id === txnId ? { ...txn, status: 'completed', escrowReleased: true, completedAt: new Date().toISOString().split('T')[0] } : txn
    ));
  };

  const resolveDispute = (disputeId: string) => {
    setDisputes(prev => prev.map(dispute => 
      dispute.id === disputeId ? { ...dispute, status: 'resolved' } : dispute
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'pending-pod': return 'secondary';
      case 'in-escrow': return 'outline';
      case 'open': return 'destructive';
      case 'resolved': return 'default';
      default: return 'outline';
    }
  };

  const totalEscrow = transactions.filter(t => !t.escrowReleased).reduce((sum, t) => sum + t.amount, 0);
  const totalCompleted = transactions.filter(t => t.escrowReleased).reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-main">
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Settlement Dashboard</h1>
              <p className="text-muted-foreground">Payment Processing & Dispute Resolution</p>
            </div>
            <Badge variant="outline" className="text-lg px-3 py-1">
              Admin Panel
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="settlements" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="settlements">Settlement Ledger</TabsTrigger>
            <TabsTrigger value="escrow">Escrow Management</TabsTrigger>
            <TabsTrigger value="disputes">Dispute Resolution</TabsTrigger>
            <TabsTrigger value="config">Split Configuration</TabsTrigger>
          </TabsList>

          <TabsContent value="settlements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Processed</CardTitle>
                  <CheckCircle className="h-4 w-4 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{totalCompleted.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">In Escrow</CardTitle>
                  <Clock className="h-4 w-4 text-warning" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{totalEscrow.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Pending release</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Open Disputes</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{disputes.filter(d => d.status === 'open').length}</div>
                  <p className="text-xs text-muted-foreground">Require attention</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{Math.floor(totalCompleted * 0.1).toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">10% platform fee</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((txn) => (
                    <div key={txn.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{txn.id}</h4>
                            <Badge variant={getStatusColor(txn.status)}>
                              {txn.status.replace('-', ' ')}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <div>Batch: {txn.batchId}</div>
                            <div>Total: ₹{txn.amount.toLocaleString()}</div>
                            {txn.completedAt && <div>Completed: {txn.completedAt}</div>}
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                View Split
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Payment Split - {txn.id}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Vendor Reward</Label>
                                    <p className="font-medium text-success">₹{txn.vendorReward}</p>
                                  </div>
                                  <div>
                                    <Label>Kabadiwala Fee</Label>
                                    <p className="font-medium">₹{txn.kabadiwalaFee}</p>
                                  </div>
                                  <div>
                                    <Label>Hub Fee</Label>
                                    <p className="font-medium">₹{txn.hubFee}</p>
                                  </div>
                                  <div>
                                    <Label>Government Share</Label>
                                    <p className="font-medium">₹{txn.govtFee}</p>
                                  </div>
                                  <div>
                                    <Label>Platform Fee</Label>
                                    <p className="font-medium">₹{txn.platformFee}</p>
                                  </div>
                                  <div>
                                    <Label>Total</Label>
                                    <p className="font-bold text-lg">₹{txn.amount}</p>
                                  </div>
                                </div>
                                <div className="border-t pt-4">
                                  <Label>Escrow Status</Label>
                                  <p className={`font-medium ${txn.escrowReleased ? 'text-success' : 'text-warning'}`}>
                                    {txn.escrowReleased ? 'Released' : 'In Escrow'}
                                  </p>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          {!txn.escrowReleased && txn.status === 'pending-pod' && (
                            <Button size="sm" onClick={() => releaseEscrow(txn.id)}>
                              Release Escrow
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="escrow" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Escrow Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-3xl font-bold text-center">₹{totalEscrow.toLocaleString()}</div>
                  <p className="text-center text-muted-foreground">Total funds in escrow</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-lg font-semibold">
                        {transactions.filter(t => t.status === 'in-escrow').length}
                      </div>
                      <div className="text-sm text-muted-foreground">Awaiting POD</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-lg font-semibold">
                        {transactions.filter(t => t.status === 'pending-pod').length}
                      </div>
                      <div className="text-sm text-muted-foreground">Pending Verification</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-lg font-semibold">
                        {disputes.filter(d => d.status === 'open').length}
                      </div>
                      <div className="text-sm text-muted-foreground">Under Dispute</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pending Releases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transactions.filter(t => !t.escrowReleased).map((txn) => (
                    <div key={txn.id} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{txn.id}</div>
                        <div className="text-sm text-muted-foreground">
                          {txn.batchId} • ₹{txn.amount.toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusColor(txn.status)}>
                          {txn.status.replace('-', ' ')}
                        </Badge>
                        {txn.status === 'pending-pod' && (
                          <Button size="sm" onClick={() => releaseEscrow(txn.id)}>
                            Release
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="disputes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dispute Resolution Queue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {disputes.map((dispute) => (
                    <div key={dispute.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{dispute.id}</h4>
                            <Badge variant={getStatusColor(dispute.status)}>
                              {dispute.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <div>Transaction: {dispute.transactionId}</div>
                            <div>Type: {dispute.type}</div>
                            <div>Reported by: {dispute.reportedBy}</div>
                            <div>Amount: ₹{dispute.amount.toLocaleString()}</div>
                            <div>Created: {dispute.createdAt}</div>
                          </div>
                          <p className="text-sm">{dispute.description}</p>
                        </div>
                        
                        {dispute.status === 'open' && (
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Investigate
                            </Button>
                            <Button size="sm" onClick={() => resolveDispute(dispute.id)}>
                              Resolve
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {disputes.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No active disputes
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="config" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Split Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Vendor Reward (%)</Label>
                      <Input
                        type="number"
                        value={splitRatios.vendor}
                        onChange={(e) => setSplitRatios(prev => ({ ...prev, vendor: parseInt(e.target.value) || 0 }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Kabadiwala Fee (%)</Label>
                      <Input
                        type="number"
                        value={splitRatios.kabadiwala}
                        onChange={(e) => setSplitRatios(prev => ({ ...prev, kabadiwala: parseInt(e.target.value) || 0 }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Hub Fee (%)</Label>
                      <Input
                        type="number"
                        value={splitRatios.hub}
                        onChange={(e) => setSplitRatios(prev => ({ ...prev, hub: parseInt(e.target.value) || 0 }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Government Share (%)</Label>
                      <Input
                        type="number"
                        value={splitRatios.government}
                        onChange={(e) => setSplitRatios(prev => ({ ...prev, government: parseInt(e.target.value) || 0 }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Platform Fee (%)</Label>
                      <Input
                        type="number"
                        value={splitRatios.platform}
                        onChange={(e) => setSplitRatios(prev => ({ ...prev, platform: parseInt(e.target.value) || 0 }))}
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span>Total:</span>
                      <span className={`font-bold ${Object.values(splitRatios).reduce((a, b) => a + b, 0) === 100 ? 'text-success' : 'text-destructive'}`}>
                        {Object.values(splitRatios).reduce((a, b) => a + b, 0)}%
                      </span>
                    </div>
                  </div>

                  <Button className="w-full">
                    Update Split Configuration
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Audit Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { action: 'Escrow released', user: 'Admin', timestamp: '2024-01-15 14:30', details: 'TXN001 - ₹1,350' },
                    { action: 'Split ratio updated', user: 'Admin', timestamp: '2024-01-14 09:15', details: 'Vendor: 50% → 55%' },
                    { action: 'Dispute resolved', user: 'Admin', timestamp: '2024-01-13 16:45', details: 'DSP001 - Quality issue' },
                  ].map((log, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{log.action}</div>
                          <div className="text-sm text-muted-foreground">{log.details}</div>
                        </div>
                        <div className="text-right text-xs text-muted-foreground">
                          <div>{log.user}</div>
                          <div>{log.timestamp}</div>
                        </div>
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

export default SettlementDashboard;