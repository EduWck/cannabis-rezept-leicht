
import { User } from "@supabase/supabase-js";
import { useState, useCallback } from "react";
import { UserRole, Profile } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export function useRoleDetection() {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  
  const detectUserRole = useCallback(async (currentUser: User, setProfile: (profile: Profile | null) => void, setIsLoading: (loading: boolean) => void) => {
    try {
      console.log("Detecting user role for:", currentUser.id);
      console.log("User metadata:", JSON.stringify(currentUser.user_metadata));
      
      let detectedRole: UserRole | null = null;
      let userProfile: Profile | null = null;
      
      // PRIORITY 1: Email - most reliable method for test accounts
      const email = currentUser.email?.toLowerCase() || '';
      
      if (email.includes('admin')) {
        detectedRole = 'admin';
        console.log("⭐ HIGHEST PRIORITY: Role detected from email: admin");
      } else if (email.includes('doctor') || email.includes('arzt')) {
        detectedRole = 'doctor';
        console.log("⭐ HIGHEST PRIORITY: Role detected from email: doctor");
      } else if (email.includes('patient') || email.includes('patien')) {
        detectedRole = 'patient';
        console.log("⭐ HIGHEST PRIORITY: Role detected from email: patient");
      }
      
      console.log("Email-based role detection: ", detectedRole);
      
      // PRIORITY 2: Check user metadata
      if (!detectedRole && currentUser.user_metadata?.role) {
        detectedRole = currentUser.user_metadata.role as UserRole;
        console.log("Role from user metadata:", detectedRole);
      }
      
      // PRIORITY 3: Check profile in database
      try {
        console.log("Fetching profile from database");
        
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", currentUser.id)
          .maybeSingle();

        if (error) {
          console.error("Error fetching profile from database:", error);
          throw error;
        }

        if (data) {
          console.log("Profile found in database:", data);
          userProfile = data as Profile;
          
          // If we still don't have a role, use the one from the profile
          if (!detectedRole && userProfile.role) {
            detectedRole = userProfile.role;
            console.log("Role from database profile:", detectedRole);
          }
        } else {
          console.log("No profile found in database, will create a new one");
        }
      } catch (profileError) {
        console.error("Profile fetch failed, trying serverless function:", profileError);
        
        try {
          console.log("Attempting to fetch profile via serverless function");
          const response = await supabase.functions.invoke('get-profile', {
            body: { user_id: currentUser.id }
          });
          
          if (response.error) {
            throw new Error(response.error.message);
          }
          
          if (response.data) {
            console.log("Profile fetched via function:", response.data);
            userProfile = response.data as Profile;
            
            if (!detectedRole && userProfile.role) {
              detectedRole = userProfile.role;
              console.log("Role from profile via function:", detectedRole);
            }
          }
        } catch (functionError) {
          console.error("Function call for profile failed:", functionError);
        }
      }
      
      // If we still don't have a role, use email as final fallback
      if (!detectedRole) {
        if (email.includes('admin')) {
          detectedRole = 'admin';
        } else if (email.includes('doctor') || email.includes('arzt')) {
          detectedRole = 'doctor';
        } else if (email.includes('patient') || email.includes('patien')) {
          detectedRole = 'patient';
        } else {
          detectedRole = 'patient'; // Default fallback
        }
        
        console.log("Using email-based fallback for role:", detectedRole);
        
        toast({
          title: "Role set based on email",
          description: `You have been classified as ${detectedRole}.`
        });
      }
      
      // Create/update profile in database with correct role
      // CRITICAL: If detected role and profile role don't match,
      // ALWAYS use the detected role which has higher priority (based on email)
      if (!userProfile || userProfile.role !== detectedRole) {
        console.log("Creating/updating profile with detected role:", detectedRole);
        
        const profileData = {
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
        
        try {
          // First check if profile exists
          const { data: existingProfile } = await supabase
            .from("profiles")
            .select("id, role")
            .eq("id", currentUser.id)
            .maybeSingle();
            
          if (existingProfile) {
            console.log("Updating existing profile with role:", detectedRole);
            
            // If role is different, show notification
            if (existingProfile.role !== detectedRole) {
              console.log(`⚠️ Role conflict: Changing from ${existingProfile.role} to ${detectedRole} (higher priority)`);
              toast({
                title: "Role correction",
                description: `Your role has been corrected from ${existingProfile.role} to ${detectedRole}.`
              });
            }
            
            // Update existing profile
            const { error: updateError } = await supabase
              .from("profiles")
              .update({
                role: detectedRole, // IMPORTANT: Always use detected role with higher priority
                email: currentUser.email || "",
                updated_at: new Date().toISOString()
              })
              .eq("id", currentUser.id);
              
            if (updateError) {
              console.error("Error updating profile:", updateError);
              throw updateError;
            } else {
              console.log("Profile successfully updated with role:", detectedRole);
            }
          } else {
            // Create new profile
            console.log("Creating new profile with role:", detectedRole);
            const { error: insertError } = await supabase
              .from("profiles")
              .insert(profileData);
              
            if (insertError) {
              console.error("Error creating profile:", insertError);
              throw insertError;
            } else {
              console.log("Profile successfully created with role:", detectedRole);
              toast({
                title: "Profile created",
                description: "Your profile has been successfully created."
              });
            }
          }
          
          // Set userProfile with our new data to ensure consistency
          userProfile = profileData;
        } catch (profileWriteError) {
          console.error("Error writing profile to database:", profileWriteError);
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
      
      console.log("Final detected role:", detectedRole);
      console.log("Final profile:", userProfile);
      
      // Also update user metadata if needed to ensure consistency
      if (detectedRole && (!currentUser.user_metadata?.role || currentUser.user_metadata.role !== detectedRole)) {
        try {
          const { data, error } = await supabase.auth.updateUser({
            data: { role: detectedRole }
          });
          
          if (error) {
            console.error("Error updating user metadata:", error);
          } else {
            console.log("User metadata updated with role:", detectedRole);
          }
        } catch (metadataError) {
          console.error("Error updating user metadata:", metadataError);
        }
      }
    } catch (error) {
      console.error("Error in role detection:", error);
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
