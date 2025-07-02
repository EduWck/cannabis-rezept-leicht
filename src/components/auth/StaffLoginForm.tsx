
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface StaffLoginFormProps {
  signIn: (email: string, password: string) => Promise<boolean>;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const StaffLoginForm = ({ signIn, loading, setLoading }: StaffLoginFormProps) => {
  const [staffEmail, setStaffEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleStaffLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!staffEmail) {
      setError("Bitte geben Sie eine E-Mail-Adresse ein.");
      toast({
        title: "Fehlende Angaben",
        description: "Bitte geben Sie eine E-Mail-Adresse ein."
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Normalize email to ensure we handle demo accounts properly
      let normalizedEmail = staffEmail.trim().toLowerCase();
      
      // Auto-format known test accounts
      if (normalizedEmail === "doctor" || normalizedEmail === "arzt") {
        normalizedEmail = "doctor@example.com";
        console.log("Doctor account detected, normalized to:", normalizedEmail);
      } else if (normalizedEmail === "admin") {
        normalizedEmail = "admin@example.com";
      }
      
      // Auto-add domain for simplified input
      if (!normalizedEmail.includes('@')) {
        normalizedEmail = `${normalizedEmail}@example.com`;
      }
      
      console.log("Attempting staff login with:", normalizedEmail);
      
      // For test accounts, use the default password if none provided
      const finalPassword = password || "password";
      
      const success = await signIn(normalizedEmail, finalPassword);
      
      if (!success) {
        setError("Login fehlgeschlagen. Bitte überprüfen Sie Ihre Anmeldedaten.");
        toast({
          title: "Login fehlgeschlagen",
          description: "Ungültige Anmeldedaten. Bitte überprüfen Sie die E-Mail und das Passwort.",
          variant: "destructive"
        });
      } else {
        // Success notification
        toast({
          title: "Login erfolgreich",
          description: `Sie werden als ${normalizedEmail.includes('doctor') ? 'Arzt' : 
                                         normalizedEmail.includes('admin') ? 'Administrator' : 'Mitarbeiter'} weitergeleitet...`
        });
        
        // Force full page reload if it's a doctor account to ensure proper role detection
        if (normalizedEmail.includes('doctor')) {
          console.log("Doctor login successful, adding extra redirect notification");
          
          // Multiple notifications to ensure the user knows we're working on it
          toast({
            title: "Arzt-Login",
            description: "Arzt-Rolle wird erkannt..."
          });
          
          setTimeout(() => {
            toast({
              title: "Arzt-Weiterleitung",
              description: "Sie werden zum Arzt-Dashboard weitergeleitet..."
            });
          }, 800);
          
          setTimeout(() => {
            toast({
              title: "Fast geschafft",
              description: "Bitte warten Sie, während wir die Weiterleitung abschließen..."
            });
          }, 1600);
        }
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.message || "Ungültige Anmeldedaten");
      toast({
        title: "Login fehlgeschlagen",
        description: error.message || "Ungültige Anmeldedaten",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mitarbeiter-Login</CardTitle>
        <CardDescription>
          Für Ärzte und Administrator-Accounts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleStaffLogin}>
          <div className="grid gap-4">
            {error && (
              <div className="bg-destructive/15 text-destructive p-3 rounded-md text-sm">
                {error}
              </div>
            )}
            <div className="grid gap-2">
              <Input
                type="text" /* Changed from email to text to allow simplified inputs */
                placeholder="E-Mail-Adresse oder Benutzername"
                value={staffEmail}
                onChange={(e) => setStaffEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Input
                type="password"
                placeholder="Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="text-sm text-muted-foreground">
                Für Test-Accounts: Passwort ist "password"
              </div>
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Anmelden
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Nur für autorisierte Mitarbeiter.
        </p>
      </CardFooter>
    </Card>
  );
};
