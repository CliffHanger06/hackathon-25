
import React, { useState } from 'react';
import { Mic, Send, Command, Plus, History } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import AIAvatar from '@/components/ui/AIAvatar';

const CommandCenter: React.FC = () => {
  const [command, setCommand] = useState('');
  const [isListening, setIsListening] = useState(false);
  
  const handleSendCommand = () => {
    console.log('Sending command:', command);
    // In a real implementation, this would process the command
    setCommand('');
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendCommand();
    }
  };
  
  const toggleListening = () => {
    setIsListening(!isListening);
  };
  
  const suggestedCommands = [
    { text: "Organize downloads folder", category: "Files" },
    { text: "Close inactive browser tabs", category: "Browser" },
    { text: "Create new project folder", category: "Files" },
    { text: "Find recent PDF documents", category: "Search" },
    { text: "Summarize open tabs", category: "AI" },
  ];

  return (
    <Card className="glass-panel shadow-2xl assistant-shadow w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <Command size={20} className="text-assistant-glow" />
          Command Center
        </CardTitle>
        <CardDescription>
          Ask me anything or give me commands to manage your digital workspace
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* AI Assistant Avatar */}
        <div className="flex justify-center py-4">
          <AIAvatar isActive={isListening} />
        </div>
        
        {/* Command Input Area */}
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Input
              placeholder="Type a command or ask a question..."
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pr-10 border-white/10 bg-assistant-surface focus:ring-1 focus:ring-assistant-glow"
            />
            {command && (
              <Button 
                size="icon" 
                variant="ghost" 
                className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-white"
                onClick={handleSendCommand}
              >
                <Send size={16} />
              </Button>
            )}
          </div>
          <Button 
            size="icon" 
            className={`${isListening ? 'bg-assistant-glow hover:bg-assistant-glow/90' : 'bg-assistant-surface'} rounded-full h-10 w-10 transition-all`}
            onClick={toggleListening}
          >
            <Mic size={16} className={isListening ? 'animate-pulse' : ''} />
            {isListening && (
              <span className="absolute inset-0 rounded-full animate-ping bg-assistant-glow/30" />
            )}
          </Button>
        </div>
        
        {/* Suggested Commands */}
        <div className="pt-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Suggested Commands</h3>
            <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
              <History size={12} />
              <span>Command History</span>
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestedCommands.map((cmd, index) => (
              <div key={index} className="group flex items-center">
                <Badge 
                  variant="outline" 
                  className="cursor-pointer px-3 py-1.5 hover:bg-assistant-surface transition-colors border-white/10 text-xs"
                  onClick={() => setCommand(cmd.text)}
                >
                  {cmd.text}
                </Badge>
                <Badge className="ml-1 bg-assistant-dark opacity-80 hover:opacity-100 text-[10px] py-0.5 h-5">
                  {cmd.category}
                </Badge>
              </div>
            ))}
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-full">
              <Plus size={14} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommandCenter;
