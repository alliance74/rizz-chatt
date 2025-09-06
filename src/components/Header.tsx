import { Button } from "@/components/ui/button-variants";
import { MessageSquare, Crown, User, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useState } from "react";

interface HeaderProps {
  onSignIn: () => void;
  onGetStarted: () => void;
}

export const Header = ({ onSignIn, onGetStarted }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/20 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              RizzChat
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/#features" className="text-muted-foreground hover:text-foreground transition-smooth">
              Features
            </a>
            <a href="/pricing" className="text-muted-foreground hover:text-foreground transition-smooth">
              Pricing
            </a>
            <a href="/referrals" className="text-muted-foreground hover:text-foreground transition-smooth">
              Referrals
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={onSignIn}>
              Sign In
            </Button>
            <Button variant="hero" size="sm" onClick={onGetStarted}>
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden animate-slide-up">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card/95 rounded-lg mt-2 border border-border/20">
              <a
                href="/#features"
                className="block px-3 py-2 text-base text-muted-foreground hover:text-foreground transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="/pricing"
                className="block px-3 py-2 text-base text-muted-foreground hover:text-foreground transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </a>
              <a
                href="/referrals"
                className="block px-3 py-2 text-base text-muted-foreground hover:text-foreground transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                Referrals
              </a>
              <div className="flex flex-col space-y-2 px-3 py-2">
                <div className="flex justify-center py-2">
                  <ThemeToggle />
                </div>
                <Button variant="ghost" size="sm" className="w-full" onClick={onSignIn}>
                  Sign In
                </Button>
                <Button variant="hero" size="sm" className="w-full" onClick={onGetStarted}>
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};