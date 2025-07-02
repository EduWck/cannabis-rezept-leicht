
import { useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "@/types";

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;

    // Set up auth state listener first
    const setupAuthListener = () => {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, newSession) => {
          console.log("Auth state changed:", event, newSession?.user?.id);
          
          if (!mounted) return;
          
          if (event === 'SIGNED_OUT') {
            console.log("User signed out, clearing session data");
            setSession(null);
            setUser(null);
            setProfile(null);
            setIsLoading(false);
            return;
          }
          
          if (newSession) {
            setSession(newSession);
            setUser(newSession.user ?? null);
          }
        }
      );
      
      return subscription;
    };

    // Check for existing session
    const checkSession = async () => {
      try {
        console.log("Checking for existing session");
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        console.log("Existing session check:", currentSession ? `Found session for user ${currentSession.user.id}` : "No session");
        
        if (!mounted) return;
        
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // If no session, we're done loading
        if (!currentSession?.user) {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    // First setup auth listener, then check session
    const authStateSubscription = setupAuthListener();
    checkSession();

    return () => {
      mounted = false;
      if (authStateSubscription) {
        authStateSubscription.unsubscribe();
      }
    };
  }, []);

  return {
    session,
    user,
    setUser,
    profile,
    setProfile,
    isLoading,
    setIsLoading
  };
}
