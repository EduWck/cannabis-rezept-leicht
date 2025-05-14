
import CreateTestUsers from "@/components/CreateTestUsers";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const TestUsers = () => {
  const { user } = useAuth();

  return (
    <div className="container max-w-md mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Testbenutzer erstellen</h1>
      
      {user ? (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            Sie sind bereits als <strong>{user.email}</strong> angemeldet. 
            Sie können sich <Link to="/dashboard" className="text-cannabis-green-600 hover:underline">zum Dashboard</Link> begeben
            oder sich <Button variant="link" className="p-0 h-auto text-cannabis-green-600 hover:underline">abmelden</Button>, 
            um einen anderen Testbenutzer zu verwenden.
          </p>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground mb-4">
          Diese Seite erstellt Testbenutzer für alle Rollen (Patient, Arzt, Admin) mit Beispieldaten.
          Sie können nach der Erstellung mit den Test-Zugangsdaten in die Anwendung einloggen.
        </p>
      )}
      
      <CreateTestUsers />
      
      <div className="mt-8 text-center">
        <Link to="/login" className="text-cannabis-green-600 hover:underline text-sm">
          Zurück zum Login
        </Link>
      </div>
    </div>
  );
};

export default TestUsers;
