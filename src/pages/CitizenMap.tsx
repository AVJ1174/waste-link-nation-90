import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CitizenLeafletMap from '@/components/CitizenLeafletMap';
import { mockVendors, mockCitizenReports, mockMissedCalls } from '@/data/demoData';
const recycLinkLogo = '/lovable-uploads/1dd08f06-2005-4008-a9b6-5a13326e7a8f.png';

const CitizenMap = () => {
  return (
    <div className="min-h-screen bg-gradient-main">
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img src={recycLinkLogo} alt="RecycLink logo - three interlocking circles" className="h-8 w-8 filter contrast-125 brightness-110" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">RecycLink</h1>
                <p className="text-sm text-muted-foreground">Waste Reports Map</p>
              </div>
            </Link>
            <Link to="/citizen">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <CitizenLeafletMap 
          vendors={mockVendors}
          citizenReports={mockCitizenReports}
          missedCalls={mockMissedCalls}
          userRole="citizen"
        />
      </main>
    </div>
  );
};

export default CitizenMap;