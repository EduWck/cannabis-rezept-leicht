
import { logger } from "@/lib/logger";
import { useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { UserRole, Profile } from "@/types";

export function useRoleDetection() {
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  const detectUserRole = async (
    user: User,
    setProfile: (profile: Profile | null) => void,
    setIsLoading: (loading: boolean) => void
  ) => {
    if (!user) {
      logger.debug("No user provided for role detection");
      setUserRole(null);
      setIsLoading(false);
      return;
    }

    try {
      logger.debug("Detecting role for user:", user.id);

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle(); // Use maybeSingle to avoid errors when no profile exists

      if (error) {
        logger.error("Error fetching profile:", error);
        setIsLoading(false);
        return;
      }

      if (profile) {
        logger.debug("Found profile with role:", profile.role);
        setProfile(profile);
        setUserRole(profile.role as UserRole);
      } else {
        logger.debug("No profile found, creating new profile");
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            email: user.email || '',
            role: 'patient'
          })
          .select()
          .single();

        if (createError) {
          logger.error("Error creating profile:", createError);
        } else {
          logger.debug("Created new profile:", newProfile);
          setProfile(newProfile);
          setUserRole(newProfile.role as UserRole);
        }
      }
    } catch (error) {
      logger.error("Unexpected error in role detection:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    userRole,
    setUserRole,
    detectUserRole,
  };
}
