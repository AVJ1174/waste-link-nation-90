import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Camera, MapPin, Upload, Send, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
const recycLinkLogo = '/lovable-uploads/1dd08f06-2005-4008-a9b6-5a13326e7a8f.png';

const CitizenReportWaste = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    location: '',
    coordinates: { lat: 28.6139, lng: 77.2090 },
    wasteType: '',
    description: '',
    image: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const wasteTypes = ['Plastic', 'Paper', 'Metal', 'Glass', 'E-waste', 'Organic', 'Textile', 'Mixed'];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.location || !formData.wasteType || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const pointsEarned = Math.floor(Math.random() * 50) + 20; // 20-70 points
    
    toast({
      title: "Report Submitted Successfully! 🎉",
      description: `Thank you for helping keep Delhi clean! You earned ${pointsEarned} points.`,
    });
    
    setIsSubmitting(false);
    navigate('/citizen');
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            coordinates: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          }));
          toast({
            title: "Location Updated",
            description: "Your current location has been set.",
          });
        },
        (error) => {
          toast({
            title: "Location Error",
            description: "Could not get your location. Please enter manually.",
            variant: "destructive"
          });
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-main">
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img src={recycLinkLogo} alt="RecycLink logo - three interlocking circles" className="h-8 w-8 filter contrast-125 brightness-110" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">RecycLink</h1>
                <p className="text-sm text-muted-foreground">Report Waste</p>
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

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-primary" />
              Report a Waste Spot
            </CardTitle>
            <p className="text-muted-foreground">
              Help keep Delhi clean by reporting waste spots in your area. Earn points for every valid report!
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="image">Photo of Waste Spot *</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  {formData.image ? (
                    <div>
                      <img 
                        src={URL.createObjectURL(formData.image)} 
                        alt="Waste spot" 
                        className="max-w-full h-48 mx-auto object-cover rounded-lg mb-4"
                      />
                      <p className="text-sm text-muted-foreground">{formData.image.name}</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                      <div>
                        <p className="text-lg font-medium">Upload a photo</p>
                        <p className="text-sm text-muted-foreground">
                          Take a clear photo of the waste spot
                        </p>
                      </div>
                    </div>
                  )}
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    capture="environment"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Label htmlFor="image">
                    <Button type="button" variant="outline" className="mt-4">
                      <Camera className="h-4 w-4 mr-2" />
                      {formData.image ? 'Change Photo' : 'Take Photo'}
                    </Button>
                  </Label>
                </div>
              </div>

              {/* Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Near Metro Station, Connaught Place"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>GPS Coordinates</Label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={getCurrentLocation}
                    className="w-full"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Get Current Location
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Lat: {formData.coordinates.lat.toFixed(4)}, Lng: {formData.coordinates.lng.toFixed(4)}
                  </p>
                </div>
              </div>

              {/* Waste Type */}
              <div className="space-y-2">
                <Label>Type of Waste *</Label>
                <Select value={formData.wasteType} onValueChange={(value) => setFormData(prev => ({ ...prev, wasteType: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select waste type" />
                  </SelectTrigger>
                  <SelectContent>
                    {wasteTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the waste spot (e.g., overflowing bins, illegal dumping, size of waste pile...)"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  required
                />
              </div>

              {/* Reward Info */}
              <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <div className="text-success">🎁</div>
                  <div>
                    <div className="font-medium text-success">Earn Points for This Report!</div>
                    <div className="text-sm text-muted-foreground">
                      You'll earn 20-70 points based on the quality and importance of your report. 
                      Points can be redeemed for rewards from our partner companies!
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                size="lg" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>Submitting Report...</>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Report
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CitizenReportWaste;