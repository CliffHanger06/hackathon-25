import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import CommandCenter from '@/components/features/CommandCenter';
import FileManager from '@/components/features/FileManager';
import BrowserTabManager from '@/components/features/BrowserTabManager';
import Notifications from '@/components/features/Notifications';
import VoiceAssistant from '@/components/features/VoiceAssistant';
import SettingsPanel from '@/components/features/SettingsPanel';
import SmartRoutineMemory from '@/components/features/SmartRoutineMemory';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Terminal, FolderOpen, Globe, Bell, Volume2, Settings, Brain } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('command');
  
  return (
    <DashboardLayout>
      {/* Main Content */}
      <div className="w-full space-y-4">
        {/* Mobile Navigation Tabs (visible on small screens) */}
        <div className="md:hidden w-full">
          <Tabs defaultValue="command" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-7 w-full bg-assistant-dark">
              <TabsTrigger value="command" className="text-xs p-2">
                <Terminal size={16} className="mb-1" />
                <span className="hidden sm:block">Command</span>
              </TabsTrigger>
              <TabsTrigger value="files" className="text-xs p-2">
                <FolderOpen size={16} className="mb-1" />
                <span className="hidden sm:block">Files</span>
              </TabsTrigger>
              <TabsTrigger value="tabs" className="text-xs p-2">
                <Globe size={16} className="mb-1" />
                <span className="hidden sm:block">Tabs</span>
              </TabsTrigger>
              <TabsTrigger value="voice" className="text-xs p-2">
                <Volume2 size={16} className="mb-1" />
                <span className="hidden sm:block">Voice</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="text-xs p-2">
                <Bell size={16} className="mb-1" />
                <span className="hidden sm:block">Alerts</span>
              </TabsTrigger>
              <TabsTrigger value="routines" className="text-xs p-2">
                <Brain size={16} className="mb-1" />
                <span className="hidden sm:block">Routines</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="text-xs p-2">
                <Settings size={16} className="mb-1" />
                <span className="hidden sm:block">Settings</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="command" className="mt-2">
              <CommandCenter />
            </TabsContent>
            
            <TabsContent value="files" className="mt-2">
              <FileManager />
            </TabsContent>
            
            <TabsContent value="tabs" className="mt-2">
              <BrowserTabManager />
            </TabsContent>
            
            <TabsContent value="voice" className="mt-2">
              <VoiceAssistant />
            </TabsContent>
            
            <TabsContent value="notifications" className="mt-2">
              <Notifications />
            </TabsContent>
            
            <TabsContent value="routines" className="mt-2">
              <SmartRoutineMemory />
            </TabsContent>
            
            <TabsContent value="settings" className="mt-2">
              <SettingsPanel />
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Desktop Layout (hidden on small screens) */}
        <div className="hidden md:block">
          {/* Command Center (Larger component) */}
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <section id="command-center" className="scroll-mt-16">
              <CommandCenter />
            </section>
          </div>
          
          {/* Smart Routine Memory (New Feature) */}
          <div className="animate-fade-in mt-4" style={{ animationDelay: '0.15s' }}>
            <section id="smart-routines" className="scroll-mt-16">
              <SmartRoutineMemory />
            </section>
          </div>
          
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            {/* Main Panels */}
            <div className="space-y-4">
              <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <section id="file-manager" className="scroll-mt-16">
                  <FileManager />
                </section>
              </div>
              
              <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <section id="notifications" className="scroll-mt-16">
                  <Notifications />
                </section>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <section id="browser-tabs" className="scroll-mt-16">
                  <BrowserTabManager />
                </section>
              </div>
              
              <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <section id="voice-assistant" className="scroll-mt-16">
                  <VoiceAssistant />
                </section>
              </div>
            </div>
          </div>
          
          {/* Settings Panel (Full Width) */}
          <div className="mt-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <section id="settings" className="scroll-mt-16">
              <SettingsPanel />
            </section>
          </div>
        </div>
      </div>
      
      {/* Background Glow Effect */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-assistant-glow/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-assistant-blue/5 rounded-full blur-[100px]" />
      </div>
    </DashboardLayout>
  );
};

export default Index;
