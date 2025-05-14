
import { useEffect, useRef } from "react";
import { User } from "@supabase/supabase-js";
import { useSession } from "./auth/use-session";
import { useRoleDetection } from "./auth/use-role-detection";
import { useAuthMethods } from "./auth/use-auth-methods";

export function useAuthProvider() {
  const { session, user, profile, setProfile, isLoading, setIsLoading } = useSession();
  const { userRole, setUserRole, detectUserRole } = useRoleDetection();
  const { signIn, signOut, requestLoginCode, verifyLoginCode } = useAuthMethods();
  const roleDetectionAttempted = useRef(false);

  // Detect user role when user changes or session updates
  useEffect(() => {
    if (user && (!userRole || !roleDetectionAttempted.current)) {
      roleDetectionAttempted.current = true;
      console.log("Attempting to detect role for user:", user.id);
      
      // Use setTimeout to avoid potential deadlocks with auth state change
      setTimeout(() => {
        detectUserRole(user, setProfile, setIsLoading);
      }, 10);
    } else if (!user) {
      // Reset detection flag when user logs out
      roleDetectionAttempted.current = false;
      
      if (userRole) {
        console.log("User logged out, clearing role");
        setUserRole(null);
      }
    }
  }, [user, session, userRole, detectUserRole, setProfile, setIsLoading, setUserRole]);

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
