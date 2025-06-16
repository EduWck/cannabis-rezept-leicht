
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, FileText, User, Calendar, Package } from "lucide-react";

const PrescriptionDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock prescription data
  const prescription = {
    id: id || "RX-001",
    patientName: "Max Mustermann",
    doctorName: "Dr. Sarah Schmidt",
    medication: "Cannabis Blüten",
    dosage: "0.5g täglich",
    quantity: "5g",
    status: "active",
    issuedAt: "2023-12-15T10:30:00",
    validUntil: "2024-01-15T23:59:59",
    instructions: "Vaporisation bei 180°C, 2x täglich je 0.25g"
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-500">Aktiv</Badge>;
      case 'expired':
        return <Badge className="bg-red-500">Abgelaufen</Badge>;
      case 'used':
        return <Badge className="bg-gray-500">Eingelöst</Badge>;
      default:
        return <Badge>Unbekannt</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate("/dashboard/prescriptions")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zurück zu Rezepten
        </Button>
        <h1 className="text-2xl font-bold">Rezept Details</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Rezept {prescription.id}
                </span>
                {getStatusBadge(prescription.status)}
              </CardTitle>
              <CardDescription>
                Ausgestellt am {new Date(prescription.issuedAt).toLocaleDateString('de-DE')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold mb-2">Medikament</h3>
                  <p>{prescription.medication}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Dosierung</h3>
                  <p>{prescription.dosage}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold mb-2">Menge</h3>
                  <p>{prescription.quantity}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Gültig bis</h3>
                  <p>{new Date(prescription.validUntil).toLocaleDateString('de-DE')}</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-semibold mb-2">Anwendungshinweise</h3>
                <p className="text-muted-foreground">{prescription.instructions}</p>
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
                Rezept-Informationen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Patient</p>
                <p className="font-medium">{prescription.patientName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ausstellender Arzt</p>
                <p className="font-medium">{prescription.doctorName}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Aktionen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="default">
                <Package className="w-4 h-4 mr-2" />
                Bestellen
              </Button>
              <Button className="w-full" variant="outline">
                PDF herunterladen
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionDetailPage;
