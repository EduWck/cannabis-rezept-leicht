
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useAuthMethods() {
  const { toast } = useToast();

  const signIn = async (email: string, password: string) => {
    try {
      console.log(`Attempting login for: ${email}`);
      
      // Clear any existing session first to prevent conflicts
      await supabase.auth.signOut();
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error details:", error);
        throw error;
      }

      console.log("Login successful:", data.user);
      
      // Show success toast on successful login
      toast({
        title: "Login erfolgreich",
        description: "Willkommen zurück!",
      });
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login fehlgeschlagen",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      
      toast({
        title: "Abgemeldet",
        description: "Sie wurden erfolgreich abgemeldet",
      });
    } catch (error: any) {
      toast({
        title: "Abmeldung fehlgeschlagen",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const requestLoginCode = async (email: string) => {
    try {
      const response = await supabase.functions.invoke('send-login-code', {
        body: { email }
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      toast({
        title: "Code gesendet",
        description: "Prüfen Sie Ihre E-Mail nach dem Login-Code",
      });

      // Return the code for testing purposes (would be removed in production)
      return { success: true, code: response.data.code };
    } catch (error: any) {
      console.error("Error requesting login code:", error);
      toast({
        title: "Code konnte nicht gesendet werden",
        description: error.message,
        variant: "destructive"
      });
      return { success: false };
    }
  };

  const verifyLoginCode = async (email: string, code: string) => {
    try {
      console.log(`Verifying login code for email: ${email}`);
      const response = await supabase.functions.invoke('verify-login-code', {
        body: { email, code }
      });

      if (response.error) {
        console.error("Error in verify-login-code function:", response.error);
        throw new Error(response.error.message);
      }

      // Set the session from the response
      const newSession = response.data.session;
      
      console.log("Login code verified successfully, setting session:", newSession);
      console.log("User role from session:", 
        newSession.user.user_metadata?.role || "No role in metadata");
      
      await supabase.auth.setSession(newSession);
      
      toast({
        title: "Login erfolgreich",
        description: "Willkommen zurück!",
      });

      return true;
    } catch (error: any) {
      console.error("Error verifying login code:", error);
      toast({
        title: "Verifizierung fehlgeschlagen",
        description: error.message,
        variant: "destructive"
      });
      return false;
    }
  };

  return {
    signIn,
    signOut,
    requestLoginCode,
    verifyLoginCode
  };
}
