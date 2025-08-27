import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, UserPlus, ArrowLeft, Building, Landmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

const AdminRegister = () => {
  const navigate = useNavigate();
  const [adminVerified, setAdminVerified] = useState(false);
  const [adminPhone, setAdminPhone] = useState('');
  const [adminOTP, setAdminOTP] = useState('');
  
  const [newUser, setNewUser] = useState({
    role: '',
    name: '',
    phone: '',
    organization: '',
    location: '',
    capacity: '',
    description: ''
  });

  const verifyAdmin = () => {
    if (adminPhone === '9999999999' && adminOTP === '123456') {
      setAdminVerified(true);
    } else {
      alert('Invalid admin credentials');
    }
  };

  const registerUser = () => {
    if (!newUser.role || !newUser.name || !newUser.phone) {
      alert('Please fill all required fields');
      return;
    }

    console.log('Registering new user:', newUser);
    alert(`Successfully registered ${newUser.name} as ${newUser.role}`);
    
    // Reset form
    setNewUser({
      role: '',
      name: '',
      phone: '',
      organization: '',
      location: '',
      capacity: '',
      description: ''
    });
  };

  const sendAdminOTP = () => {
    if (adminPhone === '9999999999') {
      alert('OTP sent! Demo OTP: 123456');
    } else {
      alert('Invalid admin phone number');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-main">
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => navigate('/')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Admin Registration</h1>
                <p className="text-muted-foreground">Register Government & Hub Users</p>
              </div>
            </div>
            <Badge variant="outline" className="gap-1">
              <Shield className="h-3 w-3" />
              Admin Only
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {!adminVerified ? (
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Admin Verification Required
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-phone">Admin Phone Number</Label>
                  <div className="flex gap-2">
                    <Input
                      id="admin-phone"
                      placeholder="9999999999"
                      value={adminPhone}
                      onChange={(e) => setAdminPhone(e.target.value)}
                    />
                    <Button variant="outline" onClick={sendAdminOTP}>
                      Send OTP
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admin-otp">Enter OTP</Label>
                  <Input
                    id="admin-otp"
                    placeholder="123456"
                    value={adminOTP}
                    onChange={(e) => setAdminOTP(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Demo admin phone: 9999999999 | OTP: 123456
                  </p>
                </div>

                <Button onClick={verifyAdmin} className="w-full">
                  Verify Admin Access
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  Register New User
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">User Role</Label>
                    <Select value={newUser.role} onValueChange={(value) => setNewUser(prev => ({ ...prev, role: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="government">
                          <div className="flex items-center gap-2">
                            <Landmark className="h-4 w-4" />
                            Government Official
                          </div>
                        </SelectItem>
                        <SelectItem value="hub">
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4" />
                            Municipal Hub (MRF)
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={newUser.name}
                      onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="9876543210"
                      value={newUser.phone}
                      onChange={(e) => setNewUser(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization</Label>
                    <Input
                      id="organization"
                      placeholder={newUser.role === 'government' ? 'Delhi Municipal Corporation' : 'Central MRF Delhi'}
                      value={newUser.organization}
                      onChange={(e) => setNewUser(prev => ({ ...prev, organization: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location/Ward</Label>
                    <Input
                      id="location"
                      placeholder="Central Delhi, Ward 15"
                      value={newUser.location}
                      onChange={(e) => setNewUser(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>

                  {newUser.role === 'hub' && (
                    <div className="space-y-2">
                      <Label htmlFor="capacity">Processing Capacity (tons/day)</Label>
                      <Input
                        id="capacity"
                        type="number"
                        placeholder="50"
                        value={newUser.capacity}
                        onChange={(e) => setNewUser(prev => ({ ...prev, capacity: e.target.value }))}
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description/Notes</Label>
                  <Textarea
                    id="description"
                    placeholder="Additional information about the user or facility..."
                    value={newUser.description}
                    onChange={(e) => setNewUser(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setAdminVerified(false)} className="flex-1">
                    Logout Admin
                  </Button>
                  <Button onClick={registerUser} className="flex-1">
                    Register User
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recent Registrations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Rajesh Kumar', role: 'government', org: 'DMC North Zone', date: '2024-01-15' },
                    { name: 'Priya Sharma', role: 'hub', org: 'Green MRF Karol Bagh', date: '2024-01-14' },
                    { name: 'Amit Singh', role: 'government', org: 'DMC South Zone', date: '2024-01-13' },
                  ].map((user, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.org}</div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="mb-1">
                          {user.role}
                        </Badge>
                        <div className="text-xs text-muted-foreground">{user.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminRegister;