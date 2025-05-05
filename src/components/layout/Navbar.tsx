
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface NavbarProps {
  onToggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  return (
    <header className="h-16 flex items-center justify-between px-4 border-b border-white/5 bg-assistant-dark">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleSidebar}
          className="mr-2 text-muted-foreground hover:text-white"
        >
          <span className="sr-only">Toggle sidebar</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 8H21M3 16H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
        <h1 className="text-xl font-semibold ai-gradient">Zenith</h1>
        <span className="ml-2 text-xs text-muted-foreground">v1.0</span>
      </div>
      
      <div className="flex items-center space-x-2">
        {user && (
          <div className="flex items-center mr-4">
            <div className="bg-primary/20 p-1 rounded-full mr-2">
              <User size={16} className="text-primary" />
            </div>
            <span className="text-sm text-foreground hidden md:inline-block">
              {user.name}
            </span>
          </div>
        )}
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
          <Settings size={20} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-white"
          onClick={handleLogout}
        >
          <LogOut size={20} />
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
