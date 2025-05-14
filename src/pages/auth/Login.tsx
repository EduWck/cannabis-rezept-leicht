
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { PatientLoginForm } from "@/components/auth/PatientLoginForm";
import { StaffLoginForm } from "@/components/auth/StaffLoginForm";
import { DemoAccountsInfo } from "@/components/auth/DemoAccountsInfo";
import { useLoginLogic } from "@/hooks/use-login-logic";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const { 
    user, 
    userRole, 
    isLoading: authIsLoading, 
    loading,
    setLoading,
    errorMessage,
    clearErrors,
    signIn,
    requestLoginCode,
    verifyLoginCode,
    redirectUserBasedOnRole
  } = useLoginLogic();
  const [redirectAttempted, setRedirectAttempted] = useState(false);

  // Effect to redirect user when authenticated
  useEffect(() => {
    if (!authIsLoading && user && userRole && !redirectAttempted) {
      console.log(`User authenticated with role: ${userRole}, redirecting...`);
      setRedirectAttempted(true);
      
      // Add toast notification to let the user know we're redirecting
      toast({
        title: "Erfolgreiche Anmeldung",
        description: "Sie werden zur Dashboard weitergeleitet..."
      });
      
      // Use a timeout to ensure the state updates before redirect
      setTimeout(() => {
        redirectUserBasedOnRole(userRole);
      }, 100);
    }
  }, [authIsLoading, user, userRole, redirectUserBasedOnRole, redirectAttempted]);

  // Reset redirect attempted when user or role changes
  useEffect(() => {
    if (!user || !userRole) {
      setRedirectAttempted(false);
    }
  }, [user, userRole]);

  // If already loaded and authenticated, don't show login form
  if (!authIsLoading && user && userRole) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-cannabis-green-500 mb-4" />
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
          <PatientLoginForm 
            requestLoginCode={requestLoginCode}
            verifyLoginCode={verifyLoginCode}
            loading={loading}
            setLoading={setLoading}
          />
        </TabsContent>
        
        <TabsContent value="staff">
          <StaffLoginForm 
            signIn={signIn}
            loading={loading}
            setLoading={setLoading}
          />
        </TabsContent>
      </Tabs>
      
      <div className="mt-4">
        <Link to="/" className="text-sm text-cannabis-green-600 hover:underline">
          Zurück zur Startseite
        </Link>
      </div>
      
      <DemoAccountsInfo />
    </div>
  );
};

export default Login;
