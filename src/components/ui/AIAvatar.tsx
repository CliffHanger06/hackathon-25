
import React from 'react';
import { cn } from '@/lib/utils';

interface AIAvatarProps {
  isActive?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const AIAvatar: React.FC<AIAvatarProps> = ({ 
  isActive = false,
  size = 'md'
}) => {
  const sizes = {
    sm: 'h-16 w-16',
    md: 'h-24 w-24',
    lg: 'h-32 w-32'
  };
  
  return (
    <div className={cn(
      "relative rounded-full flex items-center justify-center",
      sizes[size]
    )}>
      {/* Background glow effect */}
      <div className={cn(
        "absolute inset-0 rounded-full bg-glow-assistant opacity-40",
        isActive && "animate-pulse"
      )} />
      
      {/* Inner circles */}
      <div className={cn(
        "absolute inset-[15%] rounded-full bg-assistant-dark ring-1 ring-white/10",
        isActive && "animate-float"
      )} />
      
      {/* Center animation */}
      <div className={cn(
        "absolute inset-[35%] rounded-full bg-gradient-to-r from-assistant-blue to-assistant-violet",
        isActive && "animate-breathe"
      )}>
        {/* Voice wave animation */}
        {isActive && (
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i} 
                className="wave-bar h-[10px]" 
                style={{ ['--i' as any]: i }} 
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Orbiting effect */}
      <div className="absolute inset-0 rounded-full animate-rotate-slow opacity-40 pointer-events-none">
        <div className="absolute top-[5%] left-[50%] transform -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-assistant-blue" />
        <div className="absolute top-[50%] right-[5%] transform -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-assistant-violet" />
        <div className="absolute bottom-[5%] left-[50%] transform -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-assistant-teal" />
      </div>
    </div>
  );
};

export default AIAvatar;
