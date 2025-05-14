
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
    // Initialize Supabase admin client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const testUsers = [
      {
        email: "patient@example.com",
        password: "password",
        role: "patient",
        first_name: "Max",
        last_name: "Mustermann"
      },
      {
        email: "doctor@example.com",
        password: "password",
        role: "doctor",
        first_name: "Dr. Hans",
        last_name: "Weber"
      },
      {
        email: "admin@example.com",
        password: "password",
        role: "admin",
        first_name: "Admin",
        last_name: "User"
      }
    ];

    const results = [];

    // Create each test user
    for (const user of testUsers) {
      try {
        // Check if user already exists
        const { data: existingUser } = await supabase
          .from("profiles")
          .select("email")
          .eq("email", user.email)
          .single();

        if (existingUser) {
          results.push({ email: user.email, status: "already exists" });
          continue;
        }

        // Create the user
        const { data: userData, error: userError } = await supabase.auth.admin.createUser({
          email: user.email,
          password: user.password,
          email_confirm: true,
          user_metadata: { role: user.role }
        });

        if (userError) {
          results.push({ email: user.email, status: "error", message: userError.message });
          continue;
        }

        // Update profile with role and other information
        await supabase
          .from("profiles")
          .update({
            role: user.role,
            first_name: user.first_name,
            last_name: user.last_name
          })
          .eq("id", userData.user.id);

        results.push({ email: user.email, status: "created", id: userData.user.id });

        // Add mock data for patients
        if (user.role === "patient") {
          // Create a test prescription
          const { data: prescription } = await supabase
            .from("prescriptions")
            .insert({
              patient_id: userData.user.id,
              symptoms: ["Chronische Schmerzen", "Schlafstörungen"],
              questionnaire_data: {
                pain_level: "Mittel bis stark",
                previous_treatments: ["Konventionelle Schmerzmittel", "Physiotherapie"],
                medical_history: "Keine relevanten Vorerkrankungen"
              },
              status: "approved"
            })
            .select()
            .single();

          // Create a test order
          if (prescription) {
            await supabase
              .from("orders")
              .insert({
                patient_id: userData.user.id,
                prescription_id: prescription.id,
                status: "delivered",
                total_amount: 59.90,
                shipping_address: {
                  first_name: user.first_name,
                  last_name: user.last_name,
                  street_address: "Musterstraße 123",
                  postal_code: "12345",
                  city: "Berlin",
                  country: "Deutschland"
                },
                invoice_url: "https://example.com/dummy-invoice.pdf"
              });
          }
        }

        // Assign prescriptions to the doctor
        if (user.role === "doctor") {
          // Find patients
          const { data: patients } = await supabase
            .from("profiles")
            .select("id")
            .eq("role", "patient");

          if (patients && patients.length > 0) {
            // Create pending prescription requests for the doctor
            await supabase
              .from("prescriptions")
              .insert([
                {
                  patient_id: patients[0].id,
                  doctor_id: userData.user.id,
                  symptoms: ["Migräne", "Übelkeit"],
                  status: "in_review"
                }
              ]);
          }
        }

      } catch (error) {
        results.push({ email: user.email, status: "error", message: error.message });
      }
    }

    return new Response(
      JSON.stringify({
        message: "Test users setup completed",
        results
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating test users:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || "Failed to create test users" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
