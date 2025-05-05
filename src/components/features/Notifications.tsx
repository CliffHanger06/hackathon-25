
import React from 'react';
import { 
  Bell, 
  Clock, 
  AlertTriangle, 
  FileWarning, 
  TabletSmartphone, 
  Lightbulb,
  Check,
  Archive
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

// Fake data for notifications
const notifications = [
  { 
    id: 1, 
    title: 'Storage space running low', 
    description: 'Your system storage is at 85% capacity. Consider cleaning up unused files.',
    icon: <AlertTriangle size={16} className="text-amber-400" />,
    time: '10 minutes ago',
    type: 'warning',
    unread: true,
  },
  { 
    id: 2, 
    title: 'Duplicate files detected', 
    description: '15 duplicate files found in Downloads folder (352 MB).',
    icon: <FileWarning size={16} className="text-assistant-blue" />,
    time: '1 hour ago',
    type: 'suggestion',
    unread: true,
  },
  { 
    id: 3, 
    title: 'Browser tabs sync complete', 
    description: 'Successfully synced 24 tabs across your devices.',
    icon: <TabletSmartphone size={16} className="text-assistant-teal" />,
    time: '2 hours ago',
    type: 'info',
    unread: false,
  },
  { 
    id: 4, 
    title: 'Productivity tip', 
    description: 'Try organizing your files by projects rather than file types.',
    icon: <Lightbulb size={16} className="text-amber-400" />,
    time: '1 day ago',
    type: 'tip',
    unread: false,
  },
  { 
    id: 5, 
    title: 'Weekly cleanup suggestion', 
    description: 'You haven\'t accessed these folders in over 3 weeks.',
    icon: <Clock size={16} className="text-assistant-violet" />,
    time: '2 days ago',
    type: 'suggestion',
    unread: false,
  },
];

const Notifications: React.FC = () => {
  return (
    <Card className="glass-panel shadow-xl assistant-shadow w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <Bell size={20} className="text-assistant-glow" />
          Notifications
          <Badge className="ml-2 bg-assistant-glow text-white h-5">
            {notifications.filter(n => n.unread).length}
          </Badge>
        </CardTitle>
        <Button variant="ghost" size="sm" className="gap-1 text-xs">
          <Archive size={14} />
          <span>Clear All</span>
        </Button>
      </CardHeader>
      
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-2">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`relative p-3 rounded-md ${
                  notification.unread ? 'bg-assistant-surface ring-glow' : 'bg-assistant-surface/30'
                } hover:bg-assistant-surface transition-colors`}
              >
                {notification.unread && (
                  <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-assistant-glow animate-pulse" />
                )}
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 h-8 w-8 bg-assistant-dark rounded-full flex items-center justify-center">
                    {notification.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h4 className="text-sm font-medium">{notification.title}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock size={12} className="mr-1" />
                        <span>{notification.time}</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-green-400">
                          <Check size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-assistant-glow">
                          <Archive size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Notifications;
