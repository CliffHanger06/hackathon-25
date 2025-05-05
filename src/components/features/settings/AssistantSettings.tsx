
import React from 'react';
import { Volume2, Calendar } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

interface AssistantSettingsProps {
  assistantSettings: {
    voiceEnabled: boolean;
    personality: string;
    autoCleanup: string;
  };
  setAssistantSettings: React.Dispatch<React.SetStateAction<{
    voiceEnabled: boolean;
    personality: string;
    autoCleanup: string;
  }>>;
}

const AssistantSettings: React.FC<AssistantSettingsProps> = ({ 
  assistantSettings, 
  setAssistantSettings 
}) => {
  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Voice Assistant</Label>
          <div className="text-xs text-muted-foreground">
            Enable or disable voice commands and responses
          </div>
        </div>
        <Switch 
          checked={assistantSettings.voiceEnabled} 
          onCheckedChange={(checked) => {
            setAssistantSettings({
              ...assistantSettings,
              voiceEnabled: checked
            });
            toast.success(`Voice assistant ${checked ? 'enabled' : 'disabled'}`);
          }}
        />
      </div>
      
      <Separator className="bg-white/5" />
      
      <div className="space-y-3">
        <Label>Assistant Personality</Label>
        <Select 
          value={assistantSettings.personality}
          onValueChange={(value) => {
            setAssistantSettings({
              ...assistantSettings,
              personality: value
            });
            toast.success(`Assistant personality set to ${value}`);
          }}
        >
          <SelectTrigger className="border-white/10 bg-assistant-surface">
            <SelectValue placeholder="Select personality" />
          </SelectTrigger>
          <SelectContent className="bg-assistant-surface border-white/10">
            <SelectItem value="friendly">Friendly</SelectItem>
            <SelectItem value="professional">Professional</SelectItem>
            <SelectItem value="technical">Technical</SelectItem>
            <SelectItem value="minimal">Minimal</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-3">
        <Label>Auto Cleanup Schedule</Label>
        <Select 
          value={assistantSettings.autoCleanup}
          onValueChange={(value) => {
            setAssistantSettings({
              ...assistantSettings,
              autoCleanup: value
            });
            toast.success(`Auto cleanup schedule set to ${value}`);
          }}
        >
          <SelectTrigger className="border-white/10 bg-assistant-surface">
            <SelectValue placeholder="Select schedule" />
          </SelectTrigger>
          <SelectContent className="bg-assistant-surface border-white/10">
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="never">Never</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default AssistantSettings;
