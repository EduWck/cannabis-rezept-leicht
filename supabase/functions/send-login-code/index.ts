
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
    const { email } = await req.json();
    
    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15); // Code valid for 15 minutes
    
    // Store the code
    const { data: existingUser, error: fetchError } = await supabase
      .from("profiles")
      .select("email")
      .eq("email", email)
      .single();
    
    if (fetchError && fetchError.code !== "PGRST116") {
      throw new Error("Failed to check user existence");
    }
    
    // If user doesn't exist, we'll still send a code but it won't be usable
    // This prevents user enumeration attacks
    
    // Delete any existing codes for this email
    await supabase
      .from("auth_codes")
      .delete()
      .eq("email", email);
    
    // Insert the new code
    await supabase
      .from("auth_codes")
      .insert({
        email,
        code,
        expires_at: expiresAt.toISOString(),
      });
    
    // In a real app, you would send an actual email here
    // For now, we'll just log the code
    console.log(`Login code for ${email}: ${code}`);
    
    // For demo purposes, we'll return the code in the response
    // In production, you would never do this!
    return new Response(
      JSON.stringify({ 
        message: "Login code sent successfully", 
        code: code // Only for testing! Remove in production
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("Error sending login code:", error);
    
    return new Response(
      JSON.stringify({ error: "Failed to send login code" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
