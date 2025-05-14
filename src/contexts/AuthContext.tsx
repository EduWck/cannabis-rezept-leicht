
import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { UserRole, Profile } from "@/types";
import { useToast } from "@/components/ui/use-toast";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  userRole: UserRole | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  requestLoginCode: (email: string) => Promise<{ success: boolean; code?: string }>;
  verifyLoginCode: (email: string, code: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        if (newSession?.user) {
          await fetchUserProfile(newSession.user.id);
        } else {
          setProfile(null);
          setUserRole(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        await fetchUserProfile(currentSession.user.id);
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        throw error;
      }

      console.log("Fetched user profile:", data);
      setProfile(data);
      setUserRole(data?.role as UserRole || null);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      
      // Fallback to user metadata if profile isn't available
      if (user?.user_metadata?.role) {
        console.log("Using role from user metadata:", user.user_metadata.role);
        setUserRole(user.user_metadata.role as UserRole);
      }
      
      toast({
        title: "Error",
        description: "Failed to load user profile",
        variant: "destructive"
      });
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log(`Attempting login for: ${email}`);
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
        title: "Login successful",
        description: "Welcome back!",
      });
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
    } catch (error: any) {
      toast({
        title: "Sign out failed",
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
        title: "Code sent",
        description: "Check your email for the login code",
      });

      // Return the code for testing purposes (would be removed in production)
      return { success: true, code: response.data.code };
    } catch (error: any) {
      console.error("Error requesting login code:", error);
      toast({
        title: "Failed to send code",
        description: error.message,
        variant: "destructive"
      });
      return { success: false };
    }
  };

  const verifyLoginCode = async (email: string, code: string) => {
    try {
      const response = await supabase.functions.invoke('verify-login-code', {
        body: { email, code }
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      // Set the session from the response
      const newSession = response.data.session;
      await supabase.auth.setSession(newSession);
      
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });

      return true;
    } catch (error: any) {
      console.error("Error verifying login code:", error);
      toast({
        title: "Verification failed",
        description: error.message,
        variant: "destructive"
      });
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        userRole,
        isLoading,
        signIn,
        signOut,
        requestLoginCode,
        verifyLoginCode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
