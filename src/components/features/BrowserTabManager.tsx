
import React, { useState } from 'react';
import { 
  Globe, 
  X, 
  MoreHorizontal, 
  Save, 
  RefreshCw, 
  FolderPlus,
  Youtube,
  Mail,
  FileText,
  Search,
  Pin,
  FilterX,
  Filter,
  EyeOff,
  Lock,
  Grid,
  List,
  Calendar,
  Tag
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

// Fake data for browser tabs
const browserTabs = [
  { 
    id: 1, 
    title: 'GitHub - Building AI Assistant Dashboard', 
    url: 'github.com/dashboard-project', 
    favicon: 'GitHub', 
    icon: <Globe size={14} className="text-gray-400" />, 
    group: 'Development',
    app: 'GitHub',
    topic: 'Work',
    timeOpened: '2 hours ago',
    thumbnail: 'https://placehold.co/100x60/2a2a2a/white?text=GitHub'
  },
  { 
    id: 2, 
    title: 'React Documentation - Hooks API', 
    url: 'react.dev/docs/hooks-intro.html', 
    favicon: 'React', 
    icon: <Globe size={14} className="text-blue-400" />, 
    group: 'Development',
    app: 'React',
    topic: 'Research',
    timeOpened: '1 hour ago',
    thumbnail: 'https://placehold.co/100x60/2a2a2a/white?text=React'
  },
  { 
    id: 3, 
    title: 'YouTube - UI Design Masterclass', 
    url: 'youtube.com/watch?v=design-masterclass', 
    favicon: 'YouTube',
    icon: <Youtube size={14} className="text-red-400" />,
    group: 'Learning',
    app: 'YouTube',
    topic: 'Learning',
    timeOpened: '3 hours ago',
    thumbnail: 'https://placehold.co/100x60/2a2a2a/white?text=YouTube'
  },
  { 
    id: 4, 
    title: 'Google Mail - Project Update', 
    url: 'mail.google.com/inbox', 
    favicon: 'Gmail',
    icon: <Mail size={14} className="text-red-400" />,
    group: 'Communication',
    app: 'Gmail',
    topic: 'Work',
    timeOpened: '30 minutes ago',
    thumbnail: 'https://placehold.co/100x60/2a2a2a/white?text=Gmail'
  },
  { 
    id: 5, 
    title: 'Cloud Documentation - API Reference', 
    url: 'cloud.provider.com/docs', 
    favicon: 'Cloud',
    icon: <FileText size={14} className="text-blue-400" />,
    group: 'Development',
    app: 'Docs',
    topic: 'Research',
    timeOpened: '45 minutes ago',
    thumbnail: 'https://placehold.co/100x60/2a2a2a/white?text=Docs'
  },
  { 
    id: 6, 
    title: 'Stack Overflow - React State Management', 
    url: 'stackoverflow.com/questions/react-state', 
    favicon: 'StackOverflow',
    icon: <Search size={14} className="text-orange-400" />,
    group: 'Development',
    app: 'StackOverflow',
    topic: 'Research',
    timeOpened: '2 hours ago',
    thumbnail: 'https://placehold.co/100x60/2a2a2a/white?text=Stack'
  },
  { 
    id: 7, 
    title: 'Twitter - Latest Tech News', 
    url: 'twitter.com/tech-news', 
    favicon: 'Twitter',
    icon: <Globe size={14} className="text-blue-400" />,
    group: 'Social',
    app: 'Twitter',
    topic: 'Social',
    timeOpened: '15 minutes ago',
    thumbnail: 'https://placehold.co/100x60/2a2a2a/white?text=Twitter'
  },
  { 
    id: 8, 
    title: 'Netflix - Continue Watching', 
    url: 'netflix.com/browse', 
    favicon: 'Netflix',
    icon: <Globe size={14} className="text-red-400" />,
    group: 'Entertainment',
    app: 'Netflix',
    topic: 'Entertainment',
    timeOpened: '4 hours ago',
    thumbnail: 'https://placehold.co/100x60/2a2a2a/white?text=Netflix'
  },
];

const BrowserTabManager: React.FC = () => {
  const [groupBy, setGroupBy] = useState<'app' | 'topic' | 'time'>('app');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [focusMode, setFocusMode] = useState(false);
  const [selectedTabs, setSelectedTabs] = useState<number[]>([]);
  
  // Group tabs based on selected grouping
  const getGroupedTabs = () => {
    const groupKey = groupBy === 'time' ? 'timeOpened' : groupBy;
    
    // Filter tabs if in focus mode (only show work/research)
    const filteredTabs = focusMode 
      ? browserTabs.filter(tab => ['Work', 'Research'].includes(tab.topic))
      : browserTabs;
    
    return filteredTabs.reduce((acc, tab) => {
      const key = tab[groupKey as keyof typeof tab] as string;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(tab);
      return acc;
    }, {} as Record<string, typeof browserTabs>);
  };
  
  const groupedTabs = getGroupedTabs();
  
  const toggleTabSelection = (tabId: number) => {
    if (selectedTabs.includes(tabId)) {
      setSelectedTabs(selectedTabs.filter(id => id !== tabId));
    } else {
      setSelectedTabs([...selectedTabs, tabId]);
    }
  };
  
  const toggleFocusMode = () => {
    setFocusMode(!focusMode);
    if (!focusMode) {
      toast.success("Focus mode enabled. Showing only work and research tabs.");
    } else {
      toast.success("Focus mode disabled. Showing all tabs.");
    }
  };
  
  const createSessionFromSelection = () => {
    if (selectedTabs.length === 0) {
      toast.error("Please select tabs to create a session");
      return;
    }
    
    toast.success(`Session created with ${selectedTabs.length} tabs`);
    setSelectedTabs([]);
  };
  
  const lockGroup = (group: string) => {
    toast.success(`Group "${group}" has been locked`);
  };
  
  return (
    <Card className="glass-panel shadow-xl assistant-shadow w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <Globe size={20} className="text-assistant-glow" />
          Browser Tabs
          {selectedTabs.length > 0 && (
            <Badge className="ml-2 bg-assistant-glow text-white">
              {selectedTabs.length} selected
            </Badge>
          )}
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleFocusMode}
            className={`gap-1 border-white/10 text-xs ${focusMode ? 'bg-assistant-glow text-white hover:bg-assistant-glow/90' : ''}`}
          >
            <EyeOff size={14} />
            <span>Focus Mode</span>
          </Button>
          
          <div className="border border-white/10 rounded-md flex">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`h-8 px-2 ${viewMode === 'list' ? 'bg-assistant-surface' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List size={14} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`h-8 px-2 ${viewMode === 'grid' ? 'bg-assistant-surface' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={14} />
            </Button>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1 border-white/10 text-xs">
                <MoreHorizontal size={14} />
                <span>Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-assistant-surface border-white/10">
              <DropdownMenuItem onClick={createSessionFromSelection}>
                <Save size={14} className="mr-2" />
                <span>Save Selected Tabs</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FolderPlus size={14} className="mr-2" />
                <span>Create Group</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/5" />
              <DropdownMenuItem className="text-destructive">
                <X size={14} className="mr-2" />
                <span>Close All Tabs</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Grouping options */}
        <div className="mb-4">
          <Tabs defaultValue="app" onValueChange={(value) => setGroupBy(value as 'app' | 'topic' | 'time')}>
            <TabsList className="bg-assistant-dark border border-white/10">
              <TabsTrigger value="app" className="data-[state=active]:bg-assistant-surface">
                <Tag size={14} className="mr-2" />
                Group by App
              </TabsTrigger>
              <TabsTrigger value="topic" className="data-[state=active]:bg-assistant-surface">
                <Filter size={14} className="mr-2" />
                Group by Topic
              </TabsTrigger>
              <TabsTrigger value="time" className="data-[state=active]:bg-assistant-surface">
                <Calendar size={14} className="mr-2" />
                Group by Time
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <ScrollArea className="h-[350px] pr-4">
          <div className="space-y-4">
            {Object.entries(groupedTabs).map(([group, tabs]) => (
              <div key={group} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground flex items-center">
                    <span>{group}</span>
                    <Badge className="ml-2 bg-assistant-dark text-xs h-5">
                      {tabs.length} {tabs.length === 1 ? 'tab' : 'tabs'}
                    </Badge>
                  </h3>
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6"
                      onClick={() => lockGroup(group)}
                    >
                      <Lock size={12} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <MoreHorizontal size={12} />
                    </Button>
                  </div>
                </div>
                
                {viewMode === 'list' ? (
                  <div className="space-y-2">
                    {tabs.map((tab) => (
                      <div 
                        key={tab.id} 
                        className={`rounded-md p-3 flex items-center justify-between group hover:bg-assistant-surface/80 transition-colors cursor-pointer ${
                          selectedTabs.includes(tab.id) 
                            ? 'bg-assistant-glow/10 border border-assistant-glow/30' 
                            : 'bg-assistant-surface'
                        }`}
                        onClick={() => toggleTabSelection(tab.id)}
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="flex-shrink-0 h-6 w-6 bg-assistant-dark rounded flex items-center justify-center">
                            {tab.icon}
                          </div>
                          <div className="overflow-hidden">
                            <div className="text-sm font-medium truncate">{tab.title}</div>
                            <div className="text-xs text-muted-foreground truncate">{tab.url}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Pin size={14} />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive">
                            <X size={14} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {tabs.map((tab) => (
                      <div 
                        key={tab.id} 
                        className={`rounded-md p-2 flex flex-col hover:bg-assistant-surface/80 transition-colors cursor-pointer ${
                          selectedTabs.includes(tab.id) 
                            ? 'bg-assistant-glow/10 border border-assistant-glow/30' 
                            : 'bg-assistant-surface'
                        }`}
                        onClick={() => toggleTabSelection(tab.id)}
                      >
                        <div className="relative h-16 w-full bg-assistant-dark/50 rounded mb-2 overflow-hidden">
                          <img 
                            src={tab.thumbnail} 
                            alt={tab.title} 
                            className="w-full h-full object-cover opacity-70"
                          />
                          <div className="absolute top-1 left-1">
                            <div className="h-5 w-5 bg-assistant-dark/80 rounded flex items-center justify-center">
                              {tab.icon}
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium truncate">{tab.title}</div>
                          <div className="text-[10px] text-muted-foreground truncate">{tab.url}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default BrowserTabManager;
