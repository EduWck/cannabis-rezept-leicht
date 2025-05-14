
import { User } from "@supabase/supabase-js";
import { useState, useCallback } from "react";
import { UserRole, Profile } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export function useRoleDetection() {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  
  const detectUserRole = useCallback(async (currentUser: User, setProfile: (profile: Profile | null) => void, setIsLoading: (loading: boolean) => void) => {
    try {
      console.log("Detecting user role for:", currentUser.id);
      console.log("User metadata:", JSON.stringify(currentUser.user_metadata));
      
      let detectedRole: UserRole | null = null;
      let userProfile: Profile | null = null;
      
      // PRIORITÄT 1: E-Mail - zuverlässigste Methode für Testkonten
      const email = currentUser.email?.toLowerCase() || '';
      
      if (email.includes('admin')) {
        detectedRole = 'admin';
        console.log("⭐ HÖCHSTE PRIORITÄT: Rolle aus E-Mail erkannt: admin");
      } else if (email.includes('doctor') || email.includes('arzt')) {
        detectedRole = 'doctor';
        console.log("⭐ HÖCHSTE PRIORITÄT: Rolle aus E-Mail erkannt: doctor");
      } else if (email.includes('patient') || email.includes('patien')) {
        detectedRole = 'patient';
        console.log("⭐ HÖCHSTE PRIORITÄT: Rolle aus E-Mail erkannt: patient");
      }
      
      console.log("E-Mail-basierte Rollenerkennung: ", detectedRole);
      
      // PRIORITÄT 2: Benutzer-Metadaten prüfen
      if (!detectedRole && currentUser.user_metadata?.role) {
        detectedRole = currentUser.user_metadata.role as UserRole;
        console.log("Rolle aus Benutzer-Metadaten:", detectedRole);
      }
      
      // PRIORITÄT 3: Profil in Datenbank prüfen
      try {
        console.log("Hole Profil aus der Datenbank");
        
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", currentUser.id)
          .maybeSingle();

        if (error) {
          console.error("Fehler beim Abrufen des Profils aus der Datenbank:", error);
          throw error;
        }

        if (data) {
          console.log("Profil aus Datenbank gefunden:", data);
          userProfile = data as Profile;
          
          // Wenn wir noch keine Rolle haben, verwende die aus dem Profil
          if (!detectedRole && userProfile.role) {
            detectedRole = userProfile.role;
            console.log("Rolle aus Datenbank-Profil:", detectedRole);
          }
        } else {
          console.log("Kein Profil in der Datenbank gefunden, erstelle ein neues");
        }
      } catch (profileError) {
        console.error("Profil-Abruf fehlgeschlagen, verwende Serverless-Funktion:", profileError);
        
        try {
          console.log("Versuche, Profil über Serverless-Funktion abzurufen");
          const response = await supabase.functions.invoke('get-profile', {
            body: { user_id: currentUser.id }
          });
          
          if (response.error) {
            throw new Error(response.error.message);
          }
          
          if (response.data) {
            console.log("Profil über Funktion abgerufen:", response.data);
            userProfile = response.data as Profile;
            
            if (!detectedRole && userProfile.role) {
              detectedRole = userProfile.role;
              console.log("Rolle aus Profil über Funktion:", detectedRole);
            }
          }
        } catch (functionError) {
          console.error("Funktionsabruf für Profil fehlgeschlagen:", functionError);
        }
      }
      
      // Wenn wir immer noch keine Rolle haben, verwende E-Mail als endgültigen Fallback
      if (!detectedRole) {
        if (email.includes('admin')) {
          detectedRole = 'admin';
        } else if (email.includes('doctor') || email.includes('arzt')) {
          detectedRole = 'doctor';
        } else if (email.includes('patient') || email.includes('patien')) {
          detectedRole = 'patient';
        } else {
          detectedRole = 'patient'; // Default-Fallback
        }
        
        console.log("Verwende E-Mail-basierten Fallback für Rolle:", detectedRole);
        
        toast({
          title: "Rolle basierend auf E-Mail festgelegt",
          description: `Sie wurden als ${detectedRole} eingestuft.`
        });
      }
      
      // Profil in der Datenbank erstellen/aktualisieren mit korrekter Rolle
      // KRITISCH: Wenn die erkannte Rolle und die Profilrolle nicht übereinstimmen,
      // IMMER die erkannte Rolle verwenden, die höhere Priorität hat (basierend auf E-Mail)
      if (!userProfile || userProfile.role !== detectedRole) {
        console.log("Erstelle/aktualisiere Profil mit erkannter Rolle:", detectedRole);
        
        const profileData = {
          id: currentUser.id,
          email: currentUser.email || "",
          role: detectedRole,
          first_name: currentUser.user_metadata?.first_name as string || null,
          last_name: currentUser.user_metadata?.last_name as string || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          date_of_birth: null,
          phone: null,
          street_address: null,
          postal_code: null,
          city: null,
          country: "Germany",
        };
        
        try {
          // Zuerst prüfen, ob Profil existiert
          const { data: existingProfile } = await supabase
            .from("profiles")
            .select("id, role")
            .eq("id", currentUser.id)
            .maybeSingle();
            
          if (existingProfile) {
            console.log("Aktualisiere bestehendes Profil mit Rolle:", detectedRole);
            
            // Wenn die Rolle unterschiedlich ist, Benachrichtigung anzeigen
            if (existingProfile.role !== detectedRole) {
              console.log(`⚠️ Rollenkonflikt: Ändere von ${existingProfile.role} zu ${detectedRole} (höhere Priorität)`);
              toast({
                title: "Rollenkorrektur",
                description: `Ihre Rolle wurde von ${existingProfile.role} zu ${detectedRole} korrigiert.`
              });
            }
            
            // Bestehendes Profil aktualisieren
            const { error: updateError } = await supabase
              .from("profiles")
              .update({
                role: detectedRole, // WICHTIG: Immer die erkannte Rolle mit höherer Priorität verwenden
                email: currentUser.email || "",
                updated_at: new Date().toISOString()
              })
              .eq("id", currentUser.id);
              
            if (updateError) {
              console.error("Fehler beim Aktualisieren des Profils:", updateError);
              throw updateError;
            } else {
              console.log("Profil erfolgreich mit Rolle aktualisiert:", detectedRole);
            }
          } else {
            // Neues Profil erstellen
            console.log("Erstelle neues Profil mit Rolle:", detectedRole);
            const { error: insertError } = await supabase
              .from("profiles")
              .insert(profileData);
              
            if (insertError) {
              console.error("Fehler beim Erstellen des Profils:", insertError);
              throw insertError;
            } else {
              console.log("Profil erfolgreich mit Rolle erstellt:", detectedRole);
              toast({
                title: "Profil erstellt",
                description: "Ihr Profil wurde erfolgreich erstellt."
              });
            }
          }
          
          // UserProfile mit unseren neuen Daten setzen, um Konsistenz zu gewährleisten
          userProfile = profileData;
        } catch (profileWriteError) {
          console.error("Fehler beim Schreiben des Profils in die Datenbank:", profileWriteError);
          toast({
            title: "Fehler beim Aktualisieren",
            description: "Ihr Profil konnte nicht aktualisiert werden.",
            variant: "destructive"
          });
        }
      }
      
      // Zustand mit unseren Erkenntnissen aktualisieren
      setUserRole(detectedRole);
      setProfile(userProfile);
      
      console.log("Endgültige erkannte Rolle:", detectedRole);
      console.log("Endgültiges Profil:", userProfile);
      
      // Auch Benutzer-Metadaten aktualisieren, wenn nötig, um Konsistenz zu gewährleisten
      if (detectedRole && (!currentUser.user_metadata?.role || currentUser.user_metadata.role !== detectedRole)) {
        try {
          const { data, error } = await supabase.auth.updateUser({
            data: { role: detectedRole }
          });
          
          if (error) {
            console.error("Fehler beim Aktualisieren der Benutzer-Metadaten:", error);
          } else {
            console.log("Benutzer-Metadaten mit Rolle aktualisiert:", detectedRole);
          }
        } catch (metadataError) {
          console.error("Fehler beim Aktualisieren der Benutzer-Metadaten:", metadataError);
        }
      }
    } catch (error) {
      console.error("Fehler bei der Rollenerkennung:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    userRole,
    setUserRole,
    detectUserRole
  };
}
