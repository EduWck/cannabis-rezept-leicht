
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
  const [redirectedOnce, setRedirectedOnce] = useState(false);

  useEffect(() => {
    // Prevent repeated authorization checks if we already redirected once
    if (redirectedOnce) return;

    const checkAuthorization = () => {
      // If still loading authentication state, wait
      if (isLoading) {
        console.log("RouteGuard: Still loading auth state...");
        return;
      }

      console.log("RouteGuard check - User:", user?.id, "Role:", userRole, "Path:", location.pathname);
      
      // If no user is logged in, redirect to login
      if (!user) {
        console.log("No user detected, redirecting to login");
        setRedirectedOnce(true);
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

      // Patient redirection - If user is a patient, always redirect to profile page when on main dashboard
      if (userRole === "patient" && location.pathname === "/dashboard") {
        console.log("Patient detected on dashboard, redirecting to profile");
        setRedirectedOnce(true);
        navigate("/dashboard/profile", { replace: true });
        return;
      }
      
      // Check if user has permission for this route
      if (!allowedRoles || allowedRoles.length === 0 || allowedRoles.includes(userRole)) {
        console.log(`User authorized with role: ${userRole}`);
        setIsAuthorized(true);
      } else {
        console.log(`User role ${userRole} not authorized for this route`);
        setRedirectedOnce(true);
        
        // Redirect based on role
        if (userRole === "patient") {
          console.log("Patient redirected to profile");
          navigate("/dashboard/profile", { replace: true });
        } else if (userRole === "doctor") {
          console.log("Doctor redirected to dashboard");
          navigate("/dashboard", { replace: true });
        } else if (userRole === "admin") {
          console.log("Admin redirected to dashboard");
          navigate("/dashboard", { replace: true });
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
  }, [user, userRole, isLoading, allowedRoles, navigate, location.pathname, redirectedOnce]);

  // Reset redirectedOnce when location changes significantly
  useEffect(() => {
    const pathname = location.pathname;
    return () => {
      // Only reset if navigating to a completely different section
      if (!pathname.includes(location.pathname.split('/')[1])) {
        setRedirectedOnce(false);
      }
    };
  }, [location.pathname]);

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
