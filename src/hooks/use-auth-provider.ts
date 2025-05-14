
import { useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { UserRole, Profile } from "@/types";
import { useToast } from "@/hooks/use-toast";

export function useAuthProvider() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log("Auth state changed:", event);
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        if (newSession?.user) {
          // Use setTimeout to prevent potential deadlocks with auth state change
          setTimeout(() => {
            detectUserRole(newSession.user);
          }, 0);
        } else {
          setProfile(null);
          setUserRole(null);
          setIsLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      console.log("Existing session check:", currentSession ? "Found session" : "No session");
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        await detectUserRole(currentSession.user);
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Function to determine user role from various sources
  const detectUserRole = async (currentUser: User) => {
    try {
      console.log("Detecting user role for:", currentUser.id);
      console.log("User metadata:", JSON.stringify(currentUser.user_metadata));
      
      let detectedRole: UserRole | null = null;
      let userProfile: Profile | null = null;
      
      // First check if email contains role indicators (most reliable for test users)
      const email = currentUser.email?.toLowerCase() || '';
      
      if (email.includes('admin')) {
        detectedRole = 'admin';
        console.log("Role from email detection:", detectedRole);
      } else if (email.includes('doctor')) {
        detectedRole = 'doctor';
        console.log("Role from email detection:", detectedRole);
      } else if (email.includes('patient')) {
        detectedRole = 'patient';
        console.log("Role from email detection:", detectedRole);
      }
      
      // Then try to get role from user metadata (reliable for new users)
      if (!detectedRole && currentUser.user_metadata?.role) {
        detectedRole = currentUser.user_metadata.role as UserRole;
        console.log("Role from user metadata:", detectedRole);
      }
      
      // Try to get profile from profiles table (might fail due to RLS)
      try {
        console.log("Attempting to fetch profile from database");
        
        // Direct access to the profiles table
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", currentUser.id)
          .single();

        if (error) {
          console.error("Error fetching profile from database:", error);
          throw error;
        }

        if (data) {
          console.log("Fetched profile from database:", data);
          userProfile = data as Profile;
          
          // Only use role from profile if we don't already have one from metadata or email
          if (!detectedRole && userProfile.role) {
            detectedRole = userProfile.role;
            console.log("Role from profile:", detectedRole);
          }
        }
      } catch (profileError) {
        console.error("Profile fetch failed, falling back to other methods:", profileError);
        
        // If Supabase profiles table access fails, try the serverless function
        try {
          console.log("Attempting to fetch profile via serverless function");
          const response = await supabase.functions.invoke('get-profile', {
            body: { user_id: currentUser.id }
          });
          
          if (response.error) {
            throw new Error(response.error.message);
          }
          
          if (response.data) {
            console.log("Fetched profile via function:", response.data);
            userProfile = response.data as Profile;
            
            // Only use role from profile if we don't already have one from metadata or email
            if (!detectedRole && userProfile.role) {
              detectedRole = userProfile.role;
              console.log("Role from profile via function:", detectedRole);
            }
          }
        } catch (functionError) {
          console.error("Function profile fetch failed:", functionError);
        }
      }
      
      // If we still don't have a role, use 'patient' as default
      if (!detectedRole) {
        console.log("Using default role: patient");
        detectedRole = 'patient';
      }
      
      // Create a profile object if we don't have one
      if (!userProfile) {
        console.log("Creating minimal profile from available data");
        userProfile = {
          id: currentUser.id,
          email: currentUser.email || "",
          role: detectedRole,
          first_name: currentUser.user_metadata?.first_name as string || null,
          last_name: currentUser.user_metadata?.last_name as string || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          date_of_birth: null,
          phone: null,
          street_address: null,
          postal_code: null,
          city: null,
          country: "Germany",
        };
      }
      
      // Always ensure the profile has a role set
      if (userProfile && !userProfile.role && detectedRole) {
        userProfile.role = detectedRole;
      }
      
      // Update state with our findings
      setUserRole(detectedRole);
      setProfile(userProfile);
      
      console.log("Final detected role:", detectedRole);
      console.log("Final profile:", userProfile);
      
    } catch (error) {
      console.error("Error detecting user role:", error);
      // Don't show toast here as it might be annoying during automatic role detection
    } finally {
      setIsLoading(false);
    }
  };

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
      
      // Clear local state
      setUser(null);
      setSession(null);
      setProfile(null);
      setUserRole(null);
      
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
    session,
    user,
    profile,
    userRole,
    isLoading,
    signIn,
    signOut,
    requestLoginCode,
    verifyLoginCode,
  };
}
