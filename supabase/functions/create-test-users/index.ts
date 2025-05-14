
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
        role: "patient",
        first_name: "Test",
        last_name: "Patient"
      },
      {
        email: "doctor@example.com",
        password: "password",
        role: "doctor",
        first_name: "Test",
        last_name: "Doctor"
      },
      {
        email: "admin@example.com",
        password: "password",
        role: "admin",
        first_name: "Test",
        last_name: "Admin"
      },
    ];
    
    const results = [];
    
    for (const user of testUsers) {
      try {
        console.log(`Processing user: ${user.email} with role ${user.role}`);
        
        // First delete any existing users with this email to ensure clean state
        const { data: existingUsers } = await supabase.auth
          .admin.listUsers({ filter: `email eq "${user.email}"` });
        
        if (existingUsers && existingUsers.users.length > 0) {
          for (const existingUser of existingUsers.users) {
            console.log(`Deleting existing user ${user.email} with ID: ${existingUser.id}`);
            await supabase.auth.admin.deleteUser(existingUser.id);
          }
        }
        
        // Create the user with password
        console.log(`Creating user: ${user.email} with role: ${user.role}`);
        const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
          email: user.email,
          password: user.password,
          email_confirm: true,
          user_metadata: { 
            role: user.role,
            first_name: user.first_name,
            last_name: user.last_name
          }
        });
        
        if (createError) {
          console.error(`Error creating user ${user.email}:`, createError);
          results.push({ 
            email: user.email, 
            status: "error", 
            message: `Creation failed: ${createError.message}` 
          });
          continue;
        }
        
        // Create profile if user creation was successful
        if (newUser.user) {
          // First check if profile already exists and delete it to ensure clean state
          await supabase
            .from("profiles")
            .delete()
            .eq("id", newUser.user.id);
          
          // Create new profile
          const profileData = {
            id: newUser.user.id,
            email: user.email,
            role: user.role, // IMPORTANT: Explicitly set the role here
            first_name: user.first_name,
            last_name: user.last_name,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            country: "Germany",
          };
          
          const { error: profileInsertError } = await supabase
            .from("profiles")
            .insert([profileData]);
            
          if (profileInsertError) {
            console.error(`Error creating profile for ${user.email}:`, profileInsertError);
            results.push({
              email: user.email,
              status: "warning",
              message: `User created but profile creation failed: ${profileInsertError.message}`,
              id: newUser.user.id
            });
            continue;
          }
          
          results.push({ 
            email: user.email, 
            role: user.role, 
            status: "created",
            id: newUser.user.id
          });
          
          console.log(`Successfully created user and profile for ${user.email} with role ${user.role}`);
        }
      } catch (error) {
        console.error(`Error processing user ${user.email}:`, error);
        results.push({ 
          email: user.email, 
          status: "error", 
          message: error.message 
        });
      }
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        results,
        message: "Test users have been created or updated successfully."
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
    
  } catch (error) {
    console.error("Error creating test users:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "An error occurred while creating test users" 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
