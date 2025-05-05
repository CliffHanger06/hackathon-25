
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const PrivateRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // While checking authentication status, we can show a loading indicator
  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-assistant-darkest">
        <div className="animate-pulse text-lg text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the protected route
  return <Outlet />;
};

export default PrivateRoute;
