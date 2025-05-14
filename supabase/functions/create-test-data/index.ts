
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
    // Initialisiere Supabase-Client mit Service-Role-Key
    // Damit umgehen wir die RLS-Richtlinien
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Finde den Test-Patienten und den Test-Arzt
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
    
    if (!patients || patients.length === 0) {
      throw new Error("Test patient not found. Please create test users first.");
    }
    
    const patientId = patients[0].id;
    
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
    
    // Erstellen von Testrezepten mit verschiedenen Status
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
          doctor_id: doctors?.[0]?.id || null,
          status: "approved",
          symptoms: ["Angstzustände", "Übelkeit"]
        },
        {
          patient_id: patientId,
          doctor_id: doctors?.[0]?.id || null,
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
    
    // Finden des genehmigten Rezepts für Bestellungen
    const approvedPrescription = prescriptionData.find(p => p.status === "approved");
    
    if (!approvedPrescription) {
      throw new Error("No approved prescription found.");
    }
    
    // Erstellen von Testbestellungen
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
