
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
    if (!isLoading && user && userRole) {
      console.log("User is logged in, redirecting based on role:", userRole);
      
      // Use timeout to ensure state updates complete first
      setTimeout(() => {
        redirectUserBasedOnRole(userRole);
      }, 0);
    }
  }, [user, userRole, isLoading]);

  const redirectUserBasedOnRole = (role: UserRole) => {
    console.log("Redirecting based on role:", role);
    
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
