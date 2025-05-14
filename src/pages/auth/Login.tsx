
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from || "/dashboard";
  const [loading, setLoading] = useState(false);
  
  // Patient login with OTP
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  
  // Staff login with password
  const [staffEmail, setStaffEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { signIn, requestLoginCode, verifyLoginCode } = useAuth();

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await requestLoginCode(email);
      if (result.success) {
        setCodeSent(true);
        // For demo purposes, auto-fill the code if provided by the function
        if (result.code) {
          setCode(result.code);
          toast({
            title: "Demo Code",
            description: `Your login code is: ${result.code}`,
          });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const success = await verifyLoginCode(email, code);
      if (success) {
        navigate(from);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStaffLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await signIn(staffEmail, password);
      navigate(from);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-cannabis-green-900">MediCannabis</h2>
        <p className="text-sm text-muted-foreground">Dein Weg zum medizinischen Cannabis-Rezept</p>
      </div>
      
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
                    <Button type="submit" disabled={loading} className="w-full">
                      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      Code anfordern
                    </Button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleVerifyCode}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Input
                        type="text"
                        placeholder="6-stelliger Code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        maxLength={6}
                        required
                      />
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
