import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Gift, Star, ArrowLeft, Trophy, Users, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { mockRewards, mockCitizens } from '@/data/demoData';
const recycLinkLogo = '/lovable-uploads/1dd08f06-2005-4008-a9b6-5a13326e7a8f.png';

const CitizenRewards = () => {
  const { toast } = useToast();
  const currentCitizen = mockCitizens[0];
  const [activeTab, setActiveTab] = useState('rewards');

  const handleClaimReward = (reward: any) => {
    if (currentCitizen.totalPoints >= reward.pointsCost) {
      toast({
        title: "Reward Claimed! 🎉",
        description: `You've successfully claimed ${reward.title}. Check your email for details.`,
      });
    } else {
      toast({
        title: "Not Enough Points",
        description: `You need ${reward.pointsCost - currentCitizen.totalPoints} more points to claim this reward.`,
        variant: "destructive"
      });
    }
  };

  // Generate leaderboard data
  const leaderboard = mockCitizens
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .slice(0, 10)
    .map((citizen, index) => ({
      ...citizen,
      rank: index + 1
    }));

  const currentCitizenRank = leaderboard.find(c => c.id === currentCitizen.id)?.rank || 47;

  return (
    <div className="min-h-screen bg-gradient-main">
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img src={recycLinkLogo} alt="RecycLink logo - three interlocking circles" className="h-8 w-8 filter contrast-125 brightness-110" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">RecycLink</h1>
                <p className="text-sm text-muted-foreground">Rewards & Leaderboard</p>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/citizen">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Badge variant="default" className="text-lg px-3 py-1">
                <Star className="h-4 w-4 mr-1" />
                {currentCitizen.totalPoints} pts
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="rewards">Available Rewards</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="rewards" className="space-y-6">
            {/* User Points Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-warning" />
                  Your Points Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{currentCitizen.totalPoints}</div>
                    <div className="text-sm text-muted-foreground">Total Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-success">{currentCitizen.reportsCount}</div>
                    <div className="text-sm text-muted-foreground">Reports Made</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-warning">#{currentCitizenRank}</div>
                    <div className="text-sm text-muted-foreground">City Ranking</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rewards Grid */}
            <div className="grid gap-6">
              <h2 className="text-2xl font-bold">Available Rewards</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockRewards.map((reward) => {
                  const canAfford = currentCitizen.totalPoints >= reward.pointsCost;
                  return (
                    <Card key={reward.id} className={canAfford ? '' : 'opacity-75'}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{reward.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">by {reward.sponsor}</p>
                          </div>
                          <Badge variant={reward.category === 'voucher' ? 'default' : 
                                        reward.category === 'product' ? 'secondary' : 'outline'}>
                            {reward.category}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                          <Gift className="h-12 w-12 text-muted-foreground" />
                        </div>
                        
                        <p className="text-sm">{reward.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-warning" />
                            <span className="font-bold">{reward.pointsCost} points</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {reward.stock} left
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full"
                          variant={canAfford ? "default" : "outline"}
                          disabled={!canAfford || reward.stock === 0}
                          onClick={() => handleClaimReward(reward)}
                        >
                          {reward.stock === 0 ? 'Out of Stock' :
                           canAfford ? 'Claim Reward' : 
                           `Need ${reward.pointsCost - currentCitizen.totalPoints} more points`}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            {/* Current User Highlight */}
            <Card className="border-primary/50 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-warning" />
                  Your Position
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-bold text-primary">#{currentCitizenRank}</div>
                    <div>
                      <div className="font-medium">{currentCitizen.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {currentCitizen.totalPoints} points • {currentCitizen.reportsCount} reports
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline">
                    <Users className="h-3 w-3 mr-1" />
                    Top 50
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-warning" />
                  Top Citizens Leaderboard
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Citizens ranked by their environmental impact and community contribution
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((citizen) => (
                    <div 
                      key={citizen.id} 
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        citizen.id === currentCitizen.id ? 'border-primary bg-primary/5' : 'border-border'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`text-2xl font-bold ${
                          citizen.rank === 1 ? 'text-warning' :
                          citizen.rank === 2 ? 'text-muted-foreground' :
                          citizen.rank === 3 ? 'text-orange-600' : 'text-muted-foreground'
                        }`}>
                          #{citizen.rank}
                        </div>
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {citizen.name}
                            {citizen.rank <= 3 && (
                              <Crown className={`h-4 w-4 ${
                                citizen.rank === 1 ? 'text-warning' :
                                citizen.rank === 2 ? 'text-muted-foreground' :
                                'text-orange-600'
                              }`} />
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {citizen.reportsCount} reports • Joined {citizen.joinedAt}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">{citizen.totalPoints}</div>
                        <div className="text-xs text-muted-foreground">points</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Keep reporting waste spots to climb the leaderboard and unlock exclusive rewards!
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CitizenRewards;