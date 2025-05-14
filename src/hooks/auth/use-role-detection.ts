
import { User } from "@supabase/supabase-js";
import { useState } from "react";
import { UserRole, Profile } from "@/types";
import { supabase } from "@/integrations/supabase/client";

export function useRoleDetection() {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  
  const detectUserRole = async (currentUser: User, setProfile: (profile: Profile | null) => void, setIsLoading: (loading: boolean) => void) => {
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
          .maybeSingle();

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
        } else {
          console.log("No profile found in database, will create minimal profile");
        }
      } catch (profileError) {
        console.error("Profile fetch failed, falling back to serverless function:", profileError);
        
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
        
        // Try to create the profile if it doesn't exist
        try {
          console.log("Attempting to create profile in database");
          const { error } = await supabase
            .from("profiles")
            .insert(userProfile);
            
          if (error) {
            // If insert fails due to duplicate, try update
            if (error.code === "23505") { // duplicate key value violates unique constraint
              console.log("Profile already exists, updating instead");
              const { error: updateError } = await supabase
                .from("profiles")
                .update({
                  role: detectedRole,
                  email: currentUser.email || "",
                  updated_at: new Date().toISOString()
                })
                .eq("id", currentUser.id);
                
              if (updateError) {
                console.error("Error updating profile:", updateError);
              } else {
                console.log("Profile updated successfully");
              }
            } else {
              console.error("Error creating profile:", error);
            }
          } else {
            console.log("Profile created successfully");
          }
        } catch (createError) {
          console.error("Error creating profile:", createError);
        }
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
    } finally {
      setIsLoading(false);
    }
  };

  return {
    userRole,
    setUserRole,
    detectUserRole
  };
}
