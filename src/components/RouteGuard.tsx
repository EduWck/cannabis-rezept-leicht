import { logger } from "@/lib/logger";

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

  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    if (
      !isLoading &&
      user &&
      allowedRoles &&
      allowedRoles.length > 0 &&
      userRole &&
      !allowedRoles.includes(userRole)
    ) {
      logger.warn(
        `Unauthorized access attempt by role ${userRole} to path ${location.pathname}`
      );
      toast({
        title: "Zugriff verweigert",
        description: "Sie haben keine Berechtigung für diese Seite.",
        variant: "destructive",
      });
      setUnauthorized(true);
    }
  }, [isLoading, user, userRole, allowedRoles, location.pathname]);
  
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-cannabis-green-500" />
        <span className="ml-2">Lade...</span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (unauthorized) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default RouteGuard;
