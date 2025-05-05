import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ThemeToggle: React.FC = () => {
  // Get initial theme from localStorage or default to system preference
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      // Try to get saved preference from localStorage
      const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
      
      // Return saved theme if it exists
      if (savedTheme) {
        return savedTheme;
      }
      
      // Otherwise check system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    
    // Default to dark theme
    return 'dark';
  });

  // Apply theme whenever it changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove old theme class
    root.classList.remove('light', 'dark');
    
    // Add new theme class
    root.classList.add(theme);
    
    // Save preference to localStorage for persistence
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="text-muted-foreground hover:text-foreground"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </Button>
  );
};

export default ThemeToggle;