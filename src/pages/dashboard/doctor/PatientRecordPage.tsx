
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { 
  ArrowLeft,
  User,
  FileText,
  Calendar,
  ClipboardList,
  Phone,
  Mail,
  MapPin,
  Edit,
  Save,
  Plus
} from "lucide-react";

const PatientRecordPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState("");

  // Mock patient data - in real app would come from API based on ID
  const patient = {
    id: id || "P-001",
    name: "Max Mustermann",
    age: 42,
    dateOfBirth: "15.03.1982",
    email: "max.mustermann@email.de",
    phone: "+49 123 456789",
    address: "Musterstraße 123, 12345 Berlin",
    insuranceNumber: "A123456789",
    emergencyContact: "Anna Mustermann (+49 987 654321)",
    currentDiagnosis: "Chronische Schmerzen",
    allergies: ["Penicillin", "Nüsse"],
    lastVisit: "03.06.2025",
    nextAppointment: "20.06.2025 14:30"
  };

  const treatmentHistory = [
    {
      date: "03.06.2025",
      type: "Verlaufskontrolle",
      diagnosis: "Chronische Schmerzen - Verbesserung",
      treatment: "Cannabis-Therapie fortgesetzt",
      doctor: "Dr. Schmidt"
    },
    {
      date: "15.05.2025", 
      type: "Erstberatung",
      diagnosis: "Chronische Schmerzen",
      treatment: "Cannabis-Therapie eingeleitet",
      doctor: "Dr. Schmidt"
    },
    {
      date: "28.04.2025",
      type: "Voruntersuchung",
      diagnosis: "Chronische Rückenschmerzen",
      treatment: "Anamnese und Aufklärung",
      doctor: "Dr. Müller"
    }
  ];

  const prescriptions = [
    {
      id: "RX-2025-001",
      date: "03.06.2025",
      product: "CBD Öl 10%",
      dosage: "2x täglich 5 Tropfen",
      quantity: "10ml",
      status: "Aktiv",
      validUntil: "03.09.2025"
    },
    {
      id: "RX-2025-002", 
      date: "15.05.2025",
      product: "Cannabisblüte THC18",
      dosage: "Bei Bedarf, max. 0.5g/Tag",
      quantity: "5g",
      status: "Abgelaufen",
      validUntil: "15.08.2025"
    }
  ];

  const appointments = [
    {
      date: "20.06.2025",
      time: "14:30",
      type: "Verlaufskontrolle",
      status: "Geplant",
      notes: "Therapieverlauf besprechen"
    },
    {
      date: "03.06.2025",
      time: "10:00", 
      type: "Verlaufskontrolle",
      status: "Abgeschlossen",
      notes: "Patient berichtet von Verbesserung"
    },
    {
      date: "15.05.2025",
      time: "15:30",
      type: "Erstberatung",
      status: "Abgeschlossen",
      notes: "Erstberatung Cannabis-Therapie"
    }
  ];

  const medicalFindings = [
    {
      date: "28.04.2025",
      type: "MRT Wirbelsäule",
      result: "Bandscheibenvorfall L4/L5",
      doctor: "Dr. Radiologie",
      status: "Befund"
    },
    {
      date: "20.04.2025",
      type: "Blutbild",
      result: "Alle Werte im Normbereich",
      doctor: "Labor München",
      status: "Normal"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Aktiv':
        return <Badge className="bg-green-500 text-white">Aktiv</Badge>;
      case 'Abgelaufen':
        return <Badge className="bg-red-500 text-white">Abgelaufen</Badge>;
      case 'Geplant':
        return <Badge className="bg-blue-500 text-white">Geplant</Badge>;
      case 'Abgeschlossen':
        return <Badge className="bg-gray-500 text-white">Abgeschlossen</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleSaveNotes = () => {
    setIsEditingNotes(false);
    toast({
      title: "Notizen gespeichert",
      description: "Die Arztnotizen wurden erfolgreich gespeichert."
    });
  };

  const handleNewPrescription = () => {
    toast({
      title: "Neues Rezept",
      description: "Rezept-Editor wird geöffnet."
    });
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Zurück
        </Button>
        <h1 className="text-2xl font-bold">Patientenakte - {patient.name}</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        {/* Patient Overview Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Patientenübersicht
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{patient.name}</h3>
                <p className="text-sm text-muted-foreground">Patient-ID: {patient.id}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{patient.age} Jahre (*{patient.dateOfBirth})</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{patient.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{patient.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{patient.address}</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Aktuelle Diagnose</h4>
                <Badge variant="outline">{patient.currentDiagnosis}</Badge>
              </div>

              <div>
                <h4 className="font-medium mb-2">Allergien</h4>
                <div className="flex flex-wrap gap-1">
                  {patient.allergies.map((allergy, index) => (
                    <Badge key={index} variant="destructive" className="text-xs">
                      {allergy}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t text-sm">
                <p><strong>Letzter Besuch:</strong> {patient.lastVisit}</p>
                <p><strong>Nächster Termin:</strong> {patient.nextAppointment}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Schnellaktionen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              <Button onClick={handleNewPrescription} className="justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Neues Rezept ausstellen
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => toast({
                title: "Termin vereinbaren",
                description: "Terminkalender wird geöffnet."
              })}>
                <Calendar className="mr-2 h-4 w-4" />
                Termin vereinbaren
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => toast({
                title: "Befund hinzufügen",
                description: "Befund-Editor wird geöffnet."
              })}>
                <ClipboardList className="mr-2 h-4 w-4" />
                Befund hinzufügen
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => toast({
                title: "Daten bearbeiten",
                description: "Patientendaten-Editor wird geöffnet."
              })}>
                <Edit className="mr-2 h-4 w-4" />
                Daten bearbeiten
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="history" className="space-y-4">
        <TabsList>
          <TabsTrigger value="history">Behandlungshistorie</TabsTrigger>
          <TabsTrigger value="prescriptions">Rezepte</TabsTrigger>
          <TabsTrigger value="appointments">Termine</TabsTrigger>
          <TabsTrigger value="findings">Befunde</TabsTrigger>
          <TabsTrigger value="notes">Arztnotizen</TabsTrigger>
        </TabsList>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Behandlungshistorie</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Datum</TableHead>
                    <TableHead>Typ</TableHead>
                    <TableHead>Diagnose</TableHead>
                    <TableHead>Behandlung</TableHead>
                    <TableHead>Arzt</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {treatmentHistory.map((treatment, index) => (
                    <TableRow key={index}>
                      <TableCell>{treatment.date}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{treatment.type}</Badge>
                      </TableCell>
                      <TableCell>{treatment.diagnosis}</TableCell>
                      <TableCell>{treatment.treatment}</TableCell>
                      <TableCell>{treatment.doctor}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prescriptions">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Rezepte</CardTitle>
                <Button size="sm" onClick={handleNewPrescription}>
                  <Plus className="mr-2 h-4 w-4" />
                  Neues Rezept
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rezept-ID</TableHead>
                    <TableHead>Datum</TableHead>
                    <TableHead>Produkt</TableHead>
                    <TableHead>Dosierung</TableHead>
                    <TableHead>Menge</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Gültig bis</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prescriptions.map((prescription) => (
                    <TableRow key={prescription.id}>
                      <TableCell className="font-medium">{prescription.id}</TableCell>
                      <TableCell>{prescription.date}</TableCell>
                      <TableCell>{prescription.product}</TableCell>
                      <TableCell>{prescription.dosage}</TableCell>
                      <TableCell>{prescription.quantity}</TableCell>
                      <TableCell>{getStatusBadge(prescription.status)}</TableCell>
                      <TableCell>{prescription.validUntil}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Termine</CardTitle>
                <Button size="sm" onClick={() => toast({
                  title: "Neuer Termin",
                  description: "Terminkalender wird geöffnet."
                })}>
                  <Plus className="mr-2 h-4 w-4" />
                  Neuer Termin
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Datum</TableHead>
                    <TableHead>Uhrzeit</TableHead>
                    <TableHead>Typ</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Notizen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment, index) => (
                    <TableRow key={index}>
                      <TableCell>{appointment.date}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{appointment.type}</Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                      <TableCell>{appointment.notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="findings">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Medizinische Befunde</CardTitle>
                <Button size="sm" onClick={() => toast({
                  title: "Neuer Befund",
                  description: "Befund-Editor wird geöffnet."
                })}>
                  <Plus className="mr-2 h-4 w-4" />
                  Neuer Befund
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Datum</TableHead>
                    <TableHead>Untersuchung</TableHead>
                    <TableHead>Ergebnis</TableHead>
                    <TableHead>Arzt/Labor</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medicalFindings.map((finding, index) => (
                    <TableRow key={index}>
                      <TableCell>{finding.date}</TableCell>
                      <TableCell>{finding.type}</TableCell>
                      <TableCell>{finding.result}</TableCell>
                      <TableCell>{finding.doctor}</TableCell>
                      <TableCell>
                        <Badge variant={finding.status === 'Normal' ? 'default' : 'outline'}>
                          {finding.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Arztnotizen</CardTitle>
                {!isEditingNotes ? (
                  <Button size="sm" onClick={() => setIsEditingNotes(true)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Bearbeiten
                  </Button>
                ) : (
                  <Button size="sm" onClick={handleSaveNotes}>
                    <Save className="mr-2 h-4 w-4" />
                    Speichern
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="notes">Interne Notizen (nur für Ärzte sichtbar)</Label>
                  <Textarea
                    id="notes"
                    value={notes || "Patient zeigt gute Compliance bei der Cannabis-Therapie. Schmerzreduktion von 8/10 auf 4/10. Keine Nebenwirkungen berichtet. Fortsetzung der aktuellen Dosierung empfohlen."}
                    onChange={(e) => setNotes(e.target.value)}
                    disabled={!isEditingNotes}
                    rows={8}
                    className="mt-2"
                    placeholder="Notizen zur Behandlung, Beobachtungen, Empfehlungen..."
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Letzte Bearbeitung: 03.06.2025 um 14:30 von Dr. Schmidt</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientRecordPage;
