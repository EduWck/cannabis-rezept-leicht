
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Upload } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import MedicalFindings from "@/components/dashboard/MedicalFindings";

const MedicalFindingsPage = () => {
  const handleUploadFile = () => {
    toast({
      title: "Upload-Funktion",
      description: "Die Upload-Funktion wird in Kürze verfügbar sein.",
    });
  };

  const handleRequestNewFinding = () => {
    toast({
      title: "Neuer Befund angefordert",
      description: "Ihre Anfrage wurde gesendet. Ein Arzt wird sich mit Ihnen in Verbindung setzen.",
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Medizinische Befunde</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={handleUploadFile}
          >
            <Upload className="h-4 w-4" />
            Befund hochladen
          </Button>
          <Button 
            size="sm" 
            className="flex items-center gap-1"
            onClick={handleRequestNewFinding}
          >
            <Plus className="h-4 w-4" />
            Befund anfordern
          </Button>
        </div>
      </div>
      
      <div className="space-y-6">
        <MedicalFindings />
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Informationen zu Befunden
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Hier finden Sie alle Ihre medizinischen Befunde, die im Zusammenhang mit Ihrer 
              Cannabis-Behandlung stehen. Falls Sie weitere Unterlagen benötigen oder Fragen zu 
              bestehenden Befunden haben, können Sie:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Einen neuen Befund über den Button "Befund anfordern" anfordern</li>
              <li>Externe Befunde über den Button "Befund hochladen" teilen</li>
              <li>Sich bei Fragen direkt an Ihren behandelnden Arzt wenden</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MedicalFindingsPage;
