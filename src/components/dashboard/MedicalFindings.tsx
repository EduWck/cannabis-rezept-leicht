
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, Eye } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Finding {
  id: string;
  title: string;
  date: string;
  doctor: string;
  type: string;
  viewUrl: string;
  downloadUrl: string;
}

const MOCK_FINDINGS: Finding[] = [
  {
    id: "find-1",
    title: "Erstdiagnose chronische Schmerzen",
    date: "2024-04-15",
    doctor: "Dr. med. Michaela Weber",
    type: "Diagnose",
    viewUrl: "#view",
    downloadUrl: "#download",
  },
  {
    id: "find-2",
    title: "Cannabis-Therapie Verlaufsbericht",
    date: "2024-05-01",
    doctor: "Dr. med. Thomas Schmidt",
    type: "Verlaufsbericht",
    viewUrl: "#view",
    downloadUrl: "#download",
  },
];

const MedicalFindings = () => {
  const [findings] = useState<Finding[]>(MOCK_FINDINGS);

  const handleView = (finding: Finding) => {
    toast({
      title: "Befund anzeigen",
      description: `Der Befund "${finding.title}" wird geöffnet...`,
    });
  };

  const handleDownload = (finding: Finding) => {
    toast({
      title: "Befund herunterladen",
      description: `Der Befund "${finding.title}" wird heruntergeladen...`,
    });
  };

  return (
    <Card>
      <CardHeader className="bg-cannabis-green-50 dark:bg-cannabis-green-900/20 px-4 sm:px-6 py-4">
        <CardTitle className="text-cannabis-green-700 dark:text-cannabis-green-400 flex items-center text-base sm:text-lg">
          <FileText className="h-4 w-4 sm:h-5 sm:w-5 inline-block mr-2" /> Medizinische Befunde
        </CardTitle>
        <CardDescription>Ihre ärztlichen Befunde und Diagnosen</CardDescription>
      </CardHeader>
      <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
        {findings.length === 0 ? (
          <p className="text-center py-4 text-muted-foreground">
            Sie haben noch keine medizinischen Befunde.
          </p>
        ) : (
          <div className="space-y-4">
            {findings.map((finding) => (
              <div
                key={finding.id}
                className="border rounded-md p-3 sm:p-4 flex flex-col sm:flex-row justify-between"
              >
                <div className="space-y-1 mb-3 sm:mb-0">
                  <h4 className="font-medium text-sm sm:text-base truncate">{finding.title}</h4>
                  <div className="flex items-center text-xs sm:text-sm text-muted-foreground gap-1 sm:gap-2">
                    <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
                    <span>{new Date(finding.date).toLocaleDateString('de-DE')}</span>
                  </div>
                  <p className="text-xs sm:text-sm">
                    <span className="font-medium">Arzt:</span> {finding.doctor}
                  </p>
                  <p className="text-xs sm:text-sm">
                    <span className="font-medium">Typ:</span> {finding.type}
                  </p>
                </div>
                <div className="flex items-center gap-2 justify-end sm:justify-start">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex gap-1 px-2 sm:px-3 py-1 h-8"
                    onClick={() => handleView(finding)}
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline text-xs">Anzeigen</span>
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="flex gap-1 px-2 sm:px-3 py-1 h-8"
                    onClick={() => handleDownload(finding)}
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline text-xs">Download</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MedicalFindings;
