import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Copy, Users, DollarSign, Share2, Trophy, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Referrals = () => {
  const { toast } = useToast();
  
  // Mock user data
  const [userData] = useState({
    referralCode: "RIZZ-ALEX-2024",
    referralLink: "https://rizzchat.com/ref/RIZZ-ALEX-2024",
    totalReferrals: 12,
    activeReferrals: 8,
    totalEarnings: 96.00,
    thisMonthEarnings: 24.00,
    pendingEarnings: 16.00
  });

  // Mock referral history
  const [referralHistory] = useState([
    { name: "Sarah M.", joinDate: "2024-01-15", status: "Active", earnings: 18.00 },
    { name: "Mike R.", joinDate: "2024-01-10", status: "Active", earnings: 24.00 },
    { name: "Emma L.", joinDate: "2024-01-08", status: "Cancelled", earnings: 6.00 },
    { name: "John D.", joinDate: "2024-01-05", status: "Active", earnings: 30.00 },
    { name: "Lisa K.", joinDate: "2023-12-28", status: "Active", earnings: 18.00 }
  ]);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard`,
    });
  };

  const shareReferral = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join RizzChat and level up your game!',
        text: 'Get AI-powered rizz lines that actually work. Join with my link for exclusive bonuses!',
        url: userData.referralLink,
      });
    } else {
      copyToClipboard(userData.referralLink, "Referral link");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onSignIn={() => {}} 
        onGetStarted={() => {}}
      />
      
      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              <Gift className="w-10 h-10 inline-block mr-3 text-primary" />
              Referral Program
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Earn <span className="text-primary font-semibold">$2/month</span> for every friend who subscribes to RizzChat Premium. 
              The more you share, the more you earn!
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="glass hover-lift transition-smooth">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Referrals
                </CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{userData.totalReferrals}</div>
                <p className="text-xs text-success">+2 this month</p>
              </CardContent>
            </Card>

            <Card className="glass hover-lift transition-smooth">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Active Referrals
                </CardTitle>
                <Trophy className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{userData.activeReferrals}</div>
                <p className="text-xs text-muted-foreground">Currently subscribed</p>
              </CardContent>
            </Card>

            <Card className="glass hover-lift transition-smooth">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Earnings
                </CardTitle>
                <DollarSign className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">${userData.totalEarnings.toFixed(2)}</div>
                <p className="text-xs text-success">+${userData.thisMonthEarnings.toFixed(2)} this month</p>
              </CardContent>
            </Card>

            <Card className="glass hover-lift transition-smooth">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Pending Payout
                </CardTitle>
                <DollarSign className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">${userData.pendingEarnings.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">Paid monthly</p>
              </CardContent>
            </Card>
          </div>

          {/* Referral Tools */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Share Section */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-primary" />
                  Share Your Link
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Your Referral Code
                  </label>
                  <div className="flex gap-2">
                    <Input 
                      value={userData.referralCode} 
                      readOnly 
                      className="font-mono"
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => copyToClipboard(userData.referralCode, "Referral code")}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Your Referral Link
                  </label>
                  <div className="flex gap-2">
                    <Input 
                      value={userData.referralLink} 
                      readOnly 
                      className="text-sm"
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => copyToClipboard(userData.referralLink, "Referral link")}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <Button 
                  className="w-full gradient-primary text-primary-foreground hover-lift"
                  onClick={shareReferral}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Now
                </Button>
              </CardContent>
            </Card>

            {/* How It Works */}
            <Card className="glass">
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Share Your Link</h4>
                      <p className="text-sm text-muted-foreground">Send your referral link to friends via social media, text, or email</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Friend Subscribes</h4>
                      <p className="text-sm text-muted-foreground">When they sign up and subscribe to Premium, you both win</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Earn Monthly</h4>
                      <p className="text-sm text-muted-foreground">Receive $2 every month while they remain subscribed</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Referral History */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Your Referrals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/20">
                      <th className="text-left py-3 text-sm font-medium text-muted-foreground">Name</th>
                      <th className="text-left py-3 text-sm font-medium text-muted-foreground">Join Date</th>
                      <th className="text-left py-3 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-right py-3 text-sm font-medium text-muted-foreground">Total Earned</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referralHistory.map((referral, index) => (
                      <tr key={index} className="border-b border-border/10">
                        <td className="py-3 text-foreground font-medium">{referral.name}</td>
                        <td className="py-3 text-muted-foreground">{referral.joinDate}</td>
                        <td className="py-3">
                          <Badge 
                            variant={referral.status === "Active" ? "default" : "secondary"}
                            className={referral.status === "Active" ? "bg-success/10 text-success" : ""}
                          >
                            {referral.status}
                          </Badge>
                        </td>
                        <td className="py-3 text-right text-foreground font-medium">
                          ${referral.earnings.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Referrals;