
import React, { useState } from 'react';
import { 
  Settings, 
  Sun, 
  Bell, 
  Cloud, 
  Terminal,
  Save
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

import { 
  ThemeSettings, 
  AssistantSettings, 
  NotificationSettings, 
  IntegrationSettings 
} from './settings';

const SettingsPanel: React.FC = () => {
  // Theme settings
  const [theme, setTheme] = useState<'dark' | 'light' | 'high-contrast'>('dark');
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    desktop: true,
    email: false,
    assistantOnly: false,
  });
  
  // Assistant settings
  const [assistantSettings, setAssistantSettings] = useState({
    voiceEnabled: true,
    personality: 'friendly',
    autoCleanup: 'weekly',
  });
  
  // Integration settings
  const [integrations, setIntegrations] = useState({
    googleDrive: true,
    dropbox: false,
    github: true,
    chrome: true,
  });
  
  const toggleNotificationSetting = (key: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key],
    });
    
    toast.success(`${key} notifications ${!notificationSettings[key] ? 'enabled' : 'disabled'}`);
  };
  
  const toggleIntegration = (key: keyof typeof integrations) => {
    setIntegrations({
      ...integrations,
      [key]: !integrations[key],
    });
    
    toast.success(`${key} integration ${!integrations[key] ? 'connected' : 'disconnected'}`);
  };
  
  const handleThemeChange = (value: 'dark' | 'light' | 'high-contrast') => {
    setTheme(value);
    toast.success(`Theme changed to ${value} mode`);
  };
  
  const saveSettings = () => {
    toast.success("Settings saved successfully");
  };
  
  return (
    <Card className="glass-panel shadow-xl assistant-shadow w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <Settings size={20} className="text-assistant-glow" />
          Settings
        </CardTitle>
        <CardDescription>
          Customize your AI assistant and application preferences
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="appearance">
          <TabsList className="grid grid-cols-4 bg-assistant-dark border border-white/10">
            <TabsTrigger value="appearance" className="data-[state=active]:bg-assistant-surface">
              <Sun size={14} className="mr-2" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="assistant" className="data-[state=active]:bg-assistant-surface">
              <Terminal size={14} className="mr-2" />
              Assistant
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-assistant-surface">
              <Bell size={14} className="mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="integrations" className="data-[state=active]:bg-assistant-surface">
              <Cloud size={14} className="mr-2" />
              Integrations
            </TabsTrigger>
          </TabsList>
          
          {/* Appearance Settings */}
          <TabsContent value="appearance">
            <ThemeSettings 
              theme={theme}
              onThemeChange={handleThemeChange}
            />
          </TabsContent>
          
          {/* Assistant Settings */}
          <TabsContent value="assistant">
            <AssistantSettings 
              assistantSettings={assistantSettings}
              setAssistantSettings={setAssistantSettings}
            />
          </TabsContent>
          
          {/* Notification Settings */}
          <TabsContent value="notifications">
            <NotificationSettings 
              notificationSettings={notificationSettings}
              toggleNotificationSetting={toggleNotificationSetting}
            />
          </TabsContent>
          
          {/* Integration Settings */}
          <TabsContent value="integrations">
            <IntegrationSettings 
              integrations={integrations}
              toggleIntegration={toggleIntegration}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="border-t border-white/5 pt-4">
        <Button className="ml-auto" onClick={saveSettings}>
          <Save size={16} className="mr-2" />
          Save Settings
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SettingsPanel;
