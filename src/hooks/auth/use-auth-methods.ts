
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
          description: response.error,
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
      toast({
        title: "Code konnte nicht gesendet werden",
        description: error.message || "Ein unbekannter Fehler ist aufgetreten",
        variant: "destructive"
      });
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
      
      // For development environment, use the serverless function
      const response = await supabase.functions.invoke('verify-login-code', {
        body: { email, code }
      });
      
      if (response.error) {
        console.error("Error verifying code:", response.error);
        toast({
          title: "Code konnte nicht verifiziert werden",
          description: response.error,
          variant: "destructive"
        });
        return false;
      }
      
      if (!response.data?.session) {
        console.error("No session returned");
        toast({
          title: "Login fehlgeschlagen",
          description: "Der Server hat keine gültige Sitzung zurückgegeben.",
          variant: "destructive"
        });
        return false;
      }
      
      // Set the session in Supabase
      const { error: sessionError } = await supabase.auth.setSession({
        access_token: response.data.session.access_token,
        refresh_token: response.data.session.refresh_token
      });
      
      if (sessionError) {
        console.error("Error setting session:", sessionError);
        toast({
          title: "Login fehlgeschlagen",
          description: sessionError.message,
          variant: "destructive"
        });
        return false;
      }
      
      console.log("Login successful with code");
      return true;
      
    } catch (error: any) {
      console.error("Error verifying code:", error);
      toast({
        title: "Code konnte nicht verifiziert werden",
        description: error.message || "Ein unbekannter Fehler ist aufgetreten",
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
