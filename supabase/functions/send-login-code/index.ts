
import { serve } from "https://deno.land/std@0.188.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.23.0";
import { SmtpClient } from "https://deno.land/x/smtp/mod.ts";

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
    
    // Delete any existing codes for this email
    await supabase
      .from("auth_codes")
      .delete()
      .eq("email", email);
    
    // Insert the new code
    const { error: insertError } = await supabase
      .from("auth_codes")
      .insert({
        email,
        code,
        expires_at: expiresAt.toISOString(),
      });

    if (insertError) {
      console.error("Error inserting auth code:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to create login code" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Send login code via email
    const client = new SmtpClient();
    await client.connectTLS({
      hostname: Deno.env.get("SMTP_HOST") ?? "localhost",
      port: Number(Deno.env.get("SMTP_PORT") ?? "25"),
      username: Deno.env.get("SMTP_USERNAME") ?? "",
      password: Deno.env.get("SMTP_PASSWORD") ?? "",
    });

    await client.send({
      from: Deno.env.get("SMTP_FROM") ?? "no-reply@example.com",
      to: email,
      subject: "Your login code",
      content: `Your login code is ${code}`,
    });

    await client.close();

    return new Response(
      JSON.stringify({
        message: "Login code sent successfully",
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("Error sending login code:", error);
    
    return new Response(
      JSON.stringify({ error: typeof error === 'object' && error.message ? error.message : "Failed to send login code" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
