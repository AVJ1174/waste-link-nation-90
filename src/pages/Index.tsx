import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Building, Truck, Shield, ArrowRight, CheckCircle, TrendingUp, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
const recycLinkLogo = '/lovable-uploads/1dd08f06-2005-4008-a9b6-5a13326e7a8f.png';

const Index = () => {
  const navigate = useNavigate();

  const navigateToRole = (role: string) => {
    if (role === 'admin') {
      navigate('/admin-register');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-main">
      {/* Header */}
      <header className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate('/')}> 
              <img src={recycLinkLogo} alt="RecycLink interlocking circles logo" className="h-8 w-8 filter contrast-125 brightness-110" loading="eager" />
              <h1 className="text-xl font-bold text-foreground">Recyclink</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate('/auth')}>
                Login
              </Button>
              <Button onClick={() => navigateToRole('admin')}>
                Admin
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="outline" className="mb-4">
            🌱 Sustainable Waste Management Platform
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Connect. Collect. <span className="text-success">Recycle.</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Recyclink bridges street vendors, kabadiwalas, municipal hubs, and recycling companies 
            to create an efficient waste trading ecosystem with transparent payments and compliance tracking.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" onClick={() => navigateToRole('vendor')} className="gap-2">
              <Users className="h-5 w-5" />
              I'm a Vendor
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigateToRole('kabadiwala')} className="gap-2">
              <Truck className="h-5 w-5" />
              I'm a Kabadiwala
            </Button>
          </div>

          {/* Or Option - Missed Call */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1 h-px bg-border"></div>
              <span className="text-sm text-muted-foreground font-medium">OR</span>
              <div className="flex-1 h-px bg-border"></div>
            </div>
            
            <Card className="max-w-md mx-auto bg-gradient-to-br from-success/5 to-primary/5 border-success/20">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Phone className="h-6 w-6 text-success" />
                </div>
                <p className="font-bold mb-4">
                  Give a missed call to get started instantly
                </p>
                <div className="bg-card/60 backdrop-blur-sm rounded-lg p-3 border border-success/20">
                  <p className="text-xs text-muted-foreground mb-1">Demo Missed Call Number</p>
                  <p className="text-lg font-bold text-success">+91 98765 43210</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    We'll automatically create a waste pickup request at your location
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">1,247</div>
              <div className="text-sm text-muted-foreground">Active Vendors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">2.4T</div>
              <div className="text-sm text-muted-foreground">Daily Collection</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">₹8.5L</div>
              <div className="text-sm text-muted-foreground">Monthly Savings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">92%</div>
              <div className="text-sm text-muted-foreground">EPR Compliance</div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Cards */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Role</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Street Vendor */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => navigateToRole('vendor')}>
              <CardHeader>
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-success" />
                </div>
                <CardTitle>Vendor</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Submit segregated waste for collection and earn rewards for contributing to recycling.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Easy waste submission
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Track collection status
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Earn monetary rewards
                  </li>
                </ul>
                <div className="mt-4 text-right">
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-success transition-colors" />
                </div>
              </CardContent>
            </Card>

            {/* Kabadiwala */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => navigateToRole('kabadiwala')}>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Kabadiwala</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Accept collection tasks, manage routes efficiently, and log collections with photo verification.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Real-time task notifications
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Route optimization
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Offline collection support
                  </li>
                </ul>
                <div className="mt-4 text-right">
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </CardContent>
            </Card>

            {/* Recyclers */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => navigateToRole('company')}>
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Building className="h-6 w-6 text-accent-foreground" />
                </div>
                <CardTitle>Recyclers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Purchase verified waste batches from hubs with full compliance documentation and audit trails.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Quality-verified batches
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    EPR compliance reports
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Secure escrow payments
                  </li>
                </ul>
                <div className="mt-4 text-right">
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent-foreground transition-colors" />
                </div>
              </CardContent>
            </Card>

            {/* Citizen */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => navigate('/citizen')}>
              <CardHeader>
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
                <CardTitle>Citizen</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Report waste spots in your area and earn points for contributing to a cleaner environment.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Report waste spots easily
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Earn reward points
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Win exciting giveaways
                  </li>
                </ul>
                <div className="mt-4 text-right">
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-500 transition-colors" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Admin Access Note */}
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground mb-2">
              Government officials and municipal hubs require admin registration
            </p>
            <Button variant="outline" onClick={() => navigateToRole('admin')} className="gap-2">
              <Shield className="h-4 w-4" />
              Admin Registration
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How Recyclink Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-success">1</span>
              </div>
              <h3 className="font-semibold mb-2">Vendor Submits</h3>
              <p className="text-sm text-muted-foreground">Street vendors register waste with location and type</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold mb-2">Kabadiwala Collects</h3>
              <p className="text-sm text-muted-foreground">Collection agents pick up and transport to hubs</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent-foreground">3</span>
              </div>
              <h3 className="font-semibold mb-2">Hub Processes</h3>
              <p className="text-sm text-muted-foreground">MRFs create verified batches with QC checks</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-secondary-foreground">4</span>
              </div>
              <h3 className="font-semibold mb-2">Recycler Purchases</h3>
              <p className="text-sm text-muted-foreground">Recyclers buy with automated settlements</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-success" />
                  Real-time Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Live dashboards for government officials to track city-wide waste collection metrics and cost savings.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Secure Payments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Escrow-based payment system with automatic splits between all stakeholders upon delivery verification.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent-foreground" />
                  Compliance Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Complete chain of custody documentation and EPR compliance reports for regulatory requirements.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <img src={recycLinkLogo} alt="RecycLink interlocking circles logo" className="h-6 w-6 filter contrast-125 brightness-110" loading="lazy" />
              <span className="font-semibold">Recyclink</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <button className="hover:text-foreground transition-colors">Privacy Policy</button>
              <button className="hover:text-foreground transition-colors">How It Works</button>
              <button className="hover:text-foreground transition-colors">Pilot Zones</button>
              <button className="hover:text-foreground transition-colors">Contact</button>
            </div>
          </div>
          <div className="text-center text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
            © 2024 Recyclink. Built for sustainable waste management.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;