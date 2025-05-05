import React from 'react';
import { 
  Home, 
  Terminal, 
  FolderOpen, 
  Globe, 
  Bell, 
  Volume2, 
  Settings,
  Brain,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const menuItems = [
    { icon: Terminal, label: 'Command Center', sectionId: 'command-center' },
    { icon: FolderOpen, label: 'File Manager', sectionId: 'file-manager' },
    { icon: Globe, label: 'Browser Tabs', sectionId: 'browser-tabs' },
    { icon: Bell, label: 'Notifications', sectionId: 'notifications' },
    { icon: Volume2, label: 'Voice Assistant', sectionId: 'voice-assistant' },
    { icon: Brain, label: 'Smart Routines', sectionId: 'smart-routines' },
    { icon: Settings, label: 'Settings', sectionId: 'settings' },
  ];

  const handleMenuItemClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      console.log(`Navigating to section: ${sectionId}`);
    }
  };

  return (
    <aside 
      className={cn(
        "flex flex-col bg-assistant-dark border-r border-white/5 transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-16"
      )}
    >
      {/* Sidebar Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/5">
        {isOpen && (
          <span className="font-semibold text-lg ai-gradient">Zenith OS</span>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggle} 
          className="ml-auto text-muted-foreground hover:text-white"
        >
          {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </Button>
      </div>
      
      {/* Sidebar Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {menuItems.map((item) => (
          <Button
            key={item.sectionId}
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 hover:bg-assistant-surface",
              !isOpen && "justify-center px-2"
            )}
            onClick={() => handleMenuItemClick(item.sectionId)}
          >
            <item.icon size={18} className="flex-shrink-0" />
            {isOpen && <span>{item.label}</span>}
          </Button>
        ))}
      </nav>
      
      {/* Sidebar Footer */}
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3">
          {isOpen ? (
            <>
              <div className="h-8 w-8 rounded-full bg-assistant-glow/20 flex items-center justify-center">
                <span className="text-xs font-medium">ZA</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Zenith Assistant</span>
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
            </>
          ) : (
            <div className="h-8 w-8 mx-auto rounded-full bg-assistant-glow/20 flex items-center justify-center">
              <span className="text-xs font-medium">ZA</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
