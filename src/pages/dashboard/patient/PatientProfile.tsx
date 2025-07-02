import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Profile } from "@/types";
import { toast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";

const PatientProfile = () => {
  const { user, profile: authProfile } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFullProfile = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
          
        if (error) throw error;
        
        if (data) {
          setProfile(data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast({
          title: "Fehler",
          description: "Profildaten konnten nicht geladen werden.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    // If we already have a basic profile from auth context, use it first
    if (authProfile) {
      setProfile(authProfile);
    }
    
    fetchFullProfile();
  }, [user, authProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profile || !user) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: profile.first_name,
          last_name: profile.last_name,
          date_of_birth: profile.date_of_birth,
          phone: profile.phone,
          street_address: profile.street_address,
          postal_code: profile.postal_code,
          city: profile.city,
          country: profile.country,
        })
        .eq("id", user.id);

      if (error) throw error;
      
      toast({
        title: "Profil aktualisiert",
        description: "Ihre Daten wurden erfolgreich gespeichert."
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Fehler",
        description: "Profil konnte nicht aktualisiert werden.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-cannabis-green-500" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold">Mein Profil</h1>
      
      <form onSubmit={handleProfileUpdate}>
        <Card>
          <CardHeader>
            <CardTitle>Persönliche Informationen</CardTitle>
            <CardDescription>
              Bearbeiten Sie Ihre persönlichen Daten für Rezepte und Bestellungen
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first_name">Vorname</Label>
                <Input
                  id="first_name"
                  name="first_name"
                  value={profile?.first_name || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Nachname</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  value={profile?.last_name || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date_of_birth">Geburtsdatum</Label>
                <Input
                  id="date_of_birth"
                  name="date_of_birth"
                  type="date"
                  value={profile?.date_of_birth || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefonnummer</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={profile?.phone || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-Mail-Adresse</Label>
              <Input
                id="email"
                name="email"
                value={profile?.email || ""}
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">Die E-Mail-Adresse kann nicht geändert werden.</p>
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <Label htmlFor="street_address">Straße und Hausnummer</Label>
              <Input
                id="street_address"
                name="street_address"
                value={profile?.street_address || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="postal_code">Postleitzahl</Label>
                <Input
                  id="postal_code"
                  name="postal_code"
                  value={profile?.postal_code || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="city">Stadt</Label>
                <Input
                  id="city"
                  name="city"
                  value={profile?.city || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Land</Label>
              <Input
                id="country"
                name="country"
                value={profile?.country || "Deutschland"}
                onChange={handleInputChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Speichern...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" /> Profil speichern
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default PatientProfile;
