import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Zap, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState<"free" | "premium">("premium");
  const { toast } = useToast();

  const plans = [
    {
      id: "free",
      name: "Free Plan",
      price: "$0",
      period: "/forever",
      description: "Perfect for trying out RizzChat",
      features: [
        "10 AI-generated responses",
        "4 response styles",
        "Basic chat interface",
        "Community support"
      ],
      buttonText: "Get Started Free",
      popular: false
    },
    {
      id: "premium",
      name: "Premium Plan",
      price: "$9.99",
      originalPrice: "$20",
      period: "/month",
      description: "Unlimited rizz for serious charmers",
      features: [
        "Unlimited AI responses",
        "All 4 response styles",
        "Priority chat processing",
        "Screenshot analysis",
        "Chat history & favorites",
        "Premium support",
        "Early access to new features",
        "Referral earnings program"
      ],
      buttonText: "Start Premium",
      popular: true
    }
  ];

  const handleSubscribe = (planId: string) => {
    // Mock payment processing
    toast({
      title: "Payment Processing",
      description: `Redirecting to payment for ${planId} plan...`,
    });
    
    // Simulate redirect to Stripe checkout
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "Payment completed successfully!",
      });
    }, 2000);
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
              Choose Your <span className="gradient-text">Rizz Level</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start free or go premium for unlimited charm. Cancel anytime.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {plans.map((plan) => (
              <Card 
                key={plan.id}
                className={`relative glass hover-lift transition-smooth ${
                  plan.popular ? 'ring-2 ring-primary shadow-glow' : ''
                }`}
              >
                {plan.popular && (
                  <Badge 
                    className="absolute -top-3 left-1/2 transform -translate-x-1/2 gradient-primary text-primary-foreground"
                  >
                    <Crown className="w-4 h-4 mr-1" />
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-foreground">
                    {plan.name}
                  </CardTitle>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold text-primary">
                      {plan.price}
                    </span>
                    {plan.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        {plan.originalPrice}
                      </span>
                    )}
                    <span className="text-muted-foreground">
                      {plan.period}
                    </span>
                  </div>
                  {plan.originalPrice && (
                    <Badge variant="secondary" className="mx-auto mt-2">
                      50% OFF Launch Sale!
                    </Badge>
                  )}
                  <p className="text-muted-foreground mt-2">
                    {plan.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-success flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'gradient-primary text-primary-foreground hover-lift' 
                        : 'variant-outline'
                    }`}
                    onClick={() => handleSubscribe(plan.id)}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-foreground mb-8">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  q: "Can I cancel my subscription anytime?",
                  a: "Yes! You can cancel your subscription at any time. You'll continue to have access to premium features until the end of your billing period."
                },
                {
                  q: "Do you offer refunds?",
                  a: "We offer a 7-day money-back guarantee. If you're not satisfied with RizzChat Premium, contact us for a full refund."
                },
                {
                  q: "What happens to my chat history if I downgrade?",
                  a: "Your chat history is always saved. If you downgrade, you'll still be able to view your previous conversations, but you'll be limited to the free plan's message quota."
                },
                {
                  q: "How does the referral program work?",
                  a: "Premium users earn $2/month for each person they refer who subscribes. Earnings are credited to your account monthly."
                }
              ].map((faq, index) => (
                <Card key={index} className="glass">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground">
                      {faq.q}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Pricing;