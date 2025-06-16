
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, User, Calendar, FileText, Clock } from "lucide-react";

const RequestDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock request data
  const request = {
    id: id || "REQ-001",
    patientName: "Max Mustermann",
    patientEmail: "max@example.com",
    type: "Cannabis-Rezept",
    status: "pending",
    submittedAt: "2023-12-15T10:30:00",
    symptoms: ["Chronische Schmerzen", "Schlafstörungen", "Übelkeit"],
    previousTreatments: "Ibuprofen, Diclofenac",
    notes: "Patient berichtet über anhaltende chronische Schmerzen seit 2 Jahren. Bisherige Behandlungen zeigten nur begrenzte Wirkung."
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <Badge className="bg-yellow-500">Wartend</Badge>;
      case 'approved':
        return <Badge className="bg-green-500">Genehmigt</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">Abgelehnt</Badge>;
      default:
        return <Badge>Unbekannt</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate("/dashboard/requests")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zurück zu Anfragen
        </Button>
        <h1 className="text-2xl font-bold">Anfrage Details</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Anfrage {request.id}
                </span>
                {getStatusBadge(request.status)}
              </CardTitle>
              <CardDescription>
                Eingereicht am {new Date(request.submittedAt).toLocaleDateString('de-DE')} um {new Date(request.submittedAt).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Typ der Anfrage</h3>
                <p>{request.type}</p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-semibold mb-2">Symptome</h3>
                <div className="flex flex-wrap gap-2">
                  {request.symptoms.map((symptom, index) => (
                    <Badge key={index} variant="outline">{symptom}</Badge>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-semibold mb-2">Bisherige Behandlungen</h3>
                <p>{request.previousTreatments}</p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-semibold mb-2">Zusätzliche Notizen</h3>
                <p className="text-muted-foreground">{request.notes}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Patienteninformationen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="font-medium">{request.patientName}</p>
                <p className="text-sm text-muted-foreground">{request.patientEmail}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Aktionen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="default">
                Genehmigen
              </Button>
              <Button className="w-full" variant="outline">
                Nachfragen
              </Button>
              <Button className="w-full" variant="destructive">
                Ablehnen
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailPage;
