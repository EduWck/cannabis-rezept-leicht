
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { UserRole } from "@/types";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const COOLDOWN_TIME = 60; // 60 seconds cooldown

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, userRole, profile, isLoading, signIn, requestLoginCode, verifyLoginCode } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  // Patient login with OTP
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  
  // Staff login with password
  const [staffEmail, setStaffEmail] = useState("");
  const [password, setPassword] = useState("");

  // Set error message from location state if present
  useEffect(() => {
    if (location.state?.error) {
      setErrorMessage(location.state.error);
    }
  }, [location.state]);

  // Check URL for any auth callbacks (handling magic link/token redirects)
  useEffect(() => {
    const handleHashParams = async () => {
      // Check for hash parameters that might indicate a magic link or token
      const hash = window.location.hash;
      if (hash && (hash.includes('access_token') || hash.includes('refresh_token'))) {
        toast("Automatische Anmeldung", {
          description: "Sie werden angemeldet..."
        });
      }
    };

    handleHashParams();
  }, []);

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

  // Redirect if already logged in
  useEffect(() => {
    if (!isLoading && user && userRole) {
      console.log("User is logged in, redirecting based on role:", userRole);
      redirectUserBasedOnRole(userRole);
    }
  }, [user, userRole, isLoading]);

  const redirectUserBasedOnRole = (role: UserRole) => {
    console.log("Redirecting based on role:", role);
    switch(role) {
      case 'patient':
        navigate('/dashboard/profile', { replace: true });
        break;
      case 'doctor':
        navigate('/dashboard', { replace: true });
        break;
      case 'admin':
        navigate('/dashboard', { replace: true });
        break;
      default:
        navigate('/dashboard', { replace: true });
    }
  };

  const clearErrors = () => {
    setErrorMessage("");
  };

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();
    
    if (cooldown > 0) {
      toast("Bitte warten", {
        description: `Sie können in ${cooldown} Sekunden einen neuen Code anfordern.`
      });
      return;
    }
    
    if (!email || !email.trim()) {
      toast("E-Mail erforderlich", {
        description: "Bitte geben Sie eine E-Mail-Adresse ein."
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await requestLoginCode(email.trim());
      if (result.success) {
        setCodeSent(true);
        setCooldown(COOLDOWN_TIME);
        // For demo purposes, auto-fill the code if provided by the function
        if (result.code) {
          setCode(result.code);
          toast("Demo Code", {
            description: `Ihr Login-Code ist: ${result.code}`
          });
        }
      }
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to send code");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();
    
    if (!code || code.length < 6) {
      toast("Code erforderlich", {
        description: "Bitte geben Sie einen gültigen 6-stelligen Code ein."
      });
      return;
    }
    
    setLoading(true);
    
    try {
      console.log(`Attempting to verify code for email: ${email} with code: ${code}`);
      const success = await verifyLoginCode(email.trim(), code.trim());
      
      if (success) {
        toast("Code bestätigt", {
          description: "Ihr Code wurde erfolgreich verifiziert."
        });
        
        // We don't need to redirect here - auth state change will trigger the redirect
        // But we can show a loading state
        setLoading(true);
        setTimeout(() => {
          // If we're still on this page after 5 seconds, show a message
          setLoading(false);
          toast("Fast geschafft", {
            description: "Die Anmeldung läuft. Bitte überprüfen Sie Ihre E-Mails für einen Login-Link, falls Sie nicht automatisch weitergeleitet werden."
          });
        }, 5000);
      } else {
        setErrorMessage("Der Code konnte nicht verifiziert werden.");
      }
    } catch (error: any) {
      console.error("Verification error:", error);
      setErrorMessage(error.message || "Verifizierung fehlgeschlagen");
    } finally {
      setLoading(false);
    }
  };

  const handleStaffLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();
    
    if (!staffEmail || !password) {
      toast("Fehlende Angaben", {
        description: "Bitte geben Sie E-Mail und Passwort ein."
      });
      return;
    }
    
    setLoading(true);
    
    try {
      console.log("Attempting staff login with:", staffEmail);
      await signIn(staffEmail, password);
      
      // Wait a moment for the role detection to complete before redirecting
      setTimeout(() => {
        if (user && userRole) {
          redirectUserBasedOnRole(userRole);
        } else {
          console.log("User or role not detected yet, waiting...");
          // Try one more time after a longer delay
          setTimeout(() => {
            if (user && userRole) {
              redirectUserBasedOnRole(userRole);
            } else {
              console.log("Still no user or role detected, refreshing page");
              window.location.reload(); // Force reload if still not working
            }
          }, 1000);
        }
      }, 500);
    } catch (error: any) {
      console.error("Login error:", error);
      setErrorMessage(error.message || "Ungültige Anmeldedaten");
    } finally {
      setLoading(false);
    }
  };

  // If already loaded and authenticated, don't show login form
  if (!isLoading && user && userRole) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p>Sie sind bereits angemeldet. Weiterleitung...</p>
        <Button 
          onClick={() => redirectUserBasedOnRole(userRole)} 
          className="mt-4"
        >
          Zur Übersicht
        </Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-cannabis-green-900">MediCannabis</h2>
        <p className="text-sm text-muted-foreground">Dein Weg zum medizinischen Cannabis-Rezept</p>
      </div>
      
      {/* Test Users Link - deutlich sichtbar */}
      <div className="mb-4 w-full max-w-md">
        <Link to="/test-users">
          <Button variant="outline" className="w-full border-cannabis-green-500 text-cannabis-green-700">
            Testbenutzer erstellen/verwalten
          </Button>
        </Link>
      </div>
      
      {errorMessage && (
        <Alert variant="destructive" className="mb-4 w-full max-w-md">
          <AlertDescription>
            {errorMessage}
          </AlertDescription>
        </Alert>
      )}
      
      <Tabs defaultValue="patient" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="patient">Patient</TabsTrigger>
          <TabsTrigger value="staff">Arzt / Admin</TabsTrigger>
        </TabsList>
        
        <TabsContent value="patient">
          <Card>
            <CardHeader>
              <CardTitle>Patienten-Login</CardTitle>
              <CardDescription>
                Melden Sie sich mit Ihrer E-Mail-Adresse an. Wir senden Ihnen einen Einmalcode zu.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!codeSent ? (
                <form onSubmit={handleRequestCode}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Input
                        type="email"
                        placeholder="E-Mail-Adresse"
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
                      onClick={() => setCodeSent(false)}
                      className="px-0 text-sm"
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
        </TabsContent>
        
        <TabsContent value="staff">
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
                  <div className="grid gap-2">
                    <Input
                      type="email"
                      placeholder="E-Mail-Adresse"
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
                      required
                    />
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
        </TabsContent>
      </Tabs>
      
      <div className="mt-4">
        <Link to="/" className="text-sm text-cannabis-green-600 hover:underline">
          Zurück zur Startseite
        </Link>
      </div>
      
      <div className="mt-8">
        <h3 className="mb-2 font-semibold">Demo Accounts:</h3>
        <div className="grid gap-1 text-sm text-muted-foreground">
          <p>Patient: patient@example.com (nutze Code-Login)</p>
          <p>Arzt: doctor@example.com / password</p>
          <p>Admin: admin@example.com / password</p>
        </div>
        <div className="mt-4 text-center">
          <Link to="/test-users" className="text-cannabis-green-600 hover:underline text-sm">
            Testbenutzer erstellen
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
