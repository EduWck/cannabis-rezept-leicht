
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserRole } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

export function useLoginLogic() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, userRole, isLoading, signIn, requestLoginCode, verifyLoginCode } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [pendingRedirect, setPendingRedirect] = useState(false);
  
  // Set error message from location state if present
  useEffect(() => {
    if (location.state?.error) {
      setErrorMessage(location.state.error);
    }
  }, [location.state]);

  // Check URL for any auth callbacks (handling magic link/token redirects)
  useEffect(() => {
    const handleHashParams = async () => {
      // Check for hash parameters that might indicate a magic link or token
      const hash = window.location.hash;
      if (hash && (hash.includes('access_token') || hash.includes('refresh_token'))) {
        console.log("Hash params detected, possible auth callback:", hash);
        toast({
          title: "Automatische Anmeldung",
          description: "Sie werden angemeldet..."
        });
      }
    };

    handleHashParams();
  }, []);

  // Redirect if already logged in (with debounce to prevent loops)
  useEffect(() => {
    // Avoid redirect check if we're already processing a redirect
    if (pendingRedirect) {
      return;
    }
    
    // Only redirect if auth state is fully loaded and we have a user with a role
    if (!isLoading && user && userRole) {
      console.log("User is logged in, redirecting based on role:", userRole);
      
      // Set flag to prevent multiple redirects
      setPendingRedirect(true);
      
      // Use timeout to ensure state updates complete first
      setTimeout(() => {
        redirectUserBasedOnRole(userRole);
      }, 100);
    }
  }, [user, userRole, isLoading, pendingRedirect]);

  // Helper function to redirect users based on their role
  const redirectUserBasedOnRole = (role: UserRole) => {
    console.log("Redirecting based on role:", role);
    
    // Check if already on the correct page to prevent redirect loops
    const currentPath = location.pathname;
    
    // Define main routes for each role
    const patientMainRoute = "/dashboard/profile";
    const doctorMainRoute = "/dashboard";
    const adminMainRoute = "/dashboard";
    
    // Check if already on the correct route for role
    if (
      (role === "patient" && currentPath === patientMainRoute) ||
      (role === "doctor" && currentPath === doctorMainRoute) ||
      (role === "admin" && currentPath === adminMainRoute)
    ) {
      console.log("Already on correct route for role, no redirect needed");
      setPendingRedirect(false);
      return;
    }
    
    // If we're already on the dashboard base path but need to be on a specific path
    if (currentPath === "/dashboard" && role === "patient") {
      console.log("Patient on main dashboard, redirecting to profile");
      navigate(patientMainRoute, { replace: true });
      
      // Reset pending redirect flag after short delay
      setTimeout(() => {
        setPendingRedirect(false);
      }, 200);
      return;
    }
    
    // Redirect based on role
    switch(role) {
      case 'patient':
        console.log("Redirecting patient to dashboard/profile");
        navigate(patientMainRoute, { replace: true });
        break;
      case 'doctor':
        console.log("Redirecting doctor to dashboard");
        navigate(doctorMainRoute, { replace: true });
        break;
      case 'admin':
        console.log("Redirecting admin to dashboard");
        navigate(adminMainRoute, { replace: true });
        break;
      default:
        console.log("Unknown role, redirecting to dashboard");
        navigate('/dashboard', { replace: true });
    }
    
    // Reset pending redirect flag after navigation
    setTimeout(() => {
      setPendingRedirect(false);
    }, 200);
  };

  const clearErrors = () => {
    setErrorMessage("");
  };

  return {
    user,
    userRole,
    isLoading,
    loading,
    setLoading,
    errorMessage,
    clearErrors,
    signIn,
    requestLoginCode,
    verifyLoginCode,
    redirectUserBasedOnRole
  };
}
