
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { createTestUsers, createTestData } from "@/integrations/supabase/client";

export const CreateTestData = () => {
  const [creatingUsers, setCreatingUsers] = useState(false);
  const [creatingData, setCreatingData] = useState(false);

  const handleCreateTestUsers = async () => {
    setCreatingUsers(true);
    try {
      const data = await createTestUsers();
      
      toast({
        title: "Test-Benutzer erstellt",
        description: `${data.results.length} Benutzer wurden erfolgreich erstellt oder aktualisiert.`,
      });
    } catch (error: any) {
      console.error("Error creating test users:", error);
      
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
    try {
      await createTestData();
      
      toast({
        title: "Test-Daten erstellt",
        description: "Rezepte und Bestellungen wurden erfolgreich erstellt.",
      });
    } catch (error: any) {
      console.error("Error creating test data:", error);
      
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
          Erstellt Testrezepte und Bestellungen für den Test-Patienten. Führen Sie diese Aktion erst aus, nachdem Sie Test-Benutzer erstellt haben.
        </p>
      </div>
    </div>
  );
};
