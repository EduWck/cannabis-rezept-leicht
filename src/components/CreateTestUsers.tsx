
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createTestUsers } from "@/integrations/supabase/client";
import { Check, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const CreateTestUsers = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCreateTestUsers = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      const response = await createTestUsers();
      console.log("Test users creation response:", response);
      
      if (!response || response.error) {
        throw new Error(response?.error || "Could not create test users");
      }
      
      toast({
        title: "Test-Benutzer erstellt",
        description: "Die Testbenutzer wurden erfolgreich erstellt."
      });
      
      setIsComplete(true);
    } catch (error: any) {
      console.error("Error creating test users:", error);
      setErrorMessage(error.message || "Ein unbekannter Fehler ist aufgetreten");
      
      toast({
        title: "Fehler beim Erstellen",
        description: error.message || "Die Testbenutzer konnten nicht erstellt werden.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="py-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Testbenutzer erstellen</h3>
              <p className="text-sm text-muted-foreground">
                Erstellt Test-Accounts für Patient, Arzt und Admin.
              </p>
            </div>
            <Button
              onClick={handleCreateTestUsers}
              disabled={isLoading || isComplete}
              className="ml-4"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Erstelle...
                </>
              ) : isComplete ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Erstellt
                </>
              ) : (
                "Erstellen"
              )}
            </Button>
          </div>
          
          {errorMessage && (
            <div className="text-sm text-red-500">{errorMessage}</div>
          )}
          
          <div className="text-sm">
            <h4 className="font-medium mb-2">Verfügbare Testkonten nach Erstellung:</h4>
            <ul className="space-y-1 list-disc pl-5">
              <li><strong>Patient:</strong> patient@example.com / password</li>
              <li><strong>Arzt:</strong> doctor@example.com / password</li>
              <li><strong>Admin:</strong> admin@example.com / password</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateTestUsers;
