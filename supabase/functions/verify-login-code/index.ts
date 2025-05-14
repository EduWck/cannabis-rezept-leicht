
import { serve } from "https://deno.land/std@0.188.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.23.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const { email, code } = await req.json();
    
    if (!email || !code) {
      return new Response(
        JSON.stringify({ error: "Email and code are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();
    
    // Initialize Supabase admin client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Check if code is valid
    const { data: authCode, error: fetchError } = await supabase
      .from("auth_codes")
      .select("*")
      .eq("email", normalizedEmail)
      .eq("code", code)
      .maybeSingle();
    
    if (fetchError || !authCode) {
      console.error("Invalid code or fetch error:", fetchError);
      return new Response(
        JSON.stringify({ error: "Invalid code" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Check if code is expired
    if (new Date(authCode.expires_at) < new Date()) {
      console.error("Code has expired");
      return new Response(
        JSON.stringify({ error: "Code has expired" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // CRITICAL: Determine user role based on email address - HIGHEST PRIORITY
    // This logic must match the role detection on the client side
    let userRole = 'patient'; // Default role
    
    if (normalizedEmail.includes('admin')) {
      userRole = 'admin';
      console.log(`Email contains 'admin', setting admin role for: ${normalizedEmail}`);
    } else if (normalizedEmail.includes('doctor') || normalizedEmail.includes('arzt')) {
      userRole = 'doctor';
      console.log(`Email contains 'doctor/arzt', setting doctor role for: ${normalizedEmail}`);
    } else if (normalizedEmail.includes('patient') || normalizedEmail.includes('patien')) {
      userRole = 'patient';
      console.log(`Email contains 'patient', setting patient role for: ${normalizedEmail}`);
    } else {
      console.log(`No role indicator in email, setting default patient role for: ${normalizedEmail}`);
    }
    
    console.log(`Determined role for ${normalizedEmail}: ${userRole}`);
    
    // Check if user exists
    const { data: existingUser, error: userError } = await supabase.auth
      .admin.listUsers({ filter: `email eq "${normalizedEmail}"` });
      
    if (userError) {
      console.error("Error checking for existing user:", userError);
      throw new Error(`Failed to check for existing user: ${userError.message}`);
    }
    
    let userData;
    let userId;
    
    if (!existingUser || existingUser.users.length === 0) {
      // User doesn't exist, create a new user
      console.log("User doesn't exist, creating new user with email:", normalizedEmail);
      
      // For doctor and admin, create with password for email/password login
      let createOptions = {
        email: normalizedEmail,
        email_confirm: true,
        user_metadata: { role: userRole }
      }; 
      
      // Add a password for admin/doctor accounts
      if (userRole === 'doctor' || userRole === 'admin') {
        createOptions = {
          ...createOptions,
          password: 'password' // Use a simple password for test accounts
        };
      }
      
      const { data: newUser, error: signUpError } = await supabase.auth.admin.createUser(createOptions);
      
      if (signUpError) {
        console.error("Failed to create new user:", signUpError);
        throw new Error(`Failed to create new user: ${signUpError.message}`);
      }
      
      userData = newUser;
      userId = newUser.user.id;
      
      console.log(`New user created with ID: ${userId}, role: ${userRole}`);
    } else {
      userData = existingUser.users[0];
      userId = userData.id;
      console.log(`Found existing user with ID: ${userId}`);
      
      // IMPORTANT: Always update user role based on email as highest priority
      // This ensures role consistency and gives email precedence
      try {
        console.log(`Updating user metadata for ${userId}, setting role to: ${userRole}`);
        const { data: updatedUser, error: updateError } = await supabase.auth.admin.updateUserById(userId, {
          user_metadata: { ...userData.user_metadata, role: userRole }
        });
        
        if (updateError) {
          console.error(`Error updating user metadata: ${updateError.message}`);
        } else {
          userData = updatedUser;
          console.log(`User ${userId} updated with role: ${userRole}`);
        }
      } catch (updateError) {
        console.error("Error updating user metadata:", updateError);
      }
      
      // For doctor and admin users, make sure they have a password set
      if (userRole === 'doctor' || userRole === 'admin') {
        try {
          const { error: passwordError } = await supabase.auth.admin.updateUserById(userId, {
            password: 'password' // Reset to a simple password for test accounts
          });
          
          if (passwordError) {
            console.error("Error setting password:", passwordError);
          } else {
            console.log("Password set for user");
          }
        } catch (passwordError) {
          console.error("Error setting password:", passwordError);
        }
      }
    }
    
    // Check if profile exists, create if not
    if (userId) {
      try {
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("id, role")
          .eq("id", userId)
          .maybeSingle();
          
        if (profileError) {
          console.error("Error checking profile:", profileError);
        }
          
        if (!profileData) {
          console.log("Profile doesn't exist, creating new profile for user:", userId);
          
          const { error: insertError } = await supabase
            .from("profiles")
            .insert({
              id: userId,
              email: normalizedEmail,
              role: userRole,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            });
            
          if (insertError) {
            console.error("Error creating profile:", insertError);
          } else {
            console.log("Profile successfully created with role:", userRole);
          }
        } else {
          // CRITICAL: Always update existing profile to ensure role is correct
          // ALWAYS force role based on email
          const { error: updateProfileError } = await supabase
            .from("profiles")
            .update({
              role: userRole, // Force role based on email
              updated_at: new Date().toISOString(),
            })
            .eq("id", userId);
            
          if (updateProfileError) {
            console.error("Error updating profile:", updateProfileError);
          } else {
            console.log("Profile successfully updated with role:", userRole);
          }
          
          // Log if there was a role conflict that we resolved
          if (profileData.role !== userRole) {
            console.log(`Role conflict resolved! Changed from ${profileData.role} to ${userRole} based on email.`);
          }
        }
      } catch (profileError) {
        console.error("Error handling profile:", profileError);
      }
    }

    // Delete the used code
    await supabase
      .from("auth_codes")
      .delete()
      .eq("email", normalizedEmail);
    
    console.log("Auth code deleted after successful verification");
    
    // Create a magic sign in link for the user
    // NEW: Customize redirect URL based on user role
    let redirectTo = `${new URL(req.url).origin}/login`;
    
    // For doctor role, directly redirect to dashboard 
    if (userRole === 'doctor') {
      redirectTo = `${new URL(req.url).origin}/dashboard`;
      console.log("DOCTOR ROLE DETECTED: Setting direct dashboard redirect");
    }
    
    const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
      type: "magiclink",
      email: normalizedEmail,
      options: {
        redirectTo: redirectTo,
        data: {
          role: userRole
        }
      }
    });
    
    if (linkError) {
      console.error("Error generating magic link:", linkError);
      return new Response(
        JSON.stringify({ error: linkError.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    console.log(`Magic link generated for email: ${normalizedEmail} with redirect to: ${redirectTo}`);
    
    // Return success with user data and magic link
    return new Response(
      JSON.stringify({ 
        success: true,
        email: normalizedEmail,
        role: userRole,
        user: userData,
        magicLink: linkData.properties.action_link,
        redirectUrl: redirectTo,
        message: "Code verification successful."
      }),
      { 
        status: 200, 
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json" 
        } 
      }
    );
    
  } catch (error) {
    console.error("Error verifying login code:", error);
    
    return new Response(
      JSON.stringify({ error: typeof error === 'object' ? error.message || "Failed to verify login code" : String(error) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
