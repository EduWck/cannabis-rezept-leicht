
import { useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { useSession } from "./auth/use-session";
import { useRoleDetection } from "./auth/use-role-detection";
import { useAuthMethods } from "./auth/use-auth-methods";

export function useAuthProvider() {
  const { session, user, profile, setProfile, isLoading, setIsLoading } = useSession();
  const { userRole, setUserRole, detectUserRole } = useRoleDetection();
  const { signIn, signOut, requestLoginCode, verifyLoginCode } = useAuthMethods();

  // Detect user role when user changes
  useEffect(() => {
    if (user) {
      // Use setTimeout to avoid potential deadlocks with auth state change
      setTimeout(() => {
        detectUserRole(user, setProfile, setIsLoading);
      }, 0);
    }
  }, [user]);

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
