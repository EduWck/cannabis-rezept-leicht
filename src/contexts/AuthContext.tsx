
import React, { createContext, useContext } from "react";
import { Session, User } from "@supabase/supabase-js";
import { UserRole, Profile } from "@/types";
import { useAuthProvider } from "@/hooks/use-auth-provider";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  userRole: UserRole | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  requestLoginCode: (email: string) => Promise<{ success: boolean; code?: string }>;
  verifyLoginCode: (email: string, code: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuthProvider();

  return (
    <AuthContext.Provider value={auth}>
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
