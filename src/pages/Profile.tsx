import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Crown, CreditCard, Bell, Shield, LogOut, Edit3, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock user data
  const [userProfile, setUserProfile] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "",
    joinDate: "January 2024",
    plan: "Premium",
    nextBilling: "February 15, 2024",
    messagesUsed: 45,
    messagesLimit: 1000
  });

  const [editData, setEditData] = useState({
    name: userProfile.name,
    email: userProfile.email
  });

  const handleSaveProfile = () => {
    setUserProfile({
      ...userProfile,
      ...editData
    });
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancelSubscription = () => {
    toast({
      title: "Subscription Cancelled",
      description: "Your subscription will remain active until the next billing date.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onSignIn={() => {}} 
        onGetStarted={() => {}}
      />
      
      <div className="pt-20 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <div className="mb-8">
            <Card className="glass">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={userProfile.avatar} />
                    <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                      {userProfile.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-4">
                      <div>
                        <h1 className="text-3xl font-bold text-foreground">{userProfile.name}</h1>
                        <p className="text-muted-foreground">{userProfile.email}</p>
                        <p className="text-sm text-muted-foreground">Member since {userProfile.joinDate}</p>
                      </div>
                      <Badge className="gradient-primary text-primary-foreground">
                        <Crown className="w-4 h-4 mr-1" />
                        {userProfile.plan}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 text-sm">
                      <div className="bg-secondary/50 px-4 py-2 rounded-lg">
                        <span className="text-muted-foreground">Messages Used: </span>
                        <span className="font-semibold text-foreground">
                          {userProfile.messagesUsed}/{userProfile.messagesLimit}
                        </span>
                      </div>
                      <div className="bg-secondary/50 px-4 py-2 rounded-lg">
                        <span className="text-muted-foreground">Next Billing: </span>
                        <span className="font-semibold text-foreground">{userProfile.nextBilling}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Tabs */}
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="billing" className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Billing
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Security
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card className="glass">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Personal Information</CardTitle>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                    >
                      {isEditing ? (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </>
                      ) : (
                        <>
                          <Edit3 className="w-4 h-4 mr-2" />
                          Edit
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={isEditing ? editData.name : userProfile.name}
                        onChange={(e) => setEditData({...editData, name: e.target.value})}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        value={isEditing ? editData.email : userProfile.email}
                        onChange={(e) => setEditData({...editData, email: e.target.value})}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                      />
                    </div>
                  </div>
                  
                  {isEditing && (
                    <div className="flex gap-2">
                      <Button onClick={handleSaveProfile} className="gradient-primary">
                        Save Changes
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setEditData({name: userProfile.name, email: userProfile.email});
                          setIsEditing(false);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Billing Tab */}
            <TabsContent value="billing">
              <div className="space-y-6">
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Subscription Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                        <div>
                          <h3 className="font-semibold text-foreground">Premium Plan</h3>
                          <p className="text-muted-foreground">$9.99/month • Next billing: {userProfile.nextBilling}</p>
                        </div>
                        <Badge className="gradient-primary text-primary-foreground">Active</Badge>
                      </div>
                      
                      <div className="flex gap-4">
                        <Button variant="outline">
                          Update Payment Method
                        </Button>
                        <Button variant="destructive" onClick={handleCancelSubscription}>
                          Cancel Subscription
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Billing History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { date: "Jan 15, 2024", amount: "$9.99", status: "Paid" },
                        { date: "Dec 15, 2023", amount: "$9.99", status: "Paid" },
                        { date: "Nov 15, 2023", amount: "$9.99", status: "Paid" }
                      ].map((payment, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg">
                          <span className="text-foreground">{payment.date}</span>
                          <span className="text-foreground">{payment.amount}</span>
                          <Badge variant="secondary" className="bg-success/10 text-success">
                            {payment.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    { title: "Email Notifications", description: "Receive updates about your account and new features" },
                    { title: "Marketing Emails", description: "Get tips and tricks for better conversations" },
                    { title: "Referral Updates", description: "Notifications about your referral earnings" },
                    { title: "Billing Reminders", description: "Reminders about upcoming payments" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-secondary/10 rounded-lg">
                      <div>
                        <h3 className="font-medium text-foreground">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <input type="checkbox" className="rounded" defaultChecked={index < 2} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <div className="space-y-6">
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Password & Security</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Enable Two-Factor Authentication
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Download Account Data
                    </Button>
                  </CardContent>
                </Card>

                <Card className="glass border-destructive/20">
                  <CardHeader>
                    <CardTitle className="text-destructive">Danger Zone</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <Button variant="destructive" className="w-full">
                        <LogOut className="w-4 h-4 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;