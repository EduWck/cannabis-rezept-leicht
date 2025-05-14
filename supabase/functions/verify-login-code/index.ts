
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
    const { email, code } = await req.json();
    
    if (!email || !code) {
      return new Response(
        JSON.stringify({ error: "Email and code are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();
    
    // Initialize Supabase admin client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Check if code is valid
    const { data: authCode, error: fetchError } = await supabase
      .from("auth_codes")
      .select("*")
      .eq("email", normalizedEmail)
      .eq("code", code)
      .maybeSingle();
    
    if (fetchError || !authCode) {
      console.error("Invalid code or fetch error:", fetchError);
      return new Response(
        JSON.stringify({ error: "Invalid code" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Check if code is expired
    if (new Date(authCode.expires_at) < new Date()) {
      console.error("Code has expired");
      return new Response(
        JSON.stringify({ error: "Code has expired" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // KRITISCH: Bestimme die Benutzerrolle basierend auf der E-Mail-Adresse - HÖCHSTE PRIORITÄT
    // Diese Logik muss mit der Rollenerkennung auf der Client-Seite übereinstimmen
    let userRole = 'patient'; // Default role
    
    if (normalizedEmail.includes('admin')) {
      userRole = 'admin';
      console.log(`E-Mail enthält 'admin', setze Admin-Rolle für: ${normalizedEmail}`);
    } else if (normalizedEmail.includes('doctor') || normalizedEmail.includes('arzt')) {
      userRole = 'doctor';
      console.log(`E-Mail enthält 'doctor/arzt', setze Arzt-Rolle für: ${normalizedEmail}`);
    } else if (normalizedEmail.includes('patient') || normalizedEmail.includes('patien')) {
      userRole = 'patient';
      console.log(`E-Mail enthält 'patient', setze Patient-Rolle für: ${normalizedEmail}`);
    } else {
      console.log(`Kein Rollenindikator in E-Mail, setze Standard-Patientenrolle für: ${normalizedEmail}`);
    }
    
    console.log(`Bestimmte Rolle für ${normalizedEmail}: ${userRole}`);
    
    // Check if user exists
    const { data: existingUser, error: userError } = await supabase.auth
      .admin.listUsers({ filter: `email eq "${normalizedEmail}"` });
      
    if (userError) {
      console.error("Error checking for existing user:", userError);
      throw new Error(`Failed to check for existing user: ${userError.message}`);
    }
    
    let userData;
    let userId;
    
    if (!existingUser || existingUser.users.length === 0) {
      // User doesn't exist, create a new user
      console.log("Benutzer existiert nicht, erstelle neuen Benutzer mit E-Mail:", normalizedEmail);
      
      // For doctor and admin, create with password for email/password login
      let createOptions = {
        email: normalizedEmail,
        email_confirm: true,
        user_metadata: { role: userRole }
      }; 
      
      // Add a password for admin/doctor accounts
      if (userRole === 'doctor' || userRole === 'admin') {
        createOptions = {
          ...createOptions,
          password: 'password' // Use a simple password for test accounts
        };
      }
      
      const { data: newUser, error: signUpError } = await supabase.auth.admin.createUser(createOptions);
      
      if (signUpError) {
        console.error("Failed to create new user:", signUpError);
        throw new Error(`Failed to create new user: ${signUpError.message}`);
      }
      
      userData = newUser;
      userId = newUser.user.id;
      
      console.log(`Neuer Benutzer erstellt mit ID: ${userId}, Rolle: ${userRole}`);
    } else {
      userData = existingUser.users[0];
      userId = userData.id;
      console.log(`Bestehenden Benutzer gefunden mit ID: ${userId}`);
      
      // WICHTIG: Immer die Benutzerrolle aktualisieren, basierend auf der E-Mail als höchste Priorität
      // Dies stellt sicher, dass die Rolle konsistent ist und die E-Mail Vorrang hat
      try {
        console.log(`Aktualisiere Benutzermetadaten für ${userId}, setze Rolle auf: ${userRole}`);
        const { data: updatedUser, error: updateError } = await supabase.auth.admin.updateUserById(userId, {
          user_metadata: { ...userData.user_metadata, role: userRole }
        });
        
        if (updateError) {
          console.error(`Fehler beim Aktualisieren der Benutzermetadaten: ${updateError.message}`);
        } else {
          userData = updatedUser;
          console.log(`Benutzer ${userId} mit Rolle aktualisiert: ${userRole}`);
        }
      } catch (updateError) {
        console.error("Fehler beim Aktualisieren der Benutzermetadaten:", updateError);
      }
      
      // For doctor and admin users, make sure they have a password set
      if (userRole === 'doctor' || userRole === 'admin') {
        try {
          const { error: passwordError } = await supabase.auth.admin.updateUserById(userId, {
            password: 'password' // Reset to a simple password for test accounts
          });
          
          if (passwordError) {
            console.error("Fehler beim Setzen des Passworts:", passwordError);
          } else {
            console.log("Passwort für Benutzer gesetzt");
          }
        } catch (passwordError) {
          console.error("Fehler beim Setzen des Passworts:", passwordError);
        }
      }
    }
    
    // Check if profile exists, create if not
    if (userId) {
      try {
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("id, role")
          .eq("id", userId)
          .maybeSingle();
          
        if (profileError) {
          console.error("Error checking profile:", profileError);
        }
          
        if (!profileData) {
          console.log("Profil existiert nicht, erstelle neues Profil für Benutzer:", userId);
          
          const { error: insertError } = await supabase
            .from("profiles")
            .insert({
              id: userId,
              email: normalizedEmail,
              role: userRole,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            });
            
          if (insertError) {
            console.error("Error creating profile:", insertError);
          } else {
            console.log("Profil erfolgreich mit Rolle erstellt:", userRole);
          }
        } else {
          // KRITISCH: Bestehendes Profil IMMER aktualisieren, um sicherzustellen, dass die Rolle korrekt ist
          // IMMER die Rolle auf Basis der E-Mail aktualisieren
          const { error: updateProfileError } = await supabase
            .from("profiles")
            .update({
              role: userRole, // Erzwinge die Rolle basierend auf der E-Mail
              updated_at: new Date().toISOString(),
            })
            .eq("id", userId);
            
          if (updateProfileError) {
            console.error("Error updating profile:", updateProfileError);
          } else {
            console.log("Profil erfolgreich mit Rolle aktualisiert:", userRole);
          }
          
          // Protokolliere, wenn es einen Rollenkonflikt gab, den wir behoben haben
          if (profileData.role !== userRole) {
            console.log(`Rollenkonflikt behoben! Von ${profileData.role} zu ${userRole} basierend auf E-Mail geändert.`);
          }
        }
      } catch (profileError) {
        console.error("Error handling profile:", profileError);
      }
    }

    // Delete the used code
    await supabase
      .from("auth_codes")
      .delete()
      .eq("email", normalizedEmail);
    
    console.log("Auth-Code nach erfolgreicher Verifizierung gelöscht");
    
    // Create a magic sign in link for the user
    const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
      type: "magiclink",
      email: normalizedEmail,
      options: {
        redirectTo: `${new URL(req.url).origin}/login`,
        data: {
          role: userRole
        }
      }
    });
    
    if (linkError) {
      console.error("Error generating magic link:", linkError);
      return new Response(
        JSON.stringify({ error: linkError.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    console.log("Magic-Link generiert für E-Mail:", normalizedEmail);
    
    // Return success with user data and magic link
    return new Response(
      JSON.stringify({ 
        success: true,
        email: normalizedEmail,
        role: userRole,
        user: userData,
        magicLink: linkData.properties.action_link,
        message: "Code verification successful."
      }),
      { 
        status: 200, 
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json" 
        } 
      }
    );
    
  } catch (error) {
    console.error("Error verifying login code:", error);
    
    return new Response(
      JSON.stringify({ error: typeof error === 'object' ? error.message || "Failed to verify login code" : String(error) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
