
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
    
    // Initialize Supabase admin client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Check if code is valid
    const { data: authCode, error: fetchError } = await supabase
      .from("auth_codes")
      .select("*")
      .eq("email", email)
      .eq("code", code)
      .single();
    
    if (fetchError || !authCode) {
      return new Response(
        JSON.stringify({ error: "Invalid code" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Check if code is expired
    if (new Date(authCode.expires_at) < new Date()) {
      return new Response(
        JSON.stringify({ error: "Code has expired" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Explicit role assignment based on email address
    let userRole = 'patient';
    if (email.includes('doctor')) {
      userRole = 'doctor';
      console.log(`Setting doctor role for: ${email}`);
    } else if (email.includes('admin')) {
      userRole = 'admin';
      console.log(`Setting admin role for: ${email}`);
    } else {
      console.log(`Setting default patient role for: ${email}`);
    }
    
    console.log(`Determined role for ${email}: ${userRole}`);
    
    // Check if user exists
    let userData;
    const { data: existingUser, error: userError } = await supabase.auth
      .admin.listUsers({ filter: `email eq "${email}"` });
      
    if (userError || !existingUser || existingUser.users.length === 0) {
      // User doesn't exist, create a new user
      const { data: newUser, error: signUpError } = await supabase.auth.admin.createUser({
        email,
        email_confirm: true,
        user_metadata: { role: userRole }
      });
      
      if (signUpError) {
        throw new Error(`Failed to create new user: ${signUpError.message}`);
      }
      
      userData = newUser;
      
      console.log(`Created new user with ID: ${newUser.user.id}, role: ${userRole}`);
    } else {
      userData = existingUser.users[0];
      
      // Always update user metadata with the role to ensure it's set correctly
      const { data: updatedUser, error: updateError } = await supabase.auth.admin.updateUserById(userData.id, {
        user_metadata: { ...userData.user_metadata, role: userRole }
      });
      
      if (updateError) {
        console.error(`Failed to update user metadata: ${updateError.message}`);
      } else {
        userData = updatedUser;
        console.log(`Updated user ${userData.id} with role: ${userRole}`);
      }
    }

    // Create a sign-in link and get the session
    const { data: signInData, error: signInError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: email,
    });

    if (signInError) {
      throw new Error(`Failed to generate session: ${signInError.message}`);
    }

    // Delete the used code
    await supabase
      .from("auth_codes")
      .delete()
      .eq("email", email);
    
    return new Response(
      JSON.stringify({ 
        session: {
          access_token: signInData.properties.access_token,
          refresh_token: signInData.properties.refresh_token,
          expires_in: 3600,
          user: {
            ...userData,
            user_metadata: { 
              ...userData.user_metadata,
              role: userRole // Ensure role is explicitly set in the response
            }
          }
        }
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("Error verifying login code:", error);
    
    return new Response(
      JSON.stringify({ error: "Failed to verify login code" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
