
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
    const { email, password, first_name, last_name, role } = await req.json();
    
    // Validate input
    if (!email || !password || !role || !(role === 'doctor' || role === 'admin')) {
      return new Response(
        JSON.stringify({ error: "Invalid input parameters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Initialize Supabase admin client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Create user
    const { data: userData, error: userError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { role }
    });
    
    if (userError) {
      throw new Error(`Failed to create user: ${userError.message}`);
    }
    
    // Update the profile with role and other information
    const { error: profileError } = await supabase
      .from("profiles")
      .update({ 
        role,
        first_name,
        last_name
      })
      .eq("id", userData.user.id);
    
    if (profileError) {
      throw new Error(`Failed to update profile: ${profileError.message}`);
    }
    
    return new Response(
      JSON.stringify({ 
        message: "Staff user created successfully", 
        user_id: userData.user.id 
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating staff user:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || "Failed to create staff user" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
