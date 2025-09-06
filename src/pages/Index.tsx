import { useState } from "react";
import { Header } from "@/components/Header";
import { LandingPage } from "@/components/LandingPage";
import { ChatInterface } from "@/components/ChatInterface";
import { AuthModal } from "@/components/AuthModal";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [currentView, setCurrentView] = useState<"landing" | "chat">("landing");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      setCurrentView("chat");
    } else {
      setAuthModalTab("register");
      setIsAuthModalOpen(true);
    }
  };

  const handleSignIn = () => {
    setAuthModalTab("login");
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    setCurrentView("chat");
  };

  return (
    <div className="min-h-screen">
      <Header onSignIn={handleSignIn} onGetStarted={handleGetStarted} />
      
      {currentView === "landing" ? (
        <LandingPage onGetStarted={handleGetStarted} />
      ) : (
        <ChatInterface />
      )}

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalTab}
      />
      
      {currentView === "landing" && <Footer />}
    </div>
  );
};

export default Index;