
import CreateTestUsers from "@/components/CreateTestUsers";
import CreateTestData from "@/components/CreateTestData";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User, UserCheck, Database } from "lucide-react";

const TestUsers = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    window.location.reload(); // Reload page after logout to clear state
  };

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <div className="flex items-center gap-2 mb-6">
        <UserCheck className="h-6 w-6 text-cannabis-green-600" />
        <h1 className="text-2xl font-bold">Testumgebung einrichten</h1>
      </div>
      
      {user ? (
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <p className="text-sm">
                Sie sind bereits als <strong>{user.email}</strong> angemeldet. 
                Sie können sich <Link to="/dashboard" className="text-cannabis-green-600 hover:underline">zum Dashboard</Link> begeben
                oder sich <Button variant="link" onClick={handleSignOut} className="p-0 h-auto text-cannabis-green-600 hover:underline">abmelden</Button>, 
                um einen anderen Testbenutzer zu verwenden.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <p className="text-sm text-muted-foreground mb-6">
          Diese Seite erstellt Testbenutzer und -daten für alle Rollen (Patient, Arzt, Admin).
          Nach der Erstellung können Sie sich mit den Test-Zugangsdaten einloggen und die Anwendung testen.
        </p>
      )}
      
      <div className="grid gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <User className="h-5 w-5 text-cannabis-green-600" />
            <h2 className="text-xl font-semibold">Schritt 1: Testbenutzer erstellen</h2>
          </div>
          <CreateTestUsers />
        </div>
        
        <Separator />
        
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Database className="h-5 w-5 text-cannabis-green-600" />
            <h2 className="text-xl font-semibold">Schritt 2: Testdaten erstellen</h2>
          </div>
          <CreateTestData />
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Link to="/login" className="text-cannabis-green-600 hover:underline text-sm">
          Zurück zum Login
        </Link>
      </div>
    </div>
  );
};

export default TestUsers;
