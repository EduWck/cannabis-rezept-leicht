
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

  useEffect(() => {
    // If we're already in a redirection process, don't check again
    if (isRedirecting) {
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
        navigate("/login", { state: { from: location.pathname } });
        return;
      }

      // If user exists but no role is detected, show toast with error
      if (!userRole) {
        console.log("User exists but role is not detected");
        toast({
          title: "Benutzerrolle nicht erkannt", 
          description: "Es wurden keine Berechtigungen erkannt. Bitte melden Sie sich ab und wieder an.", 
          variant: "destructive"
        });
        // Don't redirect yet, let the user see the error
        setIsAuthorized(false);
        return;
      }

      // Key routes for each role
      const patientMainRoute = "/dashboard/profile";
      const doctorMainRoute = "/dashboard";
      const adminMainRoute = "/dashboard";

      // If already on the correct main route for role, don't redirect (prevents loops)
      if (
        (userRole === "patient" && location.pathname === patientMainRoute) ||
        (userRole === "doctor" && location.pathname === doctorMainRoute) ||
        (userRole === "admin" && location.pathname === adminMainRoute)
      ) {
        console.log(`User already on correct main route for role ${userRole}: ${location.pathname}`);
        setIsAuthorized(true);
        return;
      }
      
      // Patient redirection - If user is a patient and on main dashboard, redirect to profile
      if (userRole === "patient" && location.pathname === "/dashboard") {
        console.log("Patient detected on dashboard, redirecting to profile");
        setIsRedirecting(true);
        navigate(patientMainRoute, { replace: true });
        return;
      }
      
      // Check if user has permission for this route
      if (!allowedRoles || allowedRoles.length === 0 || allowedRoles.includes(userRole)) {
        console.log(`User authorized with role: ${userRole}`);
        setIsAuthorized(true);
      } else {
        console.log(`User role ${userRole} not authorized for this route`);
        
        // Redirect based on role, but avoid redirection loops
        setIsRedirecting(true);
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
      }
    };

    checkAuthorization();
    
    // Reset redirection flag after a short delay
    if (isRedirecting) {
      const timer = setTimeout(() => {
        setIsRedirecting(false);
      }, 500); // Wait 500ms before allowing new redirects
      return () => clearTimeout(timer);
    }
  }, [user, userRole, isLoading, allowedRoles, navigate, location.pathname, isRedirecting]);

  // Show loading state only when authorization check is in progress
  if (isLoading || !authChecked) {
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
