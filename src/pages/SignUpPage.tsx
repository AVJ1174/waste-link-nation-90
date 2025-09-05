import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Lock, ArrowLeft, Users, Truck, Building, Recycle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'role' | 'phone' | 'otp'>('role');
  const [selectedRole, setSelectedRole] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const roles = [
    {
      id: 'vendor',
      name: 'Vendor',
      icon: Users,
      description: 'Submit segregated waste for collection and earn rewards',
      route: '/vendor'
    },
    {
      id: 'kabadiwala',
      name: 'Kabadiwala',
      icon: Truck,
      description: 'Collect waste from vendors and manage pickup routes',
      route: '/kabadiwala'
    },
    {
      id: 'citizen',
      name: 'Citizen',
      icon: User,
      description: 'Report waste spots and earn points for environmental contribution',
      route: '/citizen'
    },
    {
      id: 'recyclers',
      name: 'Recyclers',
      icon: Recycle,
      description: 'Purchase sorted waste from hubs and recycle it into reusable resources.',
      route: '/company'
    }
  ];

  const selectRole = (roleId: string) => {
    setSelectedRole(roleId);
    setStep('phone');
  };

  const sendOTP = async () => {
    if (!phone) return;
    
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setStep('otp');
  };

  const verifyOTP = async () => {
    if (!otp) return;
    
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);

    // Route based on selected role
    const role = roles.find(r => r.id === selectedRole);
    if (role) {
      navigate(role.route);
    } else {
      navigate('/vendor');
    }
  };

  const goBack = () => {
    if (step === 'otp') {
      setStep('phone');
    } else if (step === 'phone') {
      setStep('role');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-main flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Button
            variant="ghost"
            onClick={goBack}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {step === 'role' ? 'Back to Login' : 'Back'}
          </Button>
          <h1 className="text-3xl font-bold text-foreground mb-2">Join Recyclink</h1>
          <p className="text-muted-foreground">Create your account and start making a difference</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {step === 'role' && (
                <>
                  <Building className="h-5 w-5" />
                  Choose Your Role
                </>
              )}
              {step === 'phone' && (
                <>
                  <Phone className="h-5 w-5" />
                  Enter Phone Number
                </>
              )}
              {step === 'otp' && (
                <>
                  <Lock className="h-5 w-5" />
                  Verify OTP
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === 'role' && (
              <>
                <div className="space-y-3">
                  {roles.map((role) => {
                    const IconComponent = role.icon;
                    return (
                      <Card 
                        key={role.id}
                        className="cursor-pointer hover:shadow-md transition-all border-2 hover:border-primary/50"
                        onClick={() => selectRole(role.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <IconComponent className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-sm">{role.name}</h3>
                              <p className="text-xs text-muted-foreground mt-1">{role.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Or Option - Missed Call */}
                <div className="mt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 h-px bg-border"></div>
                    <span className="text-xs text-muted-foreground font-medium">OR</span>
                    <div className="flex-1 h-px bg-border"></div>
                  </div>
                  
                  <Card className="bg-gradient-to-br from-success/5 to-primary/5 border-success/20">
                    <CardContent className="p-4 text-center">
                      <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Phone className="h-4 w-4 text-success" />
                      </div>
                      <p className="text-sm font-bold mb-3">
                        Give a missed call to get started instantly
                      </p>
                      <div className="bg-card/60 backdrop-blur-sm rounded-lg p-3 border border-success/20">
                        <p className="text-xs text-muted-foreground mb-1">Demo Missed Call Number</p>
                        <p className="text-base font-bold text-success">+91 98765 43210</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Auto waste pickup request
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}

            {step === 'phone' && (
              <>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm">
                    Signing up as: <Badge variant="outline">{selectedRole}</Badge>
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendOTP()}
                  />
                </div>

                <Button 
                  onClick={sendOTP} 
                  className="w-full" 
                  disabled={!phone || loading}
                  size="lg"
                >
                  {loading ? 'Sending...' : 'Send OTP'}
                </Button>
              </>
            )}

            {step === 'otp' && (
              <>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm">
                    Creating account for: <Badge variant="outline">{phone}</Badge> as <Badge variant="outline">{selectedRole}</Badge>
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && verifyOTP()}
                  />
                  <p className="text-xs text-muted-foreground">
                    Demo OTP: 123456 (SMS simulation)
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setStep('phone')}
                    className="flex-1"
                  >
                    Change Number
                  </Button>
                  <Button 
                    onClick={verifyOTP} 
                    className="flex-1" 
                    disabled={!otp || loading}
                    size="lg"
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </div>

                <Button 
                  variant="ghost" 
                  onClick={sendOTP}
                  className="w-full text-sm"
                  disabled={loading}
                >
                  Resend OTP
                </Button>
              </>
            )}
            
            {step === 'role' && (
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Button 
                    variant="link" 
                    className="p-0 h-auto font-medium"
                    onClick={() => navigate('/auth')}
                  >
                    Login here
                  </Button>
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;