
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
  const [success, setSuccess] = useState<string | null>(null);

  const handleCreateTestUsers = async () => {
    setCreatingUsers(true);
    setError(null);
    setSuccess(null);
    
    try {
      const data = await createTestUsers();
      
      toast({
        title: "Test-Benutzer erstellt",
        description: `${data?.results?.length || 0} Benutzer wurden erfolgreich erstellt oder aktualisiert.`,
      });
      
      setUserCreated(true);
      setSuccess("Test-Benutzer wurden erfolgreich erstellt.");
      return data;
    } catch (error: any) {
      console.error("Error creating test users:", error);
      
      setError(`Test-Benutzer konnten nicht erstellt werden: ${error.message}`);
      
      toast({
        title: "Fehler",
        description: `Test-Benutzer konnten nicht erstellt werden: ${error.message}`,
        variant: "destructive",
      });
      
      throw error;
    } finally {
      setCreatingUsers(false);
    }
  };

  const handleCreateTestData = async () => {
    setCreatingData(true);
    setError(null);
    setSuccess(null);
    
    try {
      // First ensure test users exist
      if (!userCreated) {
        try {
          await handleCreateTestUsers();
        } catch (error) {
          // Error already handled in handleCreateTestUsers
          setCreatingData(false);
          return;
        }
      }
      
      const result = await createTestData();
      
      toast({
        title: "Test-Daten erstellt",
        description: "Rezepte und Bestellungen wurden erfolgreich erstellt.",
      });
      
      setSuccess("Rezepte und Bestellungen wurden erfolgreich erstellt.");
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
      
      {success && (
        <Alert variant="default" className="bg-green-50 text-green-800 border-green-200">
          <AlertCircle className="h-4 w-4 text-green-600" />
          <AlertTitle>Erfolg</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
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
          disabled={creatingData}
          className="w-full sm:w-auto"
        >
          {creatingData && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Test-Rezepte und Bestellungen erstellen
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          Erstellt Testrezepte und Bestellungen für den Test-Patienten. Die Test-Benutzer werden automatisch erstellt, wenn sie noch nicht existieren.
        </p>
      </div>
    </div>
  );
};
