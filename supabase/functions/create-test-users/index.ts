
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
        
        // Check if user already exists
        const { data: existingUsers, error: searchError } = await supabase.auth
          .admin.listUsers({ filter: `email eq "${user.email}"` });
          
        if (searchError) {
          console.error(`Error searching for user ${user.email}:`, searchError);
          results.push({ 
            email: user.email, 
            status: "error", 
            message: `Error searching: ${searchError.message}` 
          });
          continue;
        }
          
        if (existingUsers && existingUsers.users.length > 0) {
          console.log(`User ${user.email} already exists, updating...`);
          
          // Delete and recreate user for clean slate
          const existingId = existingUsers.users[0].id;
          console.log(`Deleting user ${user.email} with ID: ${existingId}`);
          
          // First delete the user
          const { error: deleteError } = await supabase.auth.admin.deleteUser(existingId);
          
          if (deleteError) {
            console.error(`Error deleting user ${user.email}:`, deleteError);
            results.push({ 
              email: user.email, 
              status: "error", 
              message: `Delete failed: ${deleteError.message}` 
            });
            continue;
          }
          
          // Then recreate the user with fresh credentials
          console.log(`Recreating user ${user.email}`);
          const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
            email: user.email,
            password: user.password,
            email_confirm: true,
            user_metadata: { role: user.role }
          });
          
          if (createError) {
            console.error(`Error recreating user ${user.email}:`, createError);
            results.push({ 
              email: user.email, 
              status: "error", 
              message: `Recreation failed: ${createError.message}` 
            });
            continue;
          }
          
          // Update profile
          if (newUser.user) {
            const { error: profileError } = await supabase
              .from("profiles")
              .update({ 
                role: user.role,
                first_name: user.first_name,
                last_name: user.last_name
              })
              .eq("id", newUser.user.id);
              
            if (profileError) {
              console.error(`Error updating profile for ${user.email}:`, profileError);
              results.push({
                email: user.email,
                status: "warning",
                message: `User recreated but profile failed: ${profileError.message}`
              });
              continue;
            }
          }
          
          results.push({ 
            email: user.email, 
            role: user.role, 
            status: "recreated" 
          });
        } else {
          console.log(`Creating new user: ${user.email}`);
          // Create new user
          const { data, error } = await supabase.auth.admin.createUser({
            email: user.email,
            password: user.password,
            email_confirm: true,
            user_metadata: { role: user.role }
          });
          
          if (error) {
            console.error(`Error creating user ${user.email}:`, error);
            results.push({ 
              email: user.email, 
              status: "error", 
              message: `Creation failed: ${error.message}` 
            });
            continue;
          }
          
          // Update profile too
          if (data.user) {
            const { error: profileError } = await supabase
              .from("profiles")
              .update({ 
                role: user.role,
                first_name: user.first_name,
                last_name: user.last_name
              })
              .eq("id", data.user.id);
              
            if (profileError) {
              console.error(`Error updating profile for ${user.email}:`, profileError);
              results.push({
                email: user.email,
                status: "warning",
                message: `User created but profile failed: ${profileError.message}`
              });
              continue;
            }
          }
          
          results.push({ 
            email: user.email, 
            role: user.role, 
            status: "created" 
          });
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
