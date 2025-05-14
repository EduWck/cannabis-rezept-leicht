
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
    // Initialize Supabase client with service role key
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Create test users
    const testUsers = [
      {
        email: "patient@example.com",
        password: "password",
        user_metadata: { role: "patient" },
      },
      {
        email: "doctor@example.com",
        password: "password",
        user_metadata: { role: "doctor" },
      },
      {
        email: "admin@example.com",
        password: "password",
        user_metadata: { role: "admin" },
      },
    ];
    
    const createdUsers = [];
    
    for (const user of testUsers) {
      try {
        // Check if user already exists
        const { data: existingUsers } = await supabase.auth
          .admin.listUsers({ filter: `email eq "${user.email}"` });
          
        if (existingUsers && existingUsers.users.length > 0) {
          // User already exists, update their metadata
          const { data, error } = await supabase.auth.admin.updateUserById(
            existingUsers.users[0].id,
            {
              user_metadata: user.user_metadata,
              password: user.password,
              email_confirm: true
            }
          );
          
          if (error) throw error;
          createdUsers.push({ email: user.email, role: user.user_metadata.role, status: "updated" });
        } else {
          // Create new user
          const { data, error } = await supabase.auth.admin.createUser({
            email: user.email,
            password: user.password,
            user_metadata: user.user_metadata,
            email_confirm: true
          });
          
          if (error) throw error;
          createdUsers.push({ email: user.email, role: user.user_metadata.role, status: "created" });
        }
      } catch (error) {
        console.error(`Error processing user ${user.email}:`, error);
      }
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        users: createdUsers,
        message: "Test users have been created or updated successfully."
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("Error creating test users:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "An error occurred while creating test users" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
