
import { useEffect, useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface RouteGuardProps {
  allowedRoles?: UserRole[];
}

const RouteGuard = ({ allowedRoles }: RouteGuardProps) => {
  const { user, userRole, isLoading } = useAuth();
  const location = useLocation();
  
  // Important: For testing purposes only - setting isAuthorized to true by default
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [authChecked, setAuthChecked] = useState(true);
  
  console.log("RouteGuard TESTING MODE: All access granted");
  
  // Show loading state only when authorization check is in progress
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-cannabis-green-500" />
        <span className="ml-2">Lade...</span>
      </div>
    );
  }

  // Always return the outlet for testing purposes
  return <Outlet />;
};

export default RouteGuard;
