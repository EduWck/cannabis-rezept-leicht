
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
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error.message);
        toast({
          title: "Login fehlgeschlagen",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }

      console.log("Login successful:", data.user?.id);
      return true;
    } catch (error: any) {
      console.error("Unexpected login error:", error.message);
      toast({
        title: "Unerwarteter Fehler",
        description: "Bei der Anmeldung ist ein unerwarteter Fehler aufgetreten.",
        variant: "destructive",
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
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error.message);
        toast({
          title: "Logout fehlgeschlagen",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Unexpected logout error:", error.message);
    }
  };

  /**
   * Request a login code for passwordless login
   */
  const requestLoginCode = async (email: string) => {
    try {
      setIsProcessing(true);
      
      // For development environment, use the serverless function
      const response = await supabase.functions.invoke('send-login-code', {
        body: { email }
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
   * This function now handles the complete login process after verification
   */
  const verifyLoginCode = async (email: string, code: string): Promise<boolean> => {
    try {
      setIsProcessing(true);
      
      console.log(`Attempting to verify code for email: ${email} with code: ${code}`);
      
      // Step 1: Verify the code through our Edge Function
      const response = await supabase.functions.invoke('verify-login-code', {
        body: { email, code }
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
      
      // Step 2: If verification was successful and we received a magic link, use it
      if (response.data?.success && response.data?.magicLink) {
        console.log("Code verification successful. Using magic link for: ", response.data.email);
        
        // Extract token from magic link
        const url = new URL(response.data.magicLink);
        const token = url.searchParams.get('token');
        const type = url.searchParams.get('type');
        
        if (token && type) {
          // Use the token to sign in directly
          const { error: signInError } = await supabase.auth.verifyOtp({
            token_hash: token,
            type: 'magiclink',
          });
          
          if (signInError) {
            console.error("Error using magic link token:", signInError);
            // Fallback to email OTP if token doesn't work
            const { error: otpError } = await supabase.auth.signInWithOtp({
              email: email
            });
            
            if (otpError) {
              console.error("Fallback OTP error:", otpError);
              toast({
                title: "Login fehlgeschlagen",
                description: "Der automatische Login konnte nicht durchgeführt werden. Bitte überprüfen Sie Ihre E-Mails für einen Login-Link.",
                variant: "destructive"
              });
              // Despite errors, verification was successful - user will need to click email link
              return true;
            }
          }
        } else {
          // Fallback if we can't extract token from URL
          await supabase.auth.signInWithOtp({
            email: email
          });
          
          toast({
            title: "Login-Link gesendet",
            description: "Bitte überprüfen Sie Ihre E-Mails für einen Login-Link."
          });
        }
        
        // Show success message to the user
        toast({
          title: "Code bestätigt",
          description: "Ihr Code wurde erfolgreich verifiziert. Sie werden in Kürze eingeloggt."
        });
        
        // Let the UI know verification was successful
        return true;
      }
      
      // If we reach here, something unexpected happened with the response format
      toast({
        title: "Unerwartete Antwort",
        description: "Die Bestätigung war erfolgreich, aber die Anmeldung konnte nicht abgeschlossen werden.",
        variant: "destructive"
      });
      return false;
      
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
