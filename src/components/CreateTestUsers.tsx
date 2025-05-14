
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const CreateTestUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleCreateTestUsers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-test-users');
      
      if (error) {
        throw error;
      }

      setResults(data?.results || []);
      
      toast({
        title: "Testbenutzer erstellt",
        description: "Die Testkonten wurden erfolgreich angelegt."
      });
    } catch (error: any) {
      toast({
        title: "Fehler", 
        description: error.message || "Fehler beim Erstellen der Testbenutzer", 
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button onClick={handleCreateTestUsers} disabled={isLoading} className="w-full">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Erstelle Testbenutzer...
          </>
        ) : (
          "Testbenutzer erstellen"
        )}
      </Button>

      {results.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-medium">Ergebnisse:</h3>
          <ul className="mt-2 space-y-2">
            {results.map((result, idx) => (
              <li key={idx} className="text-sm">
                {result.email}: {result.status} {result.message ? `(${result.message})` : ''}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 border rounded-md p-4 bg-slate-50 dark:bg-slate-900">
        <h3 className="text-lg font-medium mb-2">Verfügbare Testkonten:</h3>
        <div className="grid gap-2">
          <div className="grid grid-cols-3 gap-2 font-medium text-sm">
            <span>Rolle</span>
            <span>E-Mail</span>
            <span>Passwort</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <span>Patient</span>
            <span>patient@example.com</span>
            <span>password</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <span>Arzt</span>
            <span>doctor@example.com</span>
            <span>password</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <span>Admin</span>
            <span>admin@example.com</span>
            <span>password</span>
          </div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Diese Konten werden automatisch mit Beispieldaten angelegt. Der Patient hat ein Rezept und eine Bestellung, der Arzt hat eine offene Anfrage.
        </p>
      </div>
    </div>
  );
};

export default CreateTestUsers;
