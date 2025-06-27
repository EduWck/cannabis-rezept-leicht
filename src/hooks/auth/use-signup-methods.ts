import { logger } from "@/lib/logger";

import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export function useSignupMethods() {
  const [isProcessing, setIsProcessing] = useState(false);
  
  /**
   * Sign up new user with email and password
   */
  const signUp = async (email: string, password: string, firstName?: string, lastName?: string): Promise<boolean> => {
    try {
      setIsProcessing(true);
      logger.debug("Attempting to sign up with email:", email);
      
      if (!email || !password) {
        logger.error("Email or password missing");
        toast({
          title: "Registrierung fehlgeschlagen",
          description: "E-Mail und Passwort werden benötigt",
          variant: "destructive"
        });
        return false;
      }
      
      // Normalize email
      const normalizedEmail = email.trim().toLowerCase();
      
      // Set redirect URL for email confirmation
      const redirectUrl = `${window.location.origin}/login`;
      
      logger.debug("Creating new user account...");
      
      const { data, error } = await supabase.auth.signUp({
        email: normalizedEmail,
        password: password.trim(),
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            first_name: firstName || '',
            last_name: lastName || '',
            role: 'patient' // Default role for new users
          }
        }
      });

      if (error) {
        logger.error("Signup error:", error.message);
        
        // Handle specific error cases
        if (error.message.includes('already registered')) {
          toast({
            title: "Benutzer existiert bereits", 
            description: "Diese E-Mail-Adresse ist bereits registriert. Bitte melden Sie sich an.", 
            variant: "destructive"
          });
        } else {
          toast({
            title: "Registrierung fehlgeschlagen", 
            description: error.message, 
            variant: "destructive"
          });
        }
        return false;
      }

      logger.debug("Signup successful:", data.user?.id);
      
      // If user was created successfully, create profile
      if (data.user) {
        try {
          logger.debug("Creating user profile...");
          
          const { error: profileError } = await supabase
            .from("profiles")
            .insert({
              id: data.user.id,
              email: normalizedEmail,
              first_name: firstName || '',
              last_name: lastName || '',
              role: 'patient',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            });
            
          if (profileError) {
            logger.error("Error creating profile:", profileError);
            toast({
              title: "Warnung",
              description: "Konto wurde erstellt, aber Profil konnte nicht vollständig eingerichtet werden.",
              variant: "destructive"
            });
          } else {
            logger.debug("Profile created successfully");
          }
        } catch (profileError) {
          logger.error("Unexpected error creating profile:", profileError);
        }
      }
      
      toast({
        title: "Registrierung erfolgreich",
        description: data.user?.email_confirmed_at 
          ? "Sie wurden erfolgreich registriert und können sich jetzt anmelden." 
          : "Bitte überprüfen Sie Ihre E-Mails zur Bestätigung Ihres Kontos."
      });
      
      return true;
    } catch (error: any) {
      logger.error("Unexpected signup error:", error.message);
      toast({
        title: "Unerwarteter Fehler", 
        description: "Bei der Registrierung ist ein unerwarteter Fehler aufgetreten.", 
        variant: "destructive"
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    signUp,
    isProcessing
  };
}
