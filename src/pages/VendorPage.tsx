import React, { useState } from 'react';
import { CheckCircle, MapPin, Package, Clock, Trophy, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

interface Submission {
  id: string;
  wasteType: string;
  quantity: string;
  location: string;
  status: 'collected' | 'scheduled' | 'rewarded';
  submittedAt: string;
  reward?: string;
  estimatedReward?: string;
  collectedBy?: string;
  scheduledTime?: string;
  eventDate?: string;
  eventTime?: string;
  contact?: string;
}

const VendorPage = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      id: 'S001',
      wasteType: 'Plastic',
      quantity: '5kg',
      location: 'Connaught Place',
      status: 'collected',
      reward: '₹150',
      submittedAt: '2024-01-15',
      collectedBy: 'Kabadiwala K001'
    },
    {
      id: 'S002',
      wasteType: 'Paper',
      quantity: '8kg',
      location: 'Karol Bagh',
      status: 'scheduled',
      estimatedReward: '₹120',
      submittedAt: '2024-01-16',
      scheduledTime: '2:00 PM'
    }
  ]);

  const [newSubmission, setNewSubmission] = useState({
    location: '',
    wasteType: 'Plastic',
    quantity: '',
    eventDate: '',
    eventTime: '',
    contact: ''
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const submitWaste = () => {
    if (!newSubmission.location || !newSubmission.quantity) return;

    const submission: Submission = {
      id: 'S' + String(Date.now()).slice(-3),
      wasteType: newSubmission.wasteType,
      quantity: newSubmission.quantity,
      location: newSubmission.location,
      status: 'scheduled',
      estimatedReward: '₹' + (parseFloat(newSubmission.quantity) * 30),
      submittedAt: new Date().toISOString().split('T')[0],
      scheduledTime: newSubmission.eventTime || '2:00 PM',
      eventDate: newSubmission.eventDate,
      eventTime: newSubmission.eventTime,
      contact: newSubmission.contact
    };

    setSubmissions(prev => [submission, ...prev]);
    setNewSubmission({ location: '', wasteType: 'Plastic', quantity: '', eventDate: '', eventTime: '', contact: '' });
    setOtpSent(true);
  };

  const sendOTP = () => {
    console.log('Sending OTP to:', newSubmission.contact);
    setOtpSent(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'collected': return 'default';
      case 'scheduled': return 'secondary';
      case 'rewarded': return 'outline';
      default: return 'outline';
    }
  };

  const totalRewards = submissions
    .filter(s => s.status === 'collected' && s.reward)
    .reduce((sum, s) => sum + parseInt(s.reward?.replace('₹', '') || '0'), 0);

  return (
    <div className="min-h-screen bg-gradient-main">
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Vendor Dashboard</h1>
              <p className="text-muted-foreground">Submit & Track Your Waste Collections</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1">
                <Trophy className="h-3 w-3" />
                Total Rewards: ₹{totalRewards}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="submit" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="submit">Submit Waste</TabsTrigger>
            <TabsTrigger value="track">Track Collections</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
          </TabsList>

          <TabsContent value="submit" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  New Waste Submission
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location (Area/Pin)</Label>
                    <Input
                      id="location"
                      placeholder="Connaught Place, Delhi"
                      value={newSubmission.location}
                      onChange={(e) => setNewSubmission(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="waste-type">Waste Type</Label>
                    <Select value={newSubmission.wasteType} onValueChange={(value) => setNewSubmission(prev => ({ ...prev, wasteType: value }))}>
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
                    <Label htmlFor="quantity">Estimated Quantity (kg)</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="5.0"
                      value={newSubmission.quantity}
                      onChange={(e) => setNewSubmission(prev => ({ ...prev, quantity: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact">Contact Number (Optional)</Label>
                    <div className="flex gap-2">
                      <Input
                        id="contact"
                        placeholder="9876543210"
                        value={newSubmission.contact}
                        onChange={(e) => setNewSubmission(prev => ({ ...prev, contact: e.target.value }))}
                      />
                      {newSubmission.contact && !otpSent && (
                        <Button variant="outline" onClick={sendOTP}>
                          Send OTP
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="event-date">Preferred Collection Date</Label>
                    <Input
                      id="event-date"
                      type="date"
                      value={newSubmission.eventDate}
                      onChange={(e) => setNewSubmission(prev => ({ ...prev, eventDate: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="event-time">Preferred Time</Label>
                    <Input
                      id="event-time"
                      type="time"
                      value={newSubmission.eventTime}
                      onChange={(e) => setNewSubmission(prev => ({ ...prev, eventTime: e.target.value }))}
                    />
                  </div>
                </div>

                {otpSent && (
                  <div className="space-y-2">
                    <Label htmlFor="otp">Enter OTP</Label>
                    <div className="flex gap-2">
                      <Input
                        id="otp"
                        placeholder="123456"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                      <Button variant="outline">Verify</Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Demo OTP: 123456 (SMS simulation)
                    </p>
                  </div>
                )}

                <Button onClick={submitWaste} className="w-full" size="lg">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Submit Waste for Collection
                </Button>

                {newSubmission.quantity && (
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm">
                      Estimated Reward: <span className="font-semibold text-success">
                        ₹{parseFloat(newSubmission.quantity || '0') * 30}
                      </span>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="track" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Your Submissions</h2>
              <div className="flex gap-2">
                <Badge variant="default">{submissions.filter(s => s.status === 'collected').length} Collected</Badge>
                <Badge variant="secondary">{submissions.filter(s => s.status === 'scheduled').length} Scheduled</Badge>
              </div>
            </div>

            <div className="grid gap-4">
              {submissions.map((submission) => (
                <Card key={submission.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">#{submission.id}</h3>
                          <Badge variant={getStatusColor(submission.status)}>
                            {submission.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <div className="flex items-center gap-1">
                            <Package className="h-3 w-3" />
                            {submission.wasteType} - {submission.quantity}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {submission.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Submitted: {submission.submittedAt}
                          </div>
                          {submission.collectedBy && (
                            <div>Collected by: {submission.collectedBy}</div>
                          )}
                          {submission.scheduledTime && (
                            <div>Scheduled: {submission.scheduledTime}</div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        {submission.reward && (
                          <div className="text-lg font-semibold text-success">{submission.reward}</div>
                        )}
                        {submission.estimatedReward && !submission.reward && (
                          <div className="text-sm text-muted-foreground">Est. {submission.estimatedReward}</div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Earned</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-success">₹{totalRewards}</div>
                  <p className="text-muted-foreground">This month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Collections</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{submissions.filter(s => s.status === 'collected').length}</div>
                  <p className="text-muted-foreground">Successful pickups</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <div className="text-3xl font-bold">4.8</div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className={`h-4 w-4 ${star <= 4.8 ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground">Quality rating</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Reward History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {submissions.filter(s => s.reward).map((submission) => (
                    <div key={submission.id} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{submission.wasteType} - {submission.quantity}</div>
                        <div className="text-sm text-muted-foreground">{submission.submittedAt}</div>
                      </div>
                      <div className="text-success font-semibold">{submission.reward}</div>
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

export default VendorPage;