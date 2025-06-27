import { logger } from "@/lib/logger";

import { User } from "@supabase/supabase-js";
import { useState, useCallback } from "react";
import { UserRole, Profile } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export function useRoleDetection() {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  
  const detectUserRole = useCallback(async (currentUser: User, setProfile: (profile: Profile | null) => void, setIsLoading: (loading: boolean) => void) => {
    try {
      logger.debug("Detecting user role for:", currentUser.id);
      logger.debug("User metadata:", JSON.stringify(currentUser.user_metadata));
      
      let detectedRole: UserRole | null = null;
      let userProfile: Profile | null = null;
      
      // PRIORITY 1: Email - most reliable method for test accounts
      const email = currentUser.email?.toLowerCase() || '';
      
      if (email.includes('admin')) {
        detectedRole = 'admin';
        logger.debug("⭐ HIGHEST PRIORITY: Role detected from email: admin");
      } else if (email.includes('doctor') || email.includes('arzt')) {
        detectedRole = 'doctor';
        logger.debug("⭐ HIGHEST PRIORITY: Role detected from email: doctor");
      } else if (email.includes('pharmacy') || email.includes('apothek')) {
        detectedRole = 'pharmacy';
        logger.debug("⭐ HIGHEST PRIORITY: Role detected from email: pharmacy");
      } else if (email.includes('patient') || email.includes('patien')) {
        detectedRole = 'patient';
        logger.debug("⭐ HIGHEST PRIORITY: Role detected from email: patient");
      }
      
      logger.debug("Email-based role detection: ", detectedRole);
      
      // PRIORITY 2: Check user metadata
      if (!detectedRole && currentUser.user_metadata?.role) {
        // Cast the role from metadata to our UserRole type for type safety
        const metadataRole = currentUser.user_metadata.role as string;
        // Only assign if it's a valid UserRole
        if (metadataRole === 'admin' || metadataRole === 'doctor' || 
            metadataRole === 'patient' || metadataRole === 'pharmacy') {
          detectedRole = metadataRole as UserRole;
          logger.debug("Role from user metadata:", detectedRole);
        }
      }
      
      // PRIORITY 3: Check profile in database
      try {
        logger.debug("Fetching profile from database");
        
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", currentUser.id)
          .maybeSingle();

        if (error) {
          logger.error("Error fetching profile from database:", error);
          throw error;
        }

        if (data) {
          logger.debug("Profile found in database:", data);
          // Convert database role to UI role if needed
          if (data.role === 'admin' || data.role === 'doctor' || data.role === 'patient') {
            userProfile = data as Profile;
          } else {
            // If the database has an unrecognized role, convert it to our UI model
            userProfile = {
              ...data,
              role: data.role as UserRole // Cast to our UI role type
            };
          }
          
          // If we still don't have a role, use the one from the profile
          if (!detectedRole && userProfile.role) {
            detectedRole = userProfile.role;
            logger.debug("Role from database profile:", detectedRole);
          }
        } else {
          logger.debug("No profile found in database, will create a new one");
        }
      } catch (profileError) {
        logger.error("Profile fetch failed, trying serverless function:", profileError);
        
        try {
          logger.debug("Attempting to fetch profile via serverless function");
          const response = await supabase.functions.invoke('get-profile', {
            body: { user_id: currentUser.id }
          });
          
          if (response.error) {
            throw new Error(response.error.message);
          }
          
          if (response.data) {
            logger.debug("Profile fetched via function:", response.data);
            userProfile = response.data as Profile;
            
            if (!detectedRole && userProfile.role) {
              detectedRole = userProfile.role;
              logger.debug("Role from profile via function:", detectedRole);
            }
          }
        } catch (functionError) {
          logger.error("Function call for profile failed:", functionError);
        }
      }
      
      // If we still don't have a role, use email as final fallback
      if (!detectedRole) {
        if (email.includes('admin')) {
          detectedRole = 'admin';
        } else if (email.includes('doctor') || email.includes('arzt')) {
          detectedRole = 'doctor';
        } else if (email.includes('pharmacy') || email.includes('apothek')) {
          detectedRole = 'pharmacy';
        } else if (email.includes('patient') || email.includes('patien')) {
          detectedRole = 'patient';
        } else {
          detectedRole = 'patient'; // Default fallback
        }
        
        logger.debug("Using email-based fallback for role:", detectedRole);
        
        toast({
          title: "Role set based on email",
          description: `You have been classified as ${detectedRole}.`
        });
      }
      
      // Create/update profile in database with correct role
      // CRITICAL: If detected role and profile role don't match,
      // ALWAYS use the detected role which has higher priority (based on email)
      if (!userProfile || userProfile.role !== detectedRole) {
        logger.debug("Creating/updating profile with detected role:", detectedRole);
        
        // Convert our UI role to a database-compatible role
        const databaseRole = detectedRole === 'pharmacy' ? 'admin' : detectedRole;
        
        const profileData = {
          id: currentUser.id,
          email: currentUser.email || "",
          role: databaseRole as 'patient' | 'doctor' | 'admin', // Cast to database role type
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
        
        try {
          // First check if profile exists
          const { data: existingProfile } = await supabase
            .from("profiles")
            .select("id, role")
            .eq("id", currentUser.id)
            .maybeSingle();
            
          if (existingProfile) {
            logger.debug("Updating existing profile with role:", databaseRole);
            
            // If role is different, show notification
            if (existingProfile.role !== databaseRole) {
              logger.debug(`⚠️ Role conflict: Changing from ${existingProfile.role} to ${databaseRole} (higher priority)`);
              toast({
                title: "Role correction",
                description: `Your role has been corrected from ${existingProfile.role} to ${detectedRole}.`
              });
            }
            
            // Update existing profile
            const { error: updateError } = await supabase
              .from("profiles")
              .update({
                role: databaseRole, // IMPORTANT: Using database-compatible role
                email: currentUser.email || "",
                updated_at: new Date().toISOString()
              })
              .eq("id", currentUser.id);
              
            if (updateError) {
              logger.error("Error updating profile:", updateError);
              throw updateError;
            } else {
              logger.debug("Profile successfully updated with role:", databaseRole);
            }
          } else {
            // Create new profile
            logger.debug("Creating new profile with role:", databaseRole);
            const { error: insertError } = await supabase
              .from("profiles")
              .insert(profileData);
              
            if (insertError) {
              logger.error("Error creating profile:", insertError);
              throw insertError;
            } else {
              logger.debug("Profile successfully created with role:", databaseRole);
              toast({
                title: "Profile created",
                description: "Your profile has been successfully created."
              });
            }
          }
          
          // Set userProfile with our new data to ensure consistency, but convert database role to UI role
          const uiProfileData: Profile = {
            ...profileData,
            role: detectedRole // Use the UI role
          };
          userProfile = uiProfileData;
        } catch (profileWriteError) {
          logger.error("Error writing profile to database:", profileWriteError);
          toast({
            title: "Error updating",
            description: "Your profile could not be updated.",
            variant: "destructive"
          });
        }
      }
      
      // Update state with our findings
      setUserRole(detectedRole);
      setProfile(userProfile);
      
      logger.debug("Final detected role:", detectedRole);
      logger.debug("Final profile:", userProfile);
      
      // Also update user metadata if needed to ensure consistency
      if (detectedRole && (!currentUser.user_metadata?.role || currentUser.user_metadata.role !== detectedRole)) {
        try {
          const { data, error } = await supabase.auth.updateUser({
            data: { role: detectedRole }
          });
          
          if (error) {
            logger.error("Error updating user metadata:", error);
          } else {
            logger.debug("User metadata updated with role:", detectedRole);
          }
        } catch (metadataError) {
          logger.error("Error updating user metadata:", metadataError);
        }
      }
    } catch (error) {
      logger.error("Error in role detection:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    userRole,
    setUserRole,
    detectUserRole
  };
}
