
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export function useAuthMethods() {
  const [isProcessing, setIsProcessing] = useState(false);
  
  /**
   * Sign in with email and password
   */
  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsProcessing(true);
      console.log("Attempting to sign in with email and password:", email);
      
      if (!email || !password) {
        console.error("Email or password missing");
        toast({
          title: "Login fehlgeschlagen",
          description: "E-Mail und Passwort werden benötigt",
          variant: "destructive"
        });
        return false;
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (error) {
        console.error("Login error:", error.message);
        toast({
          title: "Login fehlgeschlagen", 
          description: error.message, 
          variant: "destructive"
        });
        return false;
      }

      console.log("Login successful:", data.user?.id);
      toast({
        title: "Login erfolgreich",
        description: "Sie wurden erfolgreich angemeldet."
      });
      return true;
    } catch (error: any) {
      console.error("Unexpected login error:", error.message);
      toast({
        title: "Unerwarteter Fehler", 
        description: "Bei der Anmeldung ist ein unerwarteter Fehler aufgetreten.", 
        variant: "destructive"
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Sign out
   */
  const signOut = async (): Promise<void> => {
    try {
      console.log("Attempting to sign out");
      setIsProcessing(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error.message);
        throw error;
      }
      console.log("Logout successful");
      toast({
        title: "Abgemeldet",
        description: "Sie wurden erfolgreich abgemeldet."
      });
    } catch (error: any) {
      console.error("Unexpected logout error:", error.message);
      toast({
        title: "Fehler beim Abmelden",
        description: error.message || "Ein unerwarteter Fehler ist aufgetreten.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Request a login code for passwordless login
   */
  const requestLoginCode = async (email: string) => {
    try {
      setIsProcessing(true);
      console.log("Requesting login code for:", email);
      
      if (!email || !email.trim()) {
        toast({
          title: "E-Mail erforderlich",
          description: "Bitte geben Sie eine E-Mail-Adresse ein.",
          variant: "destructive"
        });
        return { success: false };
      }
      
      // For development environment, use the serverless function
      const response = await supabase.functions.invoke('send-login-code', {
        body: { email: email.trim() }
      });
      
      if (response.error) {
        console.error("Error requesting login code:", response.error);
        toast({
          title: "Code konnte nicht gesendet werden", 
          description: typeof response.error === 'string' ? response.error : "Ein Fehler ist aufgetreten.", 
          variant: "destructive"
        });
        return { success: false };
      }
      
      toast({
        title: "Code gesendet", 
        description: "Bitte überprüfen Sie Ihre E-Mails für den Login-Code."
      });
      
      // For demo purposes, return the code from the function response (if available)
      return { 
        success: true,
        code: response.data?.code || null
      };
      
    } catch (error: any) {
      console.error("Error requesting login code:", error);
      
      // Check for rate limit error
      if (error.message && error.message.includes("after 59 seconds")) {
        toast({
          title: "Zu viele Anfragen", 
          description: "Bitte warten Sie eine Minute, bevor Sie einen neuen Code anfordern.", 
          variant: "destructive"
        });
      } else {
        toast({
          title: "Code konnte nicht gesendet werden", 
          description: error.message || "Ein unbekannter Fehler ist aufgetreten", 
          variant: "destructive"
        });
      }
      return { success: false };
    } finally {
      setIsProcessing(false);
    }
  };
  
  /**
   * Verify login code for passwordless login
   */
  const verifyLoginCode = async (email: string, code: string): Promise<boolean> => {
    try {
      setIsProcessing(true);
      
      if (!email || !code) {
        toast({
          title: "Fehlende Daten",
          description: "E-Mail und Code werden benötigt",
          variant: "destructive"
        });
        return false;
      }
      
      console.log(`Attempting to verify code for email: ${email} with code: ${code}`);
      
      // Step 1: Verify the code through our Edge Function
      const response = await supabase.functions.invoke('verify-login-code', {
        body: { email: email.trim(), code: code.trim() }
      });
      
      if (response.error) {
        console.error("Error verifying code:", response.error);
        toast({
          title: "Code konnte nicht verifiziert werden", 
          description: typeof response.error === 'string' ? response.error : "Ein Fehler ist aufgetreten.", 
          variant: "destructive"
        });
        return false;
      }
      
      // Log the full response for debugging
      console.log("Verification response:", response.data);
      
      if (!response.data?.success) {
        console.error("Verification failed without specific error:", response.data);
        toast({
          title: "Verifizierung fehlgeschlagen", 
          description: "Der Code konnte nicht verifiziert werden.", 
          variant: "destructive"
        });
        return false;
      }
      
      // Show success message to the user
      toast({
        title: "Code bestätigt", 
        description: "Ihr Code wurde erfolgreich verifiziert. Sie werden in Kürze eingeloggt."
      });
      
      // Step 2: If verification was successful and we received a magic link, use it
      if (response.data?.magicLink) {
        console.log("Received magic link, redirecting to:", response.data.magicLink);
        window.location.href = response.data.magicLink;
        return true;
      }
      
      // Try to sign in directly with email OTP as a backup method
      try {
        console.log("Attempting direct signin with email OTP");
        const { error: otpError } = await supabase.auth.signInWithOtp({
          email: email.trim(),
          options: {
            shouldCreateUser: true,
            data: {
              role: response.data?.role || 'patient'
            }
          }
        });
        
        if (otpError) {
          console.error("Error with direct OTP signin:", otpError);
          // Don't show error to user as we're already redirected to magic link
          return true;
        }
        
        console.log("OTP signin initiated successfully");
        return true;
      } catch (signInError) {
        console.error("Error during direct signin attempt:", signInError);
        // Don't consider this a failure since we'll try other methods
        return true;
      }
    } catch (error: any) {
      console.error("Error verifying code:", error);
      toast({
        title: "Code konnte nicht verifiziert werden", 
        description: typeof error === 'object' && error.message ? error.message : "Ein unbekannter Fehler ist aufgetreten", 
        variant: "destructive"
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    signIn,
    signOut,
    requestLoginCode,
    verifyLoginCode,
    isProcessing
  };
}
