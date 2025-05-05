
import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Clock, 
  Sparkles, 
  BarChart3, 
  CheckCircle2, 
  ChevronRight,
  Plus,
  Calendar 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

const SmartRoutineMemory: React.FC = () => {
  const [routines, setRoutines] = useState([
    { 
      id: 1, 
      title: "Close unused tabs", 
      frequency: "Every night at 10 PM", 
      lastDone: "1 day ago",
      acceptance: 80,
      isAutomated: false,
      suggested: true
    },
    { 
      id: 2, 
      title: "Group research tabs", 
      frequency: "When researching similar topics",
      lastDone: "Yesterday", 
      acceptance: 65,
      isAutomated: false,
      suggested: true
    },
    { 
      id: 3, 
      title: "Clean downloads folder", 
      frequency: "Every Friday", 
      lastDone: "5 days ago",
      acceptance: 90,
      isAutomated: true,
      suggested: false
    },
    { 
      id: 4, 
      title: "Backup important files", 
      frequency: "Weekly on Sunday", 
      lastDone: "2 days ago",
      acceptance: 100,
      isAutomated: true,
      suggested: false
    },
  ]);

  const [stats, setStats] = useState({
    suggestionsAccepted: 28,
    automationsCreated: 4,
    timesSaved: 16,
    hoursSaved: 3.5
  });

  const handleAutomateRoutine = (id: number) => {
    setRoutines(routines.map(routine => 
      routine.id === id 
        ? { ...routine, isAutomated: true, suggested: false } 
        : routine
    ));
    
    setStats({
      ...stats,
      automationsCreated: stats.automationsCreated + 1
    });
    
    toast.success("Routine automated successfully!");
  };

  const handleDismissRoutine = (id: number) => {
    // Instead of removing, just mark as not suggested
    setRoutines(routines.map(routine => 
      routine.id === id 
        ? { ...routine, suggested: false } 
        : routine
    ));
    
    toast.info("Suggestion dismissed");
  };

  return (
    <Card className="glass-panel shadow-xl assistant-shadow w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <Brain size={20} className="text-assistant-glow" />
          Smart Routine Memory
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1 border-white/10 text-xs">
            <Calendar size={14} />
            <span>View All Routines</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Smart Insights */}
        <div className="bg-assistant-dark/50 rounded-lg p-4 border border-white/5">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-assistant-violet/20 p-2 text-assistant-violet">
              <Sparkles size={18} />
            </div>
            <div>
              <h3 className="text-sm font-medium">AI Insights</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Based on your activity patterns, Zenith has identified potential routines to automate.
              </p>
            </div>
          </div>
        </div>
        
        {/* Suggested Routines */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <Clock size={14} />
            <span>Suggested Routines</span>
          </h3>
          
          {routines.filter(r => r.suggested).map((routine) => (
            <div key={routine.id} className="bg-assistant-surface/30 rounded-lg p-3 border border-white/5 animate-fade-in">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-assistant-violet/20 text-assistant-violet text-xs">Suggestion</Badge>
                    <h4 className="font-medium">{routine.title}</h4>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {routine.frequency} • Last done {routine.lastDone}
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span>Pattern confidence</span>
                      <span>{routine.acceptance}%</span>
                    </div>
                    <Progress value={routine.acceptance} className="h-1" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="h-8 text-xs border-white/10"
                    onClick={() => handleDismissRoutine(routine.id)}
                  >
                    Dismiss
                  </Button>
                  <Button 
                    size="sm" 
                    className="h-8 text-xs bg-assistant-glow hover:bg-assistant-glow/90"
                    onClick={() => handleAutomateRoutine(routine.id)}
                  >
                    Automate
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Active Automations */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <CheckCircle2 size={14} />
            <span>Active Automations</span>
          </h3>
          
          {routines.filter(r => r.isAutomated).map((routine) => (
            <div key={routine.id} className="bg-assistant-surface/30 rounded-lg p-3 border border-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{routine.title}</h4>
                  <div className="text-xs text-muted-foreground mt-1">
                    {routine.frequency} • Last done {routine.lastDone}
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          ))}
          
          <Button variant="outline" size="sm" className="w-full mt-2 border-dashed border-white/10">
            <Plus size={14} className="mr-1" />
            <span>Add Custom Automation</span>
          </Button>
        </div>
        
        {/* Stats Overview */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-assistant-surface/30 rounded-lg p-3 border border-white/5">
            <div className="text-xs text-muted-foreground">Suggestions Accepted</div>
            <div className="text-2xl font-semibold mt-1">{stats.suggestionsAccepted}</div>
          </div>
          <div className="bg-assistant-surface/30 rounded-lg p-3 border border-white/5">
            <div className="text-xs text-muted-foreground">Automations Created</div>
            <div className="text-2xl font-semibold mt-1">{stats.automationsCreated}</div>
          </div>
          <div className="bg-assistant-surface/30 rounded-lg p-3 border border-white/5">
            <div className="text-xs text-muted-foreground">Times Saved</div>
            <div className="text-2xl font-semibold mt-1">{stats.timesSaved}</div>
          </div>
          <div className="bg-assistant-surface/30 rounded-lg p-3 border border-white/5">
            <div className="text-xs text-muted-foreground">Hours Saved</div>
            <div className="text-2xl font-semibold mt-1">{stats.hoursSaved}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartRoutineMemory;
