
import React, { useState, useEffect } from 'react';
import { Bot, X, Mic, Maximize, Minimize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import AIAvatar from '@/components/ui/AIAvatar';

const FloatingAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [query, setQuery] = useState('');
  
  useEffect(() => {
    // If open and listening, simulate receiving a response
    if (isListening) {
      const timer = setTimeout(() => {
        setIsListening(false);
        toast.success("Voice command captured");
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isListening]);
  
  const toggleAssistant = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsExpanded(false);
    }
  };
  
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  
  const startListening = () => {
    setIsListening(true);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    toast.success(`Command submitted: ${query}`);
    setQuery('');
  };
  
  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button 
                className="rounded-full h-14 w-14 bg-assistant-glow hover:bg-assistant-glow/90 shadow-lg"
                onClick={toggleAssistant}
              >
                <Bot size={24} />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className={`${isExpanded ? 'w-96' : 'w-72'}`}
            >
              <Card className="bg-assistant-dark border border-white/10 shadow-xl overflow-hidden">
                <div className="bg-assistant-glow/10 backdrop-blur-sm p-4 flex items-center justify-between border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <AIAvatar isActive={isListening} size="sm" />
                    <span className="font-medium">Zenith Assistant</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleExpanded}>
                      {isExpanded ? <Minimize size={14} /> : <Maximize size={14} />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleAssistant}>
                      <X size={14} />
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {isListening ? "Listening..." : "How can I help you today?"}
                    </p>
                    
                    <form onSubmit={handleSubmit} className="flex gap-2">
                      <Input
                        placeholder="Type a command..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1 bg-assistant-surface border-white/10"
                      />
                      <Button 
                        type="button" 
                        size="icon" 
                        variant="outline"
                        className="border-white/10"
                        onClick={startListening}
                      >
                        <Mic size={16} className={isListening ? "text-assistant-glow animate-pulse" : ""} />
                      </Button>
                    </form>
                    
                    {isExpanded && (
                      <div className="pt-2 space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">Suggestions:</p>
                        <div className="grid grid-cols-1 gap-1">
                          {["Clean up downloads folder", "Group browser tabs", "Turn on focus mode"].map((suggestion, i) => (
                            <Button 
                              key={i} 
                              variant="ghost" 
                              size="sm" 
                              className="justify-start h-8 text-xs hover:bg-assistant-surface"
                              onClick={() => setQuery(suggestion)}
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default FloatingAssistant;
