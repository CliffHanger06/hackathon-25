
import React from 'react';
import { Cloud, HardDrive, Github, Chrome } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface IntegrationSettingsProps {
  integrations: {
    googleDrive: boolean;
    dropbox: boolean;
    github: boolean;
    chrome: boolean;
  };
  toggleIntegration: (key: keyof {
    googleDrive: boolean;
    dropbox: boolean;
    github: boolean;
    chrome: boolean;
  }) => void;
}

const IntegrationSettings: React.FC<IntegrationSettingsProps> = ({ 
  integrations, 
  toggleIntegration 
}) => {
  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-assistant-surface h-9 w-9 rounded-md flex items-center justify-center">
            <Cloud size={18} className="text-blue-400" />
          </div>
          <div className="space-y-0.5">
            <Label>Google Drive</Label>
            <div className="text-xs text-muted-foreground">
              Access and manage your Google Drive files
            </div>
          </div>
        </div>
        <Switch 
          checked={integrations.googleDrive} 
          onCheckedChange={() => toggleIntegration('googleDrive')}
        />
      </div>
      
      <Separator className="bg-white/5" />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-assistant-surface h-9 w-9 rounded-md flex items-center justify-center">
            <HardDrive size={18} className="text-blue-400" />
          </div>
          <div className="space-y-0.5">
            <Label>Cloud Storage</Label>
            <div className="text-xs text-muted-foreground">
              Access and manage your cloud files
            </div>
          </div>
        </div>
        <Switch 
          checked={integrations.dropbox} 
          onCheckedChange={() => toggleIntegration('dropbox')}
        />
      </div>
      
      <Separator className="bg-white/5" />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-assistant-surface h-9 w-9 rounded-md flex items-center justify-center">
            <Github size={18} />
          </div>
          <div className="space-y-0.5">
            <Label>GitHub</Label>
            <div className="text-xs text-muted-foreground">
              Access and manage your GitHub repositories
            </div>
          </div>
        </div>
        <Switch 
          checked={integrations.github} 
          onCheckedChange={() => toggleIntegration('github')}
        />
      </div>
      
      <Separator className="bg-white/5" />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-assistant-surface h-9 w-9 rounded-md flex items-center justify-center">
            <Chrome size={18} className="text-red-400" />
          </div>
          <div className="space-y-0.5">
            <Label>Chrome</Label>
            <div className="text-xs text-muted-foreground">
              Access and manage your Chrome browser tabs
            </div>
          </div>
        </div>
        <Switch 
          checked={integrations.chrome} 
          onCheckedChange={() => toggleIntegration('chrome')}
        />
      </div>
    </div>
  );
};

export default IntegrationSettings;

