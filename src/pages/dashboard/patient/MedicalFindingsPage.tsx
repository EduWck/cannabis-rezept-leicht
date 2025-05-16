
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Upload } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import MedicalFindings from "@/components/dashboard/MedicalFindings";
import { useIsMobile } from "@/hooks/use-is-mobile";

const MedicalFindingsPage = () => {
  const isMobile = useIsMobile();
  
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Medizinische Befunde</h1>
        <div className="flex w-full sm:w-auto flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            size={isMobile ? "default" : "sm"}
            className="flex items-center justify-center gap-1 w-full sm:w-auto"
            onClick={handleUploadFile}
          >
            <Upload className="h-4 w-4" />
            <span className="whitespace-nowrap">Befund hochladen</span>
          </Button>
          <Button 
            size={isMobile ? "default" : "sm"}
            className="flex items-center justify-center gap-1 w-full sm:w-auto"
            onClick={handleRequestNewFinding}
          >
            <Plus className="h-4 w-4" />
            <span className="whitespace-nowrap">Befund anfordern</span>
          </Button>
        </div>
      </div>
      
      <div className="space-y-6">
        <MedicalFindings />
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg sm:text-xl">
              <FileText className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>Informationen zu Befunden</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm sm:text-base">
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
