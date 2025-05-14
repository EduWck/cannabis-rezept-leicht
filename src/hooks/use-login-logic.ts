
import { useState, useEffect, useRef } from "react";
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
  const redirectAttempts = useRef(0);
  
  // Reset error message when location changes
  useEffect(() => {
    if (location.state?.error) {
      setErrorMessage(location.state.error);
    } else {
      setErrorMessage("");
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

  // Redirect if already logged in, with safeguards against redirect loops
  useEffect(() => {
    // Skip if we're already processing a redirect or still loading auth state
    if (pendingRedirect || isLoading) {
      return;
    }
    
    // Only redirect if we have a user with a role
    if (user && userRole) {
      console.log("User is logged in, redirecting based on role:", userRole);
      
      // Prevent multiple redirects
      setPendingRedirect(true);
      
      // Check if we're on the login page
      const isLoginPage = location.pathname === '/login';
      
      // Only redirect if we're on the login page or we haven't tried too many times
      if (isLoginPage || redirectAttempts.current < 3) {
        redirectAttempts.current += 1;
        
        // Use timeout to ensure state updates complete first
        setTimeout(() => {
          redirectUserBasedOnRole(userRole);
        }, 100);
      } else {
        // Reset redirect attempts and pending status if we've tried too many times
        console.log("Too many redirect attempts, stopping redirect loop");
        redirectAttempts.current = 0;
        setPendingRedirect(false);
      }
    }
  }, [user, userRole, isLoading, pendingRedirect, location.pathname]);

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
      redirectAttempts.current = 0;
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
