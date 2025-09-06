import { useState } from "react";
import { Header } from "@/components/Header";
import { ChatInterface } from "@/components/ChatInterface";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Crown, TrendingUp, Clock } from "lucide-react";

const Dashboard = () => {
  // Mock user data
  const [user] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    plan: "Premium",
    messagesUsed: 45,
    messagesLimit: 1000,
    referrals: 12,
    earnings: 24.00
  });

  const mockStats = [
    { label: "Messages Used", value: `${user.messagesUsed}/${user.messagesLimit}`, icon: MessageSquare, color: "text-primary" },
    { label: "Success Rate", value: "94%", icon: TrendingUp, color: "text-success" },
    { label: "Referrals", value: user.referrals.toString(), icon: Crown, color: "text-warning" },
    { label: "This Month", value: "$" + user.earnings.toFixed(2), icon: Clock, color: "text-accent" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onSignIn={() => {}} 
        onGetStarted={() => {}}
      />
      
      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Welcome back, {user.name}! 👋
                </h1>
                <p className="text-muted-foreground mt-2">
                  Ready to level up your chat game?
                </p>
              </div>
              <Badge variant="secondary" className="gradient-primary text-primary-foreground">
                <Crown className="w-4 h-4 mr-1" />
                {user.plan} Plan
              </Badge>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {mockStats.map((stat, index) => (
              <Card key={index} className="glass hover-lift transition-smooth">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Chat Interface */}
          <div className="mb-8">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  Generate Rizz Lines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChatInterface />
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass hover-lift transition-smooth">
              <CardHeader>
                <CardTitle className="text-lg">Upgrade Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Get unlimited messages and premium features
                </p>
                <Button className="w-full gradient-primary" onClick={() => window.location.href = '/pricing'}>
                  View Plans
                </Button>
              </CardContent>
            </Card>

            <Card className="glass hover-lift transition-smooth">
              <CardHeader>
                <CardTitle className="text-lg">Invite Friends</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Earn $2/month for each referral
                </p>
                <Button variant="outline" className="w-full" onClick={() => window.location.href = '/referrals'}>
                  Share Link
                </Button>
              </CardContent>
            </Card>

            <Card className="glass hover-lift transition-smooth">
              <CardHeader>
                <CardTitle className="text-lg">My Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Manage your account and settings
                </p>
                <Button variant="outline" className="w-full" onClick={() => window.location.href = '/profile'}>
                  View Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;