
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
  const [roleDetectionAttempts, setRoleDetectionAttempts] = useState(0);
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
        console.log("Hash-Parameter erkannt, möglicher Auth-Callback:", hash);
        toast({
          title: "Automatische Anmeldung",
          description: "Sie werden angemeldet..."
        });
      }
    };

    handleHashParams();
  }, []);

  // Überwachung des Benutzers und der Rolle und Weiterleitung, wenn beides verfügbar ist
  useEffect(() => {
    if (user && !isLoading && !pendingRedirect) {
      // Wenn der Benutzer angemeldet ist, aber keine Rolle hat,
      // warten wir eine Weile und versuchen bis zu 5 Mal
      if (!userRole) {
        if (roleDetectionAttempts < 5) {
          console.log(`Warte auf Rollenerkennung, Versuch ${roleDetectionAttempts + 1}/5...`);
          
          // Zeige nach dem ersten Versuch eine Benachrichtigung
          if (roleDetectionAttempts === 0) {
            toast({
              title: "Benutzerrolle wird erkannt",
              description: "Ihre Berechtigungen werden ermittelt..."
            });
          }
          
          // Erhöhen der Versuche und erneuter Check nach kurzer Verzögerung
          const timer = setTimeout(() => {
            setRoleDetectionAttempts(prev => prev + 1);
          }, 1000); // Erhöht von 800ms auf 1000ms
          
          return () => clearTimeout(timer);
        } else {
          // Nach 5 Versuchen, versuchen wir eine Fallback-Methode über die E-Mail
          let fallbackRole: UserRole | null = null;
          
          if (user.email) {
            const email = user.email.toLowerCase();
            if (email.includes('admin')) {
              fallbackRole = 'admin';
            } else if (email.includes('doctor') || email.includes('arzt')) {
              fallbackRole = 'doctor';
            } else if (email.includes('patient') || email.includes('patien')) {
              fallbackRole = 'patient';
            } else {
              fallbackRole = 'patient'; // Default-Fallback
            }
            
            console.log(`Nach 5 Versuchen: Fallback-Rolle aus E-Mail bestimmt: ${fallbackRole}`);
            toast({
              title: "Rolle bestimmt",
              description: `Sie werden als ${fallbackRole} eingestuft und weitergeleitet.`
            });
            
            // Weiterleitung mit Fallback-Rolle
            setPendingRedirect(true);
            setTimeout(() => {
              console.log(`REDIRECT with fallback role: ${fallbackRole}`);
              redirectUserBasedOnRole(fallbackRole as UserRole);
            }, 1200);
          }
        }
      } else {
        // Wir haben einen Benutzer und eine Rolle, also leiten wir weiter
        console.log(`Benutzer angemeldet mit Rolle: ${userRole}, Weiterleitung...`);
        setPendingRedirect(true);
        
        // Special handling for doctor accounts
        if (userRole === 'doctor') {
          console.log("DOCTOR LOGIN DETECTED - Using special delay for doctor accounts");
          toast({
            title: "Arzt-Login erkannt",
            description: "Sie werden zum Arzt-Dashboard weitergeleitet..."
          });
          
          setTimeout(() => {
            console.log(`DOCTOR REDIRECT from main detection - direct to dashboard`);
            navigate('/dashboard', { replace: true });
          }, 1200);
        } else {
          // Standard handling for other roles
          setTimeout(() => {
            console.log(`REDIRECT from main detection: ${userRole}`);
            redirectUserBasedOnRole(userRole);
          }, 800);
        }
      }
    }
  }, [user, userRole, isLoading, roleDetectionAttempts, navigate]);

  // Helper function to redirect users based on their role
  const redirectUserBasedOnRole = (role: UserRole) => {
    console.log("Leite weiter basierend auf Rolle:", role);
    
    if (redirectAttempts.current > 5) {
      console.error("Zu viele Weiterleitungsversuche, mögliche Weiterleitungsschleife erkannt");
      toast({
        title: "Weiterleitungsfehler", 
        description: "Zu viele Weiterleitungen erkannt. Bitte laden Sie die Seite neu.", 
        variant: "destructive"
      });
      return;
    }
    
    redirectAttempts.current += 1;
    
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
      console.log("Bereits auf der korrekten Route für die Rolle, keine Weiterleitung nötig");
      return;
    }
    
    // Special logs for doctor role to debug the issue
    if (role === "doctor") {
      console.log("DOCTOR REDIRECT: Attempting to redirect doctor to dashboard");
      console.log("Current path:", currentPath);
      console.log("Target path:", doctorMainRoute);
      
      // Force direct navigation for doctor role
      console.log("Using direct navigation for doctor role");
      navigate("/dashboard", { replace: true });
      
      // Add a confirmation toast after redirection attempt
      toast({
        title: "Arzt-Weiterleitung",
        description: "Sie wurden als Arzt zum Dashboard weitergeleitet."
      });
      
      return;
    }
    
    // Redirect based on role with forced navigation
    switch(role) {
      case 'patient':
        console.log("Leite Patient zu dashboard/profile weiter");
        navigate(patientMainRoute, { replace: true });
        break;
      case 'admin':
        console.log("Leite Admin zum Dashboard weiter");
        navigate(adminMainRoute, { replace: true });
        break;
      default:
        console.log("Unbekannte Rolle, leite zum Dashboard weiter");
        navigate('/dashboard', { replace: true });
    }
    
    // Add a confirmation toast after redirection attempt
    toast({
      title: "Weiterleitung",
      description: `Sie wurden als ${role} zum Dashboard weitergeleitet.`
    });
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
