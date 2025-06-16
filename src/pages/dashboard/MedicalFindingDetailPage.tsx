
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, FileText, User, Calendar, Download } from "lucide-react";

const MedicalFindingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock medical finding data
  const finding = {
    id: id || "MF-001",
    title: "MRT-Befund Wirbelsäule",
    doctorName: "Dr. Sarah Schmidt",
    date: "2023-12-15T10:30:00",
    type: "Bildgebung",
    status: "final",
    findings: "Deutliche Bandscheibenvorwölbung L4/L5 mit Nervenwurzelkompression. Degenerative Veränderungen der Facettengelenke.",
    diagnosis: "Lumbaler Bandscheibenvorfall L4/L5",
    recommendations: "Konservative Therapie mit Physiotherapie und Schmerztherapie. Cannabis-Therapie zur Schmerzlinderung empfohlen."
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'final':
        return <Badge className="bg-green-500">Final</Badge>;
      case 'preliminary':
        return <Badge className="bg-yellow-500">Vorläufig</Badge>;
      case 'pending':
        return <Badge className="bg-blue-500">Ausstehend</Badge>;
      default:
        return <Badge>Unbekannt</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch(type) {
      case 'Bildgebung':
        return <Badge variant="outline">Bildgebung</Badge>;
      case 'Labor':
        return <Badge variant="outline">Labor</Badge>;
      case 'Befund':
        return <Badge variant="outline">Befund</Badge>;
      default:
        return <Badge variant="outline">Allgemein</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate("/dashboard/medical-findings")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zurück zu Befunden
        </Button>
        <h1 className="text-2xl font-bold">Befund Details</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  {finding.title}
                </span>
                <div className="flex gap-2">
                  {getTypeBadge(finding.type)}
                  {getStatusBadge(finding.status)}
                </div>
              </CardTitle>
              <CardDescription>
                Erstellt am {new Date(finding.date).toLocaleDateString('de-DE')} von {finding.doctorName}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Befund</h3>
                <p className="text-muted-foreground">{finding.findings}</p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-semibold mb-2">Diagnose</h3>
                <p>{finding.diagnosis}</p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-semibold mb-2">Empfehlungen</h3>
                <p className="text-muted-foreground">{finding.recommendations}</p>
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
                Befund-Informationen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Erstellt von</p>
                <p className="font-medium">{finding.doctorName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Datum</p>
                <p className="font-medium">{new Date(finding.date).toLocaleDateString('de-DE')}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Typ</p>
                <p className="font-medium">{finding.type}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Aktionen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="default">
                <Download className="w-4 h-4 mr-2" />
                PDF herunterladen
              </Button>
              <Button className="w-full" variant="outline">
                Teilen
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MedicalFindingDetailPage;
