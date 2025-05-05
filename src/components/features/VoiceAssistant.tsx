
import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Undo, 
  Keyboard,
  Pause,
  CornerDownLeft,
  Trash,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import AIAvatar from '@/components/ui/AIAvatar';

const VoiceAssistant: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [processingCommand, setProcessingCommand] = useState(false);
  const [waveformLevels, setWaveformLevels] = useState<number[]>(Array(15).fill(5));
  const [processingProgress, setProcessingProgress] = useState(0);
  
  // Suggestions for voice commands
  const voiceCommandSuggestions = [
    { text: "Clean my desktop", category: "Files" },
    { text: "Group similar tabs", category: "Browser" },
    { text: "Delete old screenshots", category: "Files" },
    { text: "Find duplicate photos", category: "Search" },
    { text: "Set focus mode for 1 hour", category: "Focus" },
  ];
  
  // Recent commands history
  const recentCommands = [
    { text: "Find recent PDF documents", timestamp: "Today, 10:35 AM", success: true },
    { text: "Close unused browser tabs", timestamp: "Today, 09:22 AM", success: true },
    { text: "Create new project folder", timestamp: "Yesterday", success: true },
    { text: "Summarize my open tabs", timestamp: "Yesterday", success: false },
  ];
  
  // Simulate waveform animation when listening
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isListening) {
      interval = setInterval(() => {
        setWaveformLevels(Array(15).fill(0).map(() => Math.floor(Math.random() * 20) + 3));
      }, 150);
    } else {
      setWaveformLevels(Array(15).fill(5));
    }
    
    return () => clearInterval(interval);
  }, [isListening]);
  
  // Simulate command processing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (processingCommand) {
      let progress = 0;
      interval = setInterval(() => {
        progress += 5;
        setProcessingProgress(progress);
        
        if (progress >= 100) {
          clearInterval(interval);
          setProcessingCommand(false);
          setProcessingProgress(0);
          toast.success("Command executed successfully!");
        }
      }, 100);
    }
    
    return () => clearInterval(interval);
  }, [processingCommand]);
  
  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate receiving transcript after a delay
      setTimeout(() => {
        const suggestedCommand = voiceCommandSuggestions[Math.floor(Math.random() * voiceCommandSuggestions.length)];
        setTranscript(suggestedCommand.text);
      }, 2000);
    } else {
      setTranscript('');
    }
  };
  
  const executeCommand = () => {
    if (!transcript) return;
    
    setProcessingCommand(true);
    setIsListening(false);
  };
  
  const useSuggestion = (suggestion: string) => {
    setTranscript(suggestion);
  };
  
  return (
    <Card className="glass-panel shadow-xl assistant-shadow w-full relative overflow-hidden">
      {/* Animated background effect */}
      <div className="absolute -z-10 inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-assistant-glow/30 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-assistant-blue/30 rounded-full blur-[60px]" />
      </div>
      
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <Volume2 size={20} className="text-assistant-glow" />
          Voice Assistant
          {isListening && (
            <Badge className="ml-2 bg-assistant-glow text-white animate-pulse">
              Listening
            </Badge>
          )}
        </CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1 border-white/10 text-xs">
            <Keyboard size={14} />
            <span>Keyboard</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1 border-white/10 text-xs">
            <Sparkles size={14} />
            <span>Suggestions</span>
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col items-center justify-center space-y-6 py-4">
          {/* AI Avatar */}
          <div className="relative">
            <AIAvatar isActive={isListening} size="lg" />
            
            {/* Sound waveform visualization */}
            {isListening && (
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex items-end justify-center gap-[2px] h-6 w-48">
                {waveformLevels.map((level, index) => (
                  <div 
                    key={index}
                    className="w-1 bg-assistant-glow/80 rounded-full transition-all duration-150"
                    style={{ height: `${level}px` }}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Status & Transcript */}
          <div className="text-center space-y-2 w-full max-w-md">
            <div className="text-sm font-medium text-muted-foreground">
              {isListening 
                ? "Listening..." 
                : processingCommand 
                  ? "Processing command..." 
                  : "Press the microphone to speak"}
            </div>
            
            {processingCommand && (
              <div className="w-full bg-assistant-surface/30 rounded-full h-2 mt-3">
                <Progress value={processingProgress} className="h-2" />
              </div>
            )}
            
            {transcript && !processingCommand && (
              <div className="relative max-w-md mx-auto mt-4">
                <div className="bg-assistant-dark p-3 rounded-lg text-sm animate-fade-in flex items-center justify-between">
                  <p className="flex-1">"{transcript}"</p>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8 text-assistant-glow hover:bg-assistant-surface/80"
                    onClick={executeCommand}
                  >
                    <CornerDownLeft size={16} />
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Voice Command Suggestions */}
          {!isListening && !processingCommand && !transcript && (
            <div className="w-full max-w-md">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Try saying:</h3>
              <div className="flex flex-wrap gap-2">
                {voiceCommandSuggestions.map((suggestion, index) => (
                  <div key={index} className="group flex items-center">
                    <Badge 
                      variant="outline" 
                      className="cursor-pointer px-3 py-1.5 hover:bg-assistant-surface transition-colors border-white/10 text-xs"
                      onClick={() => useSuggestion(suggestion.text)}
                    >
                      {suggestion.text}
                    </Badge>
                    <Badge className="ml-1 bg-assistant-dark opacity-80 hover:opacity-100 text-[10px] py-0.5 h-5">
                      {suggestion.category}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Control Buttons */}
          <div className="flex items-center gap-3">
            <Button 
              size="icon" 
              variant="outline"
              className="rounded-full h-10 w-10 border-white/10"
              disabled={!transcript && !processingCommand}
            >
              <Undo size={16} />
            </Button>
            
            <Button 
              className={`rounded-full h-16 w-16 ${
                isListening 
                  ? 'bg-assistant-glow hover:bg-assistant-glow/90' 
                  : 'bg-assistant-surface hover:bg-assistant-surface/80'
              }`}
              onClick={toggleListening}
              disabled={processingCommand}
            >
              {isListening ? (
                <MicOff size={24} />
              ) : (
                <Mic size={24} />
              )}
              {isListening && (
                <span className="absolute inset-0 rounded-full animate-ping bg-assistant-glow/30" />
              )}
            </Button>
            
            <Button 
              size="icon"
              variant="outline" 
              className="rounded-full h-10 w-10 border-white/10"
              disabled={!isListening && !processingCommand}
            >
              <Pause size={16} />
            </Button>
          </div>
          
          {/* Recent Commands */}
          <div className="w-full max-w-md">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted-foreground">Recent Commands</h3>
              <Button variant="ghost" size="sm" className="h-7 text-xs">
                <Trash size={12} className="mr-1" />
                <span>Clear</span>
              </Button>
            </div>
            
            <div className="space-y-2 mt-2">
              {recentCommands.map((command, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-2 rounded-md text-sm bg-assistant-surface/50 hover:bg-assistant-surface/80 cursor-pointer group transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${
                      command.success ? 'bg-assistant-glow/20 text-assistant-glow' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {command.success ? <RefreshCw size={12} /> : <MicOff size={12} />}
                    </div>
                    <div>
                      <span>{command.text}</span>
                      <div className="text-[10px] text-muted-foreground">{command.timestamp}</div>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <CornerDownLeft size={12} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceAssistant;
