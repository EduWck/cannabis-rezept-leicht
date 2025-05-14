
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

  // Helper function to redirect users based on their role
  const redirectUserBasedOnRole = (role: UserRole) => {
    console.log("Redirecting based on role:", role);
    
    // Define main routes for each role
    const patientMainRoute = "/dashboard/profile";
    const doctorMainRoute = "/dashboard";
    const adminMainRoute = "/dashboard";
    
    // Ensure we're not already on the target route
    const currentPath = location.pathname;
    if (
      (role === "patient" && currentPath === patientMainRoute) ||
      (role === "doctor" && currentPath === doctorMainRoute) ||
      (role === "admin" && currentPath === adminMainRoute)
    ) {
      console.log("Already on correct route for role, no redirect needed");
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
