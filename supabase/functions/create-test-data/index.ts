
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
    // Initialize Supabase client with Service Role Key
    // This bypasses RLS policies
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Create test users first to ensure they exist
    console.log("Creating test users first");
    
    // Directly create test users without invoking edge function to avoid circular dependencies
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
    
    // Array to store results
    const userResults = [];
    
    // Process each user
    for (const user of testUsers) {
      try {
        console.log(`Processing user: ${user.email} with role ${user.role}`);
        
        // Check if user already exists
        const { data: existingUsers, error: searchError } = await supabase.auth
          .admin.listUsers({ filter: `email eq "${user.email}"` });
          
        if (searchError) {
          console.error(`Error searching for user ${user.email}:`, searchError);
          userResults.push({ 
            email: user.email, 
            status: "error", 
            message: `Error searching: ${searchError.message}` 
          });
          continue;
        }
          
        let userId;
        
        if (existingUsers && existingUsers.users.length > 0) {
          console.log(`User ${user.email} already exists, updating...`);
          
          // Use existing user ID
          userId = existingUsers.users[0].id;
          
          // Update the profile
          const { error: profileError } = await supabase
            .from("profiles")
            .update({ 
              role: user.role,
              first_name: user.first_name,
              last_name: user.last_name
            })
            .eq("id", userId);
            
          if (profileError) {
            console.error(`Error updating profile for ${user.email}:`, profileError);
            userResults.push({
              email: user.email,
              status: "warning",
              message: `User exists but profile update failed: ${profileError.message}`
            });
            continue;
          }
          
          userResults.push({ 
            email: user.email, 
            role: user.role, 
            status: "updated",
            id: userId
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
            userResults.push({ 
              email: user.email, 
              status: "error", 
              message: `Creation failed: ${error.message}` 
            });
            continue;
          }
          
          userId = data.user.id;
          
          // Update profile too
          const { error: profileError } = await supabase
            .from("profiles")
            .update({ 
              role: user.role,
              first_name: user.first_name,
              last_name: user.last_name
            })
            .eq("id", userId);
            
          if (profileError) {
            console.error(`Error updating profile for ${user.email}:`, profileError);
            userResults.push({
              email: user.email,
              status: "warning",
              message: `User created but profile failed: ${profileError.message}`
            });
            continue;
          }
          
          userResults.push({ 
            email: user.email, 
            role: user.role, 
            status: "created",
            id: userId
          });
        }
      } catch (error) {
        console.error(`Error processing user ${user.email}:`, error);
        userResults.push({ 
          email: user.email, 
          status: "error", 
          message: error.message 
        });
      }
    }
    
    console.log("User results:", userResults);
    
    // Find the test patient by email from our results
    const patientResult = userResults.find(user => user.email === "patient@example.com" && (user.status === "created" || user.status === "updated"));
    const doctorResult = userResults.find(user => user.email === "doctor@example.com" && (user.status === "created" || user.status === "updated"));
    
    if (!patientResult || !patientResult.id) {
      throw new Error("Failed to create or find test patient");
    }
    
    if (!doctorResult || !doctorResult.id) {
      throw new Error("Failed to create or find test doctor");
    }
    
    const patientId = patientResult.id;
    const doctorId = doctorResult.id;
    
    console.log(`Creating test data for patient ID: ${patientId} and doctor ID: ${doctorId}`);
    
    // Create test prescriptions with various statuses
    const { data: prescriptionData, error: prescriptionError } = await supabase
      .from("prescriptions")
      .insert([
        {
          patient_id: patientId,
          status: "in_review",
          symptoms: ["Schlaflosigkeit", "Schmerzen"]
        },
        {
          patient_id: patientId,
          doctor_id: doctorId,
          status: "approved",
          symptoms: ["Angstzustände", "Übelkeit"]
        },
        {
          patient_id: patientId,
          doctor_id: doctorId,
          status: "rejected",
          rejection_reason: "Unzureichende medizinische Begründung",
          symptoms: ["Kopfschmerzen"]
        }
      ])
      .select();
      
    if (prescriptionError) {
      console.error("Error creating test prescriptions:", prescriptionError);
      throw prescriptionError;
    }
    
    // Find the approved prescription for orders
    const approvedPrescription = prescriptionData.find(p => p.status === "approved");
    
    if (!approvedPrescription) {
      throw new Error("No approved prescription found.");
    }
    
    // Create test orders
    const { error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          patient_id: patientId,
          prescription_id: approvedPrescription.id,
          status: "pending",
          total_amount: 149.99,
          shipping_address: {
            street: "Musterstraße 123",
            postal_code: "10115",
            city: "Berlin",
            country: "Deutschland"
          }
        },
        {
          patient_id: patientId,
          prescription_id: approvedPrescription.id,
          status: "processing",
          total_amount: 99.95,
          shipping_address: {
            street: "Musterstraße 123",
            postal_code: "10115",
            city: "Berlin",
            country: "Deutschland"
          }
        },
        {
          patient_id: patientId,
          prescription_id: approvedPrescription.id,
          status: "shipped",
          total_amount: 79.90,
          shipping_address: {
            street: "Musterstraße 123",
            postal_code: "10115",
            city: "Berlin",
            country: "Deutschland"
          }
        }
      ]);
      
    if (orderError) {
      console.error("Error creating test orders:", orderError);
      throw orderError;
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "Test prescriptions and orders created successfully.",
        details: {
          prescriptions: prescriptionData.length,
          orders: 3
        }
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
    
  } catch (error) {
    console.error("Error creating test data:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "An error occurred while creating test data" 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
