
import { useEffect, useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types";
import { Loader2 } from "lucide-react";

interface RouteGuardProps {
  allowedRoles?: UserRole[];
}

const RouteGuard = ({ allowedRoles }: RouteGuardProps) => {
  const { user, userRole, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuthorization = async () => {
      if (isLoading) return;

      if (!user) {
        // Not logged in - redirect to login
        console.log("User not logged in, redirecting to login from:", location.pathname);
        navigate("/login", { state: { from: location.pathname } });
        return;
      }

      console.log("Checking authorization for user role:", userRole);
      
      if (!allowedRoles || allowedRoles.length === 0 || (userRole && allowedRoles.includes(userRole))) {
        setIsAuthorized(true);
        
        // Special handling for patient redirection
        if (userRole === "patient" && location.pathname === "/dashboard") {
          console.log("Patient on dashboard, redirecting to profile");
          navigate("/dashboard/profile");
        }
      } else {
        // User doesn't have the required role - redirect to dashboard
        console.log("User doesn't have required role, redirecting to dashboard");
        navigate("/dashboard");
      }
    };

    checkAuthorization();
  }, [user, userRole, isLoading, allowedRoles, navigate, location]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-cannabis-green-500" />
      </div>
    );
  }

  return isAuthorized ? <Outlet /> : null;
};

export default RouteGuard;
