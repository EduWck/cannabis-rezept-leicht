
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
    
    // Check if user exists
    const { data: user, error: userError } = await supabase.auth
      .admin.getUserByEmail(email);
      
    if (userError || !user) {
      // User doesn't exist, create a new user
      const { data: newUser, error: signUpError } = await supabase.auth.admin.createUser({
        email,
        email_confirm: true,
        user_metadata: { role: "patient" }
      });
      
      if (signUpError) {
        throw new Error(`Failed to create new user: ${signUpError.message}`);
      }
      
      // Get the newly created user
      const { data: createdUser, error: retrieveError } = await supabase.auth
        .admin.getUserByEmail(email);
        
      if (retrieveError || !createdUser) {
        throw new Error("Failed to retrieve newly created user");
      }
      
      user = createdUser;
    }
    
    // Create a new JWT token for the user
    const { data: sessionData, error: tokenError } = await supabase.auth
      .admin.generateLink({
        type: 'magiclink',
        email: email,
      });
    
    if (tokenError) {
      throw new Error(`Failed to generate session: ${tokenError.message}`);
    }
    
    // Delete the used code
    await supabase
      .from("auth_codes")
      .delete()
      .eq("email", email);
    
    return new Response(
      JSON.stringify({ 
        session: {
          access_token: sessionData.properties.token,
          refresh_token: null,
          expires_in: 3600,
          user: user
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
