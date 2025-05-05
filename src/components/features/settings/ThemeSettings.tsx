
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface ThemeSettingsProps {
  theme: 'dark' | 'light' | 'high-contrast';
  onThemeChange: (theme: 'dark' | 'light' | 'high-contrast') => void;
}

const ThemeSettings: React.FC<ThemeSettingsProps> = ({ theme, onThemeChange }) => {
  const handleThemeChange = (value: 'dark' | 'light' | 'high-contrast') => {
    onThemeChange(value);
    toast.success(`Theme changed to ${value} mode`);
  };

  return (
    <div className="space-y-6 pt-4">
      <div className="space-y-3">
        <Label>Theme</Label>
        <div className="grid grid-cols-3 gap-2">
          <Button 
            variant="outline" 
            className={`border-white/10 h-20 flex flex-col items-center justify-center gap-2 ${theme === 'dark' ? 'bg-assistant-surface ring-1 ring-assistant-glow' : ''}`}
            onClick={() => handleThemeChange('dark')}
          >
            <Moon size={16} />
            <span className="text-xs">Dark</span>
          </Button>
          <Button 
            variant="outline" 
            className={`border-white/10 h-20 flex flex-col items-center justify-center gap-2 ${theme === 'light' ? 'bg-assistant-surface ring-1 ring-assistant-glow' : ''}`}
            onClick={() => handleThemeChange('light')}
          >
            <Sun size={16} />
            <span className="text-xs">Light</span>
          </Button>
          <Button 
            variant="outline" 
            className={`border-white/10 h-20 flex flex-col items-center justify-center gap-2 ${theme === 'high-contrast' ? 'bg-assistant-surface ring-1 ring-assistant-glow' : ''}`}
            onClick={() => handleThemeChange('high-contrast')}
          >
            <div className="flex">
              <Moon size={16} className="text-white" />
              <Sun size={16} className="text-black" />
            </div>
            <span className="text-xs">High Contrast</span>
          </Button>
        </div>
      </div>
      
      <div className="space-y-3">
        <Label>Animation Speed</Label>
        <Select defaultValue="normal">
          <SelectTrigger className="border-white/10 bg-assistant-surface">
            <SelectValue placeholder="Select animation speed" />
          </SelectTrigger>
          <SelectContent className="bg-assistant-surface border-white/10">
            <SelectItem value="slow">Slow</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="fast">Fast</SelectItem>
            <SelectItem value="off">Disabled</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ThemeSettings;
