
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { createTestUsers, createTestData } from "@/integrations/supabase/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export const CreateTestData = () => {
  const [creatingUsers, setCreatingUsers] = useState(false);
  const [creatingData, setCreatingData] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateTestUsers = async () => {
    setCreatingUsers(true);
    setError(null);
    
    try {
      const data = await createTestUsers();
      
      toast({
        title: "Test-Benutzer erstellt",
        description: `${data?.results?.length || 0} Benutzer wurden erfolgreich erstellt oder aktualisiert.`,
      });
      
      setUserCreated(true);
    } catch (error: any) {
      console.error("Error creating test users:", error);
      
      setError(`Test-Benutzer konnten nicht erstellt werden: ${error.message}`);
      
      toast({
        title: "Fehler",
        description: `Test-Benutzer konnten nicht erstellt werden: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setCreatingUsers(false);
    }
  };

  const handleCreateTestData = async () => {
    setCreatingData(true);
    setError(null);
    
    try {
      const result = await createTestData();
      
      toast({
        title: "Test-Daten erstellt",
        description: "Rezepte und Bestellungen wurden erfolgreich erstellt.",
      });
    } catch (error: any) {
      console.error("Error creating test data:", error);
      
      setError(`Test-Daten konnten nicht erstellt werden: ${error.message}`);
      
      toast({
        title: "Fehler",
        description: `Test-Daten konnten nicht erstellt werden: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setCreatingData(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Fehler</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Test-Benutzer erstellen</h3>
        <Button 
          onClick={handleCreateTestUsers}
          disabled={creatingUsers}
          className="w-full sm:w-auto"
        >
          {creatingUsers && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Test-Benutzer erstellen
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          Erstellt drei Benutzer: patient@example.com, doctor@example.com und admin@example.com (alle mit Passwort "password").
        </p>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Test-Daten erstellen</h3>
        <Button 
          onClick={handleCreateTestData}
          disabled={creatingData || (!userCreated && !creatingUsers)}
          className="w-full sm:w-auto"
        >
          {creatingData && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Test-Rezepte und Bestellungen erstellen
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          Erstellt Testrezepte und Bestellungen für den Test-Patienten. Führen Sie diese Aktion erst aus, nachdem Sie Test-Benutzer erstellt haben.
        </p>
        {!userCreated && !creatingUsers && (
          <p className="text-sm text-amber-600 mt-1">
            Bitte erstellen Sie zuerst Test-Benutzer, bevor Sie Test-Daten erstellen.
          </p>
        )}
      </div>
    </div>
  );
};
