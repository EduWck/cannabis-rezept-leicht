
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface PatientLoginFormProps {
  requestLoginCode: (email: string) => Promise<{ success: boolean; code?: string }>;
  verifyLoginCode: (email: string, code: string) => Promise<boolean>;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const COOLDOWN_TIME = 60; // 60 seconds cooldown

export const PatientLoginForm = ({ 
  requestLoginCode, 
  verifyLoginCode,
  loading, 
  setLoading 
}: PatientLoginFormProps) => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [verificationAttempted, setVerificationAttempted] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  // Cooldown timer effect
  useEffect(() => {
    let interval: number | undefined;
    if (cooldown > 0) {
      interval = window.setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [cooldown]);
  
  // Effect to show status message after verification
  useEffect(() => {
    if (verificationSuccess) {
      const timer = setTimeout(() => {
        if (document.location.pathname === '/login') {
          toast({
            title: "Anmeldung...",
            description: "Sie werden automatisch weitergeleitet sobald die Anmeldung abgeschlossen ist."
          });
        }
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [verificationSuccess]);

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cooldown > 0) {
      toast({
        title: "Bitte warten",
        description: `Sie können in ${cooldown} Sekunden einen neuen Code anfordern.`
      });
      return;
    }
    
    if (!email || !email.trim()) {
      toast({
        title: "E-Mail erforderlich",
        description: "Bitte geben Sie eine E-Mail-Adresse ein."
      });
      return;
    }
    
    // Normalize email to ensure demo accounts work properly
    let normalizedEmail = email.trim().toLowerCase();
    
    // Auto-format known test accounts
    if (normalizedEmail === "patient" || normalizedEmail === "patien") {
      normalizedEmail = "patient@example.com";
    }
    
    // Auto-add domain for simplified input
    if (!normalizedEmail.includes('@')) {
      normalizedEmail = `${normalizedEmail}@example.com`;
    }
    
    setLoading(true);
    
    try {
      const result = await requestLoginCode(normalizedEmail);
      if (result.success) {
        setCodeSent(true);
        setCooldown(COOLDOWN_TIME);
        
        // For demo purposes, auto-fill the code if provided by the function
        if (result.code) {
          setCode(result.code);
          toast({
            title: "Demo Code",
            description: `Ihr Login-Code ist: ${result.code}`
          });
        }
      }
    } catch (error: any) {
      toast({
        title: "Fehler",
        description: error.message || "Code konnte nicht gesendet werden",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerificationAttempted(true);
    
    if (!code || code.length < 6) {
      toast({
        title: "Code erforderlich",
        description: "Bitte geben Sie einen gültigen 6-stelligen Code ein."
      });
      return;
    }
    
    setLoading(true);
    
    // Normalize email to ensure demo accounts work properly
    let normalizedEmail = email.trim().toLowerCase();
    
    // Auto-format known test accounts
    if (normalizedEmail === "patient" || normalizedEmail === "patien") {
      normalizedEmail = "patient@example.com";
    }
    
    // Auto-add domain for simplified input
    if (!normalizedEmail.includes('@')) {
      normalizedEmail = `${normalizedEmail}@example.com`;
    }
    
    try {
      console.log(`Attempting to verify code for email: ${normalizedEmail} with code: ${code}`);
      const success = await verifyLoginCode(normalizedEmail, code.trim());
      
      if (success) {
        setVerificationSuccess(true);
        toast({
          title: "Code bestätigt",
          description: "Ihr Code wurde erfolgreich verifiziert. Sie werden in Kürze weitergeleitet."
        });
      } else {
        toast({
          title: "Fehler",
          description: "Der Code konnte nicht verifiziert werden.",
          variant: "destructive"
        });
        setLoading(false);
      }
    } catch (error: any) {
      console.error("Verification error:", error);
      toast({
        title: "Fehler",
        description: error.message || "Verifizierung fehlgeschlagen",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patienten-Login</CardTitle>
        <CardDescription>
          Melden Sie sich mit Ihrer E-Mail-Adresse an. Wir senden Ihnen einen Einmalcode zu.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {verificationSuccess ? (
          <div className="text-center py-4">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-cannabis-green-500" />
            <p className="mt-4">Anmeldung wird durchgeführt...</p>
            <p className="text-sm text-muted-foreground mt-2">Sie werden in Kürze weitergeleitet.</p>
          </div>
        ) : !codeSent ? (
          <form onSubmit={handleRequestCode}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Input
                  type="text" /* Changed from email to text to allow simplified inputs */
                  placeholder="E-Mail-Adresse oder Benutzername"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" disabled={loading || cooldown > 0} className="w-full">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {cooldown > 0 
                  ? `Bitte warten (${cooldown}s)` 
                  : "Code anfordern"}
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyCode}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <div className="flex justify-center mb-2">
                  <InputOTP maxLength={6} value={code} onChange={setCode}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <div className="text-center text-sm text-muted-foreground">
                  Geben Sie den 6-stelligen Code aus Ihrer E-Mail ein
                </div>
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Code bestätigen
              </Button>
              <Button
                variant="link"
                type="button"
                onClick={() => {
                  setCodeSent(false);
                  setCode("");
                  setVerificationAttempted(false);
                }}
                className="px-0 text-sm"
                disabled={loading || verificationSuccess}
              >
                Zurück zur E-Mail-Eingabe
              </Button>
            </div>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-sm text-muted-foreground">
          Noch kein MediCannabis Kunde?
        </div>
        <Link to="/fragebogen">
          <Button variant="outline" className="w-full">
            Jetzt starten
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
