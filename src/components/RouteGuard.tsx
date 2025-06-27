
import { useEffect, useState } from "react";
import { useLocation, Outlet, Navigate } from "react-router-dom";
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

  const [authChecked, setAuthChecked] = useState(false);

  // Once the auth state has finished loading mark the check as completed
  useEffect(() => {
    if (!isLoading) {
      setAuthChecked(true);
    }
  }, [isLoading]);
  
  // Show loading state while authentication is checked
  if (!authChecked) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-cannabis-green-500" />
        <span className="ml-2">Lade...</span>
      </div>
    );
  }

  // If no user is present redirect to login page
  if (!user) {
    toast({
      title: "Nicht angemeldet",
      description: "Bitte melden Sie sich an, um fortzufahren.",
    });
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if the current user's role is allowed
  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    toast({
      title: "Keine Berechtigung",
      description: "Sie besitzen nicht die nötigen Rechte für diese Seite.",
      variant: "destructive",
    });
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RouteGuard;
