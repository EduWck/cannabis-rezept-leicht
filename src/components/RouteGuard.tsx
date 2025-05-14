
import { useEffect, useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
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
        
        // Special handling for default routes based on role
        if (location.pathname === "/dashboard") {
          if (userRole === "patient") {
            console.log("Patient on dashboard, redirecting to profile");
            navigate("/dashboard/profile", { replace: true });
          } else if (userRole === "doctor") {
            console.log("Doctor on dashboard, showing doctor dashboard");
            // Stay on dashboard, but authorized
          } else if (userRole === "admin") {
            console.log("Admin on dashboard, showing admin dashboard");
            // Stay on dashboard, but authorized
          }
        }
      } else {
        // User doesn't have the required role - redirect to appropriate page based on role
        console.log("User doesn't have required role, redirecting based on role");
        if (userRole === "patient") {
          navigate("/dashboard/profile", { replace: true });
        } else if (userRole === "doctor" || userRole === "admin") {
          navigate("/dashboard", { replace: true });
        } else {
          // If no role is detected, redirect to login with error
          console.log("No role detected, redirecting to login with error");
          toast({
            title: "Zugriff verweigert",
            description: "Ihr Konto hat nicht die erforderlichen Berechtigungen.",
            variant: "destructive"
          });
          navigate("/login", { 
            state: { 
              from: location.pathname,
              error: "Ihr Konto hat nicht die erforderlichen Berechtigungen"
            } 
          });
        }
      }
    };

    checkAuthorization();
  }, [user, userRole, isLoading, allowedRoles, navigate, location.pathname]);

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
