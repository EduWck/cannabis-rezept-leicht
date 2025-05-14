
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

  // Redirect if already logged in
  useEffect(() => {
    if (pendingRedirect) {
      return; // Don't check redirects if we already have one pending
    }
    
    if (!isLoading && user && userRole) {
      console.log("User is logged in, redirecting based on role:", userRole);
      setPendingRedirect(true);
      
      // Use timeout to ensure state updates complete first
      setTimeout(() => {
        redirectUserBasedOnRole(userRole);
      }, 100);
    }
  }, [user, userRole, isLoading, pendingRedirect]);

  const redirectUserBasedOnRole = (role: UserRole) => {
    console.log("Redirecting based on role:", role);
    
    // Prevent dashboard redirect loop for admin users
    if (location.pathname === "/dashboard" && role === "admin") {
      console.log("Admin already on dashboard, not redirecting");
      setPendingRedirect(false);
      return;
    }
    
    // Prevent dashboard/profile redirect loop for patient users
    if (location.pathname === "/dashboard/profile" && role === "patient") {
      console.log("Patient already on profile, not redirecting");
      setPendingRedirect(false);
      return;
    }
    
    switch(role) {
      case 'patient':
        console.log("Redirecting patient to dashboard/profile");
        navigate('/dashboard/profile', { replace: true });
        break;
      case 'doctor':
        console.log("Redirecting doctor to dashboard");
        navigate('/dashboard', { replace: true });
        break;
      case 'admin':
        console.log("Redirecting admin to dashboard");
        navigate('/dashboard', { replace: true });
        break;
      default:
        console.log("Unknown role, redirecting to dashboard");
        navigate('/dashboard', { replace: true });
        break;
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
