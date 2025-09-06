import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, MapPin, Award, Gift, Plus, TrendingUp, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockCitizenReports, mockCitizens, mockRewards } from '@/data/demoData';
const recycLinkLogo = '/lovable-uploads/1dd08f06-2005-4008-a9b6-5a13326e7a8f.png';

const CitizenDashboard = () => {
  // Simulate current citizen
  const currentCitizen = mockCitizens[0];
  const myReports = mockCitizenReports.slice(0, 5);
  const availableRewards = mockRewards.slice(0, 4);
  
  const nextRewardThreshold = 1000;
  const progressPercentage = (currentCitizen.totalPoints / nextRewardThreshold) * 100;

  return (
    <div className="min-h-screen bg-gradient-main">
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img src={recycLinkLogo} alt="RecycLink logo - three interlocking circles" className="h-8 w-8 filter contrast-125 brightness-110" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">RecycLink</h1>
                <p className="text-sm text-muted-foreground">Citizen Dashboard</p>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="font-medium">{currentCitizen.name}</div>
                <div className="text-sm text-muted-foreground">{currentCitizen.totalPoints} points</div>
              </div>
              <Badge variant="default" className="text-lg px-3 py-1">
                🌱 Eco Warrior
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid gap-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Points</CardTitle>
                <Star className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{currentCitizen.totalPoints}</div>
                <p className="text-xs text-muted-foreground">+120 this week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reports Made</CardTitle>
                <Camera className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentCitizen.reportsCount}</div>
                <p className="text-xs text-muted-foreground">+3 this week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Impact Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92</div>
                <p className="text-xs text-muted-foreground">Environmental impact</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">City Rank</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">#47</div>
                <p className="text-xs text-muted-foreground">Out of 2,486 citizens</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/citizen/report">
                  <Button className="w-full h-20 flex flex-col gap-2" size="lg">
                    <Plus className="h-6 w-6" />
                    <span>Report Waste</span>
                  </Button>
                </Link>
                
                <Link to="/citizen/rewards">
                  <Button variant="outline" className="w-full h-20 flex flex-col gap-2" size="lg">
                    <Gift className="h-6 w-6" />
                    <span>View Rewards</span>
                  </Button>
                </Link>
                
                <Link to="/citizen/map">
                  <Button variant="outline" className="w-full h-20 flex flex-col gap-2" size="lg">
                    <MapPin className="h-6 w-6" />
                    <span>View Map</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Progress to Next Reward */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-warning" />
                  Progress to Next Reward
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>{currentCitizen.totalPoints} points</span>
                    <span>{nextRewardThreshold} points</span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                </div>
                <div className="text-sm text-muted-foreground">
                  You need {nextRewardThreshold - currentCitizen.totalPoints} more points to unlock premium rewards!
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline">Next: Amazon ₹1000 Voucher</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Recent Rewards */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-primary" />
                  Available Rewards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {availableRewards.map((reward) => (
                    <div key={reward.id} className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-sm">{reward.title}</div>
                        <div className="text-xs text-muted-foreground">{reward.pointsCost} points</div>
                      </div>
                      <Button 
                        size="sm" 
                        variant={currentCitizen.totalPoints >= reward.pointsCost ? "default" : "outline"}
                        disabled={currentCitizen.totalPoints < reward.pointsCost}
                      >
                        {currentCitizen.totalPoints >= reward.pointsCost ? "Claim" : "Need more"}
                      </Button>
                    </div>
                  ))}
                </div>
                <Link to="/citizen/rewards">
                  <Button variant="outline" className="w-full mt-4">
                    View All Rewards
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* My Recent Reports */}
          <Card>
            <CardHeader>
              <CardTitle>My Recent Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {myReports.map((report) => (
                  <div key={report.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">Report #{report.id}</div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {report.location}
                          </div>
                          <div>{report.description}</div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-warning" />
                            +{report.points} points • {report.submittedAt}
                          </div>
                        </div>
                      </div>
                      <Badge variant={
                        report.status === 'reported' ? 'default' :
                        report.status === 'assigned' ? 'secondary' : 'outline'
                      }>
                        {report.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CitizenDashboard;