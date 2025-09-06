import { useState } from "react";
import { Button } from "@/components/ui/button-variants";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Send, Image, Sparkles, Copy, RefreshCw, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  style?: string;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("smooth");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const messageStyles = [
    { id: "smooth", name: "Smooth", emoji: "😎" },
    { id: "funny", name: "Funny", emoji: "😂" },
    { id: "flirty", name: "Flirty", emoji: "😘" },
    { id: "confident", name: "Confident", emoji: "💪" }
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response (replace with actual AI integration)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: generateRizzLine(inputMessage, selectedStyle),
        timestamp: new Date(),
        style: selectedStyle
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 2000);

    setInputMessage("");
  };

  const generateRizzLine = (input: string, style: string) => {
    // Mock rizz line generation based on style
    const responses = {
      smooth: "Are you a magician? Because whenever I look at you, everyone else disappears. 🪄✨",
      funny: "If you were a vegetable, you'd be a cute-cumber! 🥒😄",
      flirty: "Do you have a map? I keep getting lost in your eyes... 😍🗺️",
      confident: "I must be a snowflake, because I've fallen for you. ❄️💙"
    };
    return responses[style as keyof typeof responses] || responses.smooth;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Rizz line copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen pt-20 pb-6">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Style Selector Sidebar */}
          <div className="lg:col-span-1">
            <Card className="glass p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Rizz Style
              </h3>
              <div className="space-y-2">
                {messageStyles.map(style => (
                  <Button
                    key={style.id}
                    variant={selectedStyle === style.id ? "hero" : "ghost"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setSelectedStyle(style.id)}
                  >
                    <span className="mr-2">{style.emoji}</span>
                    {style.name}
                  </Button>
                ))}
              </div>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Messages */}
            <Card className="glass min-h-[400px] p-6">
              <div className="space-y-4 mb-6">
                {messages.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                      Ready to level up your game?
                    </h3>
                    <p className="text-muted-foreground">
                      Paste a message or upload a screenshot to get the perfect rizz line!
                    </p>
                  </div>
                ) : (
                  messages.map(message => (
                    <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`${message.type === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'} animate-slide-up`}>
                        <p className="text-sm">{message.content}</p>
                        {message.type === 'ai' && (
                          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/20">
                            <Badge variant="secondary" className="text-xs">
                              {messageStyles.find(s => s.id === message.style)?.name}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-white/70 hover:text-white"
                              onClick={() => copyToClipboard(message.content)}
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="chat-bubble-ai animate-bounce-gentle">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse delay-75"></div>
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse delay-150"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Input Area */}
            <Card className="glass p-4">
              <div className="flex flex-col gap-3">
                <Textarea
                  placeholder="Paste the message you received here..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="min-h-[80px] bg-background/50 border-border/50 resize-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <div className="flex items-center justify-between">
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Image className="w-4 h-4 mr-2" />
                    Upload Screenshot
                  </Button>
                  <Button 
                    variant="hero" 
                    size="sm"
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Generate Rizz
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};