
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Prescription } from "@/types";
import { Loader2, FileText, Download, AlertTriangle, CheckCircle, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useDbQuery } from "@/hooks/use-database";

const PrescriptionsPage = () => {
  const { user } = useAuth();
  const { loading, data: prescriptions, executeQuery } = useDbQuery<Prescription>();

  useEffect(() => {
    const fetchPrescriptions = async () => {
      if (!user?.id) return;
      
      // Mock data for prescriptions when user exists
      const mockData: Prescription[] = [
        {
          id: "1",
          patient_id: user.id,
          doctor_id: "doctor-123",
          status: "in_review",
          rejection_reason: null,
          symptoms: ["Chronic Pain", "Insomnia"],
          questionnaire_data: null,
          internal_notes: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "2",
          patient_id: user.id,
          doctor_id: "doctor-456",
          status: "approved",
          rejection_reason: null,
          symptoms: ["Anxiety", "Stress"],
          questionnaire_data: null,
          internal_notes: null,
          created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: "3",
          patient_id: user.id,
          doctor_id: "doctor-789",
          status: "rejected",
          rejection_reason: "Insufficient medical history documentation.",
          symptoms: ["Depression"],
          questionnaire_data: null,
          internal_notes: null,
          created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
        }
      ];
      
      // Pass mock data directly (the hook now accepts arrays directly)
      await executeQuery(mockData, {
        errorTitle: "Fehler",
        errorMessage: "Rezepte konnten nicht geladen werden. Bitte versuchen Sie es später erneut."
      });
    };
    
    if (user?.id) {
      fetchPrescriptions();
    }
  }, [user, executeQuery]);

  const getStatusDetails = (status: string) => {
    switch (status) {
      case "in_review":
        return {
          label: "In Prüfung",
          color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
          icon: <AlertTriangle className="h-4 w-4" />,
        };
      case "approved":
        return {
          label: "Freigegeben",
          color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
          icon: <CheckCircle className="h-4 w-4" />,
        };
      case "rejected":
        return {
          label: "Abgelehnt",
          color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
          icon: <AlertTriangle className="h-4 w-4" />,
        };
      default:
        return {
          label: "Unbekannt",
          color: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
          icon: null,
        };
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-cannabis-green-500" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Meine Rezepte</h1>
        <Link to="/fragebogen">
          <Button>
            <FileText className="mr-2 h-4 w-4" /> Neues Rezept anfordern
          </Button>
        </Link>
      </div>
      
      {prescriptions.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="mb-4 h-16 w-16 text-muted-foreground" />
            <h3 className="mb-2 text-xl font-semibold">Keine Rezepte gefunden</h3>
            <p className="mb-6 text-center text-muted-foreground">
              Sie haben noch keine Rezepte angefordert. Starten Sie den Fragebogen, 
              um Ihr erstes Rezept zu beantragen.
            </p>
            <Link to="/fragebogen">
              <Button>
                <FileText className="mr-2 h-4 w-4" /> Rezept-Fragebogen starten
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {prescriptions.map((prescription) => {
            const status = getStatusDetails(prescription.status);
            
            return (
              <Card key={prescription.id}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      Rezept vom {new Date(prescription.created_at).toLocaleDateString("de-DE")}
                    </CardTitle>
                    <Badge className={`flex items-center gap-1 ${status.color}`}>
                      {status.icon}
                      {status.label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="mb-2 text-sm font-medium">Symptome:</div>
                    <div className="flex flex-wrap gap-1">
                      {prescription.symptoms?.map((symptom, index) => (
                        <Badge key={index} variant="outline">
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {prescription.status === "approved" ? (
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" /> Rezept herunterladen
                      </Button>
                      <Link to="/dashboard/orders">
                        <Button>
                          <ShoppingCart className="mr-2 h-4 w-4" /> Bestellung aufgeben
                        </Button>
                      </Link>
                    </div>
                  ) : prescription.status === "rejected" ? (
                    <div className="mt-4">
                      <div className="mb-2 text-sm font-medium">Ablehnungsgrund:</div>
                      <p className="rounded-md bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-300">
                        {prescription.rejection_reason || "Es wurde kein Grund angegeben."}
                      </p>
                      <Link to="/fragebogen">
                        <Button className="mt-4">
                          Neues Rezept anfordern
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Ihr Rezept wird derzeit von einem Arzt geprüft. Sie erhalten eine 
                      Benachrichtigung, sobald es bearbeitet wurde.
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PrescriptionsPage;
