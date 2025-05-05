
import React from 'react';
import { Bell, Mail } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

interface NotificationSettingsProps {
  notificationSettings: {
    desktop: boolean;
    email: boolean;
    assistantOnly: boolean;
  };
  toggleNotificationSetting: (key: keyof {
    desktop: boolean;
    email: boolean;
    assistantOnly: boolean;
  }) => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ 
  notificationSettings, 
  toggleNotificationSetting 
}) => {
  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Desktop Notifications</Label>
          <div className="text-xs text-muted-foreground">
            Receive system notifications on your desktop
          </div>
        </div>
        <Switch 
          checked={notificationSettings.desktop} 
          onCheckedChange={() => toggleNotificationSetting('desktop')}
        />
      </div>
      
      <Separator className="bg-white/5" />
      
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Email Notifications</Label>
          <div className="text-xs text-muted-foreground">
            Receive weekly summary and important alerts via email
          </div>
        </div>
        <Switch 
          checked={notificationSettings.email} 
          onCheckedChange={() => toggleNotificationSetting('email')}
        />
      </div>
      
      <Separator className="bg-white/5" />
      
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Assistant-Only Notifications</Label>
          <div className="text-xs text-muted-foreground">
            Only show notifications within the assistant interface
          </div>
        </div>
        <Switch 
          checked={notificationSettings.assistantOnly} 
          onCheckedChange={() => toggleNotificationSetting('assistantOnly')}
        />
      </div>
    </div>
  );
};

export default NotificationSettings;
