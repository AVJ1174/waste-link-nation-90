import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Lock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const AuthPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  // Demo credentials for different roles
  const demoCredentials = {
    'vendor': '9876543210',
    'kabadiwala': '9876543220', 
    'hub': '9876543230',
    'recyclers': '9876543240',
    'government': '9876543250',
    'citizen': '9876543260',
    'admin': '9999999999'
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

    // Route based on phone number (demo logic)
    if (phone === demoCredentials.vendor) {
      navigate('/vendor');
    } else if (phone === demoCredentials.kabadiwala) {
      navigate('/kabadiwala');
    } else if (phone === demoCredentials.hub) {
      navigate('/hub');
    } else if (phone === demoCredentials.recyclers) {
      navigate('/company');
    } else if (phone === demoCredentials.government) {
      navigate('/government');
    } else if (phone === demoCredentials.citizen) {
      navigate('/citizen');
    } else if (phone === demoCredentials.admin) {
      navigate('/settlement');
    } else {
      // Default to vendor for demo
      navigate('/vendor');
    }
  };

  const getRoleFromPhone = (phoneNumber: string) => {
    const entry = Object.entries(demoCredentials).find(([role, number]) => number === phoneNumber);
    return entry ? entry[0] : 'vendor';
  };

  return (
    <div className="min-h-screen bg-gradient-main flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-foreground mb-2">Login to Recyclink</h1>
          <p className="text-muted-foreground">Secure OTP-based authentication</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {step === 'phone' ? (
                <>
                  <Phone className="h-5 w-5" />
                  Enter Phone Number
                </>
              ) : (
                <>
                  <Lock className="h-5 w-5" />
                  Verify OTP
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === 'phone' ? (
              <>
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
                
                {phone && Object.values(demoCredentials).includes(phone) && (
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm">
                      Demo login as: <Badge variant="outline">{getRoleFromPhone(phone)}</Badge>
                    </p>
                  </div>
                )}

                <Button 
                  onClick={sendOTP} 
                  className="w-full" 
                  disabled={!phone || loading}
                  size="lg"
                >
                  {loading ? 'Sending...' : 'Send OTP'}
                </Button>
              </>
            ) : (
              <>
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
                    {loading ? 'Verifying...' : 'Verify & Login'}
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
            
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                New user?{' '}
                <Button 
                  variant="link" 
                  className="p-0 h-auto font-medium"
                  onClick={() => navigate('/signup')}
                >
                  Sign up here
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 space-y-3">
          <p className="text-center text-sm text-muted-foreground">Demo Credentials</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {Object.entries(demoCredentials).map(([role, number]) => (
              <div key={role} className="flex justify-between p-2 bg-muted rounded">
                <span className="capitalize">{role}:</span>
                <span className="font-mono">{number}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;