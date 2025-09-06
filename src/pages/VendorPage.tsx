import React, { useState } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  Award, 
  Users, 
  Gift, 
  Coins, 
  Leaf, 
  ArrowUp,
  Trophy,
  Star,
  Clock,
  Calendar,
  Target,
  CheckCircle2,
  Zap,
  MapPin,
  Camera,
  Plus,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

interface Transaction {
  id: string;
  type: 'earning' | 'bonus' | 'milestone';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending';
}

interface VendorRanking {
  rank: number;
  name: string;
  points: number;
  earnings: number;
  isCurrentUser?: boolean;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  type: 'bonus' | 'deal' | 'milestone';
  validUntil: string;
  claimed?: boolean;
}

const VendorPage = () => {
  const { toast } = useToast();
  const [currentBalance] = useState(2850);
  const [totalPoints] = useState(1240);
  const [currentTier] = useState('Silver');
  const [nextTierProgress] = useState(65);
  
  // Waste reporting form state
  const [wasteForm, setWasteForm] = useState({
    location: '',
    coordinates: { lat: 0, lng: 0 },
    wasteType: '',
    quantity: '',
    description: '',
    image: null as File | null,
    imagePreview: ''
  });

  const wasteTypes = [
    'Plastic Bottles',
    'Paper/Cardboard',
    'Electronic Waste',
    'Metal Scrap',
    'Glass',
    'Organic Waste',
    'Mixed Recyclables'
  ];

  const [transactions] = useState<Transaction[]>([
    {
      id: 'T001',
      type: 'earning',
      amount: 150,
      description: 'Plastic waste collection - 5kg',
      date: '2024-01-15',
      status: 'completed',
    },
    {
      id: 'T002',
      type: 'bonus',
      amount: 50,
      description: 'Quality bonus - excellent segregation',
      date: '2024-01-14',
      status: 'completed',
    },
    {
      id: 'T003',
      type: 'milestone',
      amount: 200,
      description: 'Silver tier achievement bonus',
      date: '2024-01-12',
      status: 'completed',
    },
    {
      id: 'T004',
      type: 'earning',
      amount: 120,
      description: 'E-waste collection - 3kg',
      date: '2024-01-10',
      status: 'pending',
    },
  ]);

  const [leaderboard] = useState<VendorRanking[]>([
    { rank: 1, name: 'Rajesh Kumar', points: 2450, earnings: 4200 },
    { rank: 2, name: 'Priya Sharma', points: 1890, earnings: 3100 },
    { rank: 3, name: 'You', points: 1240, earnings: 2850, isCurrentUser: true },
    { rank: 4, name: 'Amit Singh', points: 980, earnings: 2200 },
    { rank: 5, name: 'Sunita Devi', points: 740, earnings: 1800 },
  ]);

  const [rewards] = useState<Reward[]>([
    {
      id: 'R001',
      title: 'Weekend Bonus',
      description: '20% extra earnings on weekend collections',
      points: 100,
      type: 'bonus',
      validUntil: '2024-01-21',
    },
    {
      id: 'R002',
      title: 'Bulk Collection Deal',
      description: 'Collect 10kg+ waste for 25% bonus',  
      points: 200,
      type: 'deal',
      validUntil: '2024-01-25',
    },
    {
      id: 'R003',
      title: 'Gold Tier Milestone',
      description: 'Reach Gold tier for ₹500 bonus',
      points: 500,
      type: 'milestone',
      validUntil: '2024-02-28',
    },
  ]);

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'Bronze': return <Award className="h-5 w-5 text-tier-bronze" />;
      case 'Silver': return <Award className="h-5 w-5 text-tier-silver" />;
      case 'Gold': return <Award className="h-5 w-5 text-tier-gold" />;
      default: return <Award className="h-5 w-5" />;
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'earning': return <Coins className="h-4 w-4 text-eco-primary" />;
      case 'bonus': return <Gift className="h-4 w-4 text-eco-accent" />;
      case 'milestone': return <Trophy className="h-4 w-4 text-tier-gold" />;
      default: return <Coins className="h-4 w-4" />;
    }
  };

  const getRewardIcon = (type: string) => {
    switch (type) {
      case 'bonus': return <Zap className="h-5 w-5 text-eco-accent" />;
      case 'deal': return <Target className="h-5 w-5 text-eco-secondary" />;
      case 'milestone': return <Trophy className="h-5 w-5 text-tier-gold" />;
      default: return <Gift className="h-5 w-5" />;
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setWasteForm(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setWasteForm(prev => ({ ...prev, imagePreview: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setWasteForm(prev => ({
          ...prev,
          coordinates: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        }));
        toast({
          title: "Location obtained",
          description: "GPS coordinates have been set successfully.",
        });
      }, (error) => {
        toast({
          title: "Location error",
          description: "Unable to get current location. Please enter manually.",
          variant: "destructive",
        });
      });
    }
  };

  const handleWasteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!wasteForm.location || !wasteForm.wasteType || !wasteForm.quantity) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Waste reported successfully!",
        description: `You've earned 50 points and ₹75 for reporting ${wasteForm.wasteType}. Keep up the great work!`,
      });
      
      // Reset form
      setWasteForm({
        location: '',
        coordinates: { lat: 0, lng: 0 },
        wasteType: '',
        quantity: '',
        description: '',
        image: null,
        imagePreview: ''
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-primary/5 via-background to-eco-secondary/5">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-eco-primary/10 flex items-center justify-center">
                <Leaf className="h-5 w-5 text-eco-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Vendor Dashboard</h1>
                <p className="text-muted-foreground text-sm">Eco-Rewards System</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {getTierIcon(currentTier)}
              <span className="font-semibold text-foreground">{currentTier} Vendor</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Wallet Balance Card */}
        <Card className="bg-gradient-to-r from-eco-primary to-eco-secondary text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Wallet className="h-5 w-5" />
                  <span className="text-sm opacity-90">Wallet Balance</span>
                </div>
                <div className="text-3xl font-bold">₹{currentBalance.toLocaleString()}</div>
                <div className="text-sm opacity-90 mt-1">+12% from last month</div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-4 w-4" />
                  <span className="text-sm opacity-90">Points</span>
                </div>
                <div className="text-xl font-semibold">{totalPoints}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tier Progress */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-eco-primary" />
              Tier Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Current: {currentTier}</span>
                <span className="text-sm text-muted-foreground">Next: Gold</span>
              </div>
              <Progress value={nextTierProgress} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{totalPoints} points</span>
                <span>1,500 points needed for Gold</span>
              </div>
              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-tier-bronze"></div>
                  <span className="text-xs">Bronze (0-500)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-tier-silver"></div>
                  <span className="text-xs">Silver (500-1500)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-tier-gold"></div>
                  <span className="text-xs">Gold (1500+)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="transactions" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="report">Report Waste</TabsTrigger>
          </TabsList>

          {/* Transaction History */}
          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-eco-primary" />
                  Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {getTransactionIcon(transaction.type)}
                        <div>
                          <div className="font-medium text-sm">{transaction.description}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            {transaction.date}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-eco-primary">
                          +₹{transaction.amount}
                        </div>
                        <Badge 
                          variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Leaderboard */}
          <TabsContent value="leaderboard" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-eco-primary" />
                  Local Rankings
                  <Badge variant="secondary" className="ml-auto">Your Area</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((vendor) => (
                    <div
                      key={vendor.rank}
                      className={`flex items-center justify-between p-4 border rounded-lg ${
                        vendor.isCurrentUser 
                          ? 'bg-eco-primary/10 border-eco-primary/30' 
                          : 'hover:bg-muted/50'
                      } transition-colors`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          vendor.rank === 1 ? 'bg-tier-gold text-white' :
                          vendor.rank === 2 ? 'bg-tier-silver text-white' :
                          vendor.rank === 3 ? 'bg-tier-bronze text-white' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {vendor.rank}
                        </div>
                        <div>
                          <div className={`font-medium ${vendor.isCurrentUser ? 'text-eco-primary' : ''}`}>
                            {vendor.name}
                            {vendor.isCurrentUser && <span className="ml-2 text-xs">(You)</span>}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {vendor.points} points
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-eco-primary">
                          ₹{vendor.earnings.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">earned</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rewards */}
          <TabsContent value="rewards" className="space-y-4">
            <div className="grid gap-4">
              {rewards.map((reward) => (
                <Card key={reward.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        {getRewardIcon(reward.type)}
                        <div className="space-y-1">
                          <h3 className="font-semibold">{reward.title}</h3>
                          <p className="text-sm text-muted-foreground">{reward.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Valid until {reward.validUntil}
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3" />
                              {reward.points} points
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant={reward.claimed ? "secondary" : "default"}
                        className="bg-eco-primary hover:bg-eco-primary/90"
                        disabled={reward.claimed}
                      >
                        {reward.claimed ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          "Claim"
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Bonus Achievement Section */}
            <Card className="bg-gradient-to-r from-eco-accent/10 to-eco-secondary/10 border-eco-primary/20">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-eco-primary/20 flex items-center justify-center">
                      <ArrowUp className="h-8 w-8 text-eco-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Keep Growing!</h3>
                    <p className="text-sm text-muted-foreground">
                      Continue collecting quality waste to unlock more rewards and climb the leaderboard
                    </p>
                  </div>
                  <Button className="bg-eco-primary hover:bg-eco-primary/90">
                    View Collection Tips
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Report Waste */}
          <TabsContent value="report" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-eco-primary" />
                  Report New Waste Collection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleWasteSubmit} className="space-y-6">
                  {/* Image Upload */}
                  <div>
                    <Label>Upload Photo of Waste (Optional)</Label>
                    <div className="mt-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="waste-image"
                      />
                      <label
                        htmlFor="waste-image"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-eco-primary/50 transition-colors"
                      >
                        {wasteForm.imagePreview ? (
                          <img
                            src={wasteForm.imagePreview}
                            alt="Waste preview"
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="flex flex-col items-center gap-2">
                            <Camera className="h-8 w-8 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              Click to upload waste photo
                            </span>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">Collection Location *</Label>
                      <Input
                        id="location"
                        type="text"
                        placeholder="Enter collection address"
                        value={wasteForm.location}
                        onChange={(e) => setWasteForm(prev => ({ ...prev, location: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label>GPS Coordinates</Label>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={getCurrentLocation}
                        className="w-full justify-start"
                      >
                        <MapPin className="h-4 w-4 mr-2" />
                        {wasteForm.coordinates.lat && wasteForm.coordinates.lng 
                          ? `${wasteForm.coordinates.lat.toFixed(4)}, ${wasteForm.coordinates.lng.toFixed(4)}`
                          : "Get Current Location"
                        }
                      </Button>
                    </div>
                  </div>

                  {/* Waste Type and Quantity */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="waste-type">Waste Type *</Label>
                      <Select
                        value={wasteForm.wasteType}
                        onValueChange={(value) => setWasteForm(prev => ({ ...prev, wasteType: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select waste type" />
                        </SelectTrigger>
                        <SelectContent>
                          {wasteTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              <div className="flex items-center gap-2">
                                <Trash2 className="h-4 w-4 text-eco-primary" />
                                {type}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="quantity">Estimated Quantity (kg) *</Label>
                      <Input
                        id="quantity"
                        type="number"
                        placeholder="Enter quantity in kg"
                        value={wasteForm.quantity}
                        onChange={(e) => setWasteForm(prev => ({ ...prev, quantity: e.target.value }))}
                        min="0.1"
                        step="0.1"
                        required
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <Label htmlFor="description">Additional Notes (Optional)</Label>
                    <Textarea
                      id="description"
                      placeholder="Any additional details about the waste collection..."
                      value={wasteForm.description}
                      onChange={(e) => setWasteForm(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-eco-primary hover:bg-eco-primary/90"
                    size="lg"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Report Waste Collection
                  </Button>
                </form>

                {/* Information Card */}
                <Card className="mt-6 bg-eco-primary/5 border-eco-primary/20">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-eco-primary/20 flex items-center justify-center flex-shrink-0">
                        <Coins className="h-4 w-4 text-eco-primary" />
                      </div>
                      <div className="text-sm">
                        <h4 className="font-medium text-foreground mb-1">Earning Potential</h4>
                        <p className="text-muted-foreground">
                          Report waste collections to earn points and money. Quality segregation 
                          and accurate reporting leads to bonus rewards and tier upgrades!
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default VendorPage;