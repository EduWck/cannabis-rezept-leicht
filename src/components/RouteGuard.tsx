
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
  const [authChecked, setAuthChecked] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [redirectCount, setRedirectCount] = useState(0);

  useEffect(() => {
    // Prevent checking auth if we're in the middle of a redirect
    if (isRedirecting) {
      return;
    }

    // Track redirect attempts to prevent infinite loops
    if (redirectCount > 5) {
      console.error("Too many redirect attempts, possible redirect loop detected");
      toast({
        title: "Navigation Error", 
        description: "Too many redirects detected. Please try refreshing the page.", 
        variant: "destructive"
      });
      setAuthChecked(true);
      return;
    }

    const checkAuthorization = () => {
      // If still loading authentication state, wait
      if (isLoading) {
        console.log("RouteGuard: Still loading auth state...");
        return;
      }

      console.log("RouteGuard check - User:", user?.id, "Role:", userRole, "Path:", location.pathname);
      setAuthChecked(true);
      
      // If no user is logged in, redirect to login
      if (!user) {
        console.log("No user detected, redirecting to login");
        setIsRedirecting(true);
        setRedirectCount(prev => prev + 1);
        navigate("/login", { replace: true });
        return;
      }

      // If user exists but no role is detected, wait a bit more and show toast with error if it persists
      if (!userRole) {
        console.log("User exists but role is not detected yet");
        // Give it a little more time before showing an error
        setTimeout(() => {
          if (!userRole && user) {
            console.log("Role still not detected after delay");
            toast({
              title: "Benutzerrolle wird geladen", 
              description: "Ihre Berechtigungen werden noch geladen. Bitte haben Sie einen Moment Geduld.", 
            });
          }
        }, 2000);
        return;
      }

      // Define main routes for each role to avoid loops
      const patientMainRoute = "/dashboard/profile";
      const doctorMainRoute = "/dashboard";
      const adminMainRoute = "/dashboard";

      // If no roles are specified or user's role is in the allowed roles, authorize access
      const noRolesSpecified = !allowedRoles || allowedRoles.length === 0;
      const userHasAllowedRole = allowedRoles?.includes(userRole);
      
      if (noRolesSpecified || userHasAllowedRole) {
        console.log(`User authorized with role: ${userRole}`);
        setIsAuthorized(true);
        
        // Special case: If patient is on main dashboard, redirect to profile
        if (userRole === "patient" && location.pathname === "/dashboard") {
          console.log("Patient detected on dashboard, redirecting to profile");
          setIsRedirecting(true);
          setRedirectCount(prev => prev + 1);
          navigate(patientMainRoute, { replace: true });
        }
        
        return;
      }
      
      // User does not have permission for this route, redirect based on role
      console.log(`User role ${userRole} not authorized for this route`);
      setIsRedirecting(true);
      setRedirectCount(prev => prev + 1);
      
      if (userRole === "patient") {
        console.log("Patient redirected to profile");
        navigate(patientMainRoute, { replace: true });
      } else if (userRole === "doctor") {
        console.log("Doctor redirected to dashboard");
        navigate(doctorMainRoute, { replace: true });
      } else if (userRole === "admin") {
        console.log("Admin redirected to dashboard");
        navigate(adminMainRoute, { replace: true });
      } else {
        // Fallback for unknown roles
        console.log("Unknown role, redirecting to login");
        toast({
          title: "Zugriff verweigert", 
          description: "Ihr Konto hat nicht die erforderlichen Berechtigungen.", 
          variant: "destructive"
        });
        navigate("/login");
      }
    };

    checkAuthorization();
    
    // Reset redirection flag after a short delay if it was set
    if (isRedirecting) {
      const timer = setTimeout(() => {
        setIsRedirecting(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [user, userRole, isLoading, allowedRoles, navigate, location.pathname, isRedirecting, redirectCount]);

  // Show loading state only when authorization check is in progress
  if (isLoading || (user && !userRole) || !authChecked) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-cannabis-green-500" />
        <span className="ml-2">Überprüfe Zugangsberechtigung...</span>
      </div>
    );
  }

  return isAuthorized ? <Outlet /> : null;
};

export default RouteGuard;
