import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import { toast } from 'sonner';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoadingRoutines, setIsLoadingRoutines] = useState(true);
  
  // Simulate loading user routines and patterns on dashboard load
  useEffect(() => {
    const loadUserRoutines = async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoadingRoutines(false);
      
      // Show routines loaded toast
      toast.success("Smart routines loaded", {
        description: "Your activity patterns have been analyzed",
        duration: 3000,
      });
    };
    
    loadUserRoutines();
  }, []);
  
  return (
    <div className="flex h-screen overflow-hidden bg-assistant-darkest">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto scroll-smooth p-4 space-y-4 bg-gradient-assistant">
          {isLoadingRoutines && (
            <div className="w-full bg-assistant-dark/50 rounded-lg p-3 text-sm text-center animate-pulse">
              Loading smart routines and analyzing activity patterns...
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
