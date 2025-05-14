
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createTestData } from "@/integrations/supabase/client";
import { Check, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const CreateTestData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCreateTestData = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      toast({
        title: "Testdaten werden erstellt",
        description: "Bitte warten Sie einen Moment..."
      });
      
      const response = await createTestData();
      console.log("Test data creation response:", response);
      
      if (!response || response.error) {
        throw new Error(response?.error || "Could not create test data");
      }
      
      toast({
        title: "Testdaten erstellt",
        description: "Die Testdaten wurden erfolgreich erstellt. Sie können nun die Anwendung mit den Testdaten testen."
      });
      
      setIsComplete(true);
      
      // Reset completion state after a delay
      setTimeout(() => {
        setIsComplete(false);
      }, 20000);
    } catch (error: any) {
      console.error("Error creating test data:", error);
      setErrorMessage(error.message || "Ein unbekannter Fehler ist aufgetreten");
      
      toast({
        title: "Fehler beim Erstellen",
        description: error.message || "Die Testdaten konnten nicht erstellt werden.",
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
              <h3 className="text-lg font-semibold">Testdaten erstellen</h3>
              <p className="text-sm text-muted-foreground">
                Erstellt Test-Rezepte, Bestellungen und weitere Daten.
              </p>
            </div>
            <Button
              onClick={handleCreateTestData}
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
            <h4 className="font-medium mb-2">Testdaten enthalten:</h4>
            <ul className="space-y-1 list-disc pl-5">
              <li><strong>Rezepte:</strong> In Bearbeitung, Genehmigt, Abgelehnt</li>
              <li><strong>Bestellungen:</strong> Ausstehend, In Bearbeitung, Versandt</li>
              <li><strong>Benutzer:</strong> Mit verschiedenen Rollen</li>
            </ul>
            <p className="mt-2 text-xs text-muted-foreground">
              Hinweis: Testdaten werden für den Testbenutzer (patient@example.com) erstellt.
              Stellen Sie sicher, dass Sie zuerst Testbenutzer erstellt haben.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateTestData;
