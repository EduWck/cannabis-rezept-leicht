
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
    
    // Find the test patient by email
    const { data: patients, error: patientError } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", "patient@example.com")
      .eq("role", "patient")
      .limit(1);
      
    if (patientError) {
      console.error("Error finding test patient:", patientError);
      throw patientError;
    }
    
    // If patient doesn't exist, create the test users first
    let patientId;
    
    if (!patients || patients.length === 0) {
      // Call the create-test-users function to ensure we have users
      console.log("Test patient not found, creating test users first");
      
      // Invoke the create-test-users function
      const { data: usersData, error: usersError } = await supabase.functions.invoke('create-test-users');
      
      if (usersError) {
        console.error("Error creating test users:", usersError);
        throw new Error(`Failed to create test users: ${usersError.message}`);
      }
      
      // Query again for the patient
      const { data: newPatients, error: newPatientError } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", "patient@example.com")
        .eq("role", "patient")
        .limit(1);
        
      if (newPatientError || !newPatients || newPatients.length === 0) {
        throw new Error("Failed to create and retrieve test patient");
      }
      
      patientId = newPatients[0].id;
    } else {
      patientId = patients[0].id;
    }
    
    // Find the test doctor
    const { data: doctors, error: doctorError } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", "doctor@example.com")
      .eq("role", "doctor")
      .limit(1);
    
    if (doctorError) {
      console.error("Error finding test doctor:", doctorError);
      throw doctorError;
    }
    
    if (!doctors || doctors.length === 0) {
      throw new Error("Test doctor not found. Please make sure test users were created successfully.");
    }
    
    const doctorId = doctors[0].id;
    
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
