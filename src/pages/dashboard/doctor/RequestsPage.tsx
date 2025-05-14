
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { toast } from "@/hooks/use-toast";
import { 
  FileText, 
  Calendar, 
  CheckCircle, 
  XCircle,
  Search,
  ClipboardList
} from "lucide-react";
import { Input } from "@/components/ui/input";

const RequestsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sample prescription requests data
  const prescriptionRequests = [
    { id: 1, patient: "Max Mustermann", symptoms: ["Chronische Schmerzen"], date: "Heute", status: "pending" },
    { id: 2, patient: "Anna Schmidt", symptoms: ["Schlafstörungen", "Angstzustände"], date: "Gestern", status: "pending" },
    { id: 3, patient: "Klaus Weber", symptoms: ["Rückenschmerzen"], date: "Vorgestern", status: "pending" },
    { id: 4, patient: "Lisa Müller", symptoms: ["Migräne"], date: "12.05.2025", status: "pending" },
    { id: 5, patient: "Thomas Bauer", symptoms: ["Appetitlosigkeit"], date: "10.05.2025", status: "pending" },
  ];

  // Sample appointment requests data
  const appointmentRequests = [
    { id: 1, patient: "Jana Hoffmann", reason: "Erstberatung", preferredDate: "15.06.2025", status: "pending" },
    { id: 2, patient: "Markus Klein", reason: "Folgeuntersuchung", preferredDate: "20.06.2025", status: "pending" },
    { id: 3, patient: "Sarah Wagner", reason: "Rezeptverlängerung", preferredDate: "25.06.2025", status: "pending" },
  ];

  const filteredPrescriptionRequests = prescriptionRequests.filter(request => 
    request.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.symptoms.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredAppointmentRequests = appointmentRequests.filter(request => 
    request.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.reason.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Behandlungsanfragen</h1>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Suchen..."
            className="pl-8 w-[250px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="prescriptions">
        <TabsList className="mb-4">
          <TabsTrigger value="prescriptions" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            Rezeptanfragen
          </TabsTrigger>
          <TabsTrigger value="appointments" className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            Terminanfragen
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="prescriptions">
          <Card>
            <CardHeader>
              <CardTitle>Rezeptanfragen</CardTitle>
              <CardDescription>Offene Anfragen zur Ausstellung von Rezepten</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Symptome</TableHead>
                    <TableHead>Datum</TableHead>
                    <TableHead className="text-right">Aktion</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPrescriptionRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{request.patient}</TableCell>
                      <TableCell>{request.symptoms.join(", ")}</TableCell>
                      <TableCell>{request.date}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            size="sm"
                            onClick={() => toast({
                              title: "Rezept ausgestellt",
                              description: `Rezept für ${request.patient} wurde ausgestellt.`
                            })}
                          >
                            <CheckCircle className="mr-1 h-4 w-4" />
                            Genehmigen
                          </Button>
                          <Button 
                            size="sm"
                            variant="outline"
                            onClick={() => toast({
                              title: "Rezept abgelehnt",
                              description: `Die Anfrage von ${request.patient} wurde abgelehnt.`
                            })}
                          >
                            <XCircle className="mr-1 h-4 w-4" />
                            Ablehnen
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}

                  {filteredPrescriptionRequests.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4">
                        Keine Rezeptanfragen gefunden
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>Terminanfragen</CardTitle>
              <CardDescription>Anfragen zur Vereinbarung von Terminen</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Grund</TableHead>
                    <TableHead>Gewünschtes Datum</TableHead>
                    <TableHead className="text-right">Aktion</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointmentRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{request.patient}</TableCell>
                      <TableCell>{request.reason}</TableCell>
                      <TableCell>{request.preferredDate}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            size="sm"
                            onClick={() => toast({
                              title: "Termin bestätigt",
                              description: `Termin für ${request.patient} am ${request.preferredDate} wurde bestätigt.`
                            })}
                          >
                            <Calendar className="mr-1 h-4 w-4" />
                            Bestätigen
                          </Button>
                          <Button 
                            size="sm"
                            variant="outline"
                            onClick={() => toast({
                              title: "Alternative vorgeschlagen",
                              description: `Eine Terminoption wurde ${request.patient} vorgeschlagen.`
                            })}
                          >
                            Alternative
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}

                  {filteredAppointmentRequests.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4">
                        Keine Terminanfragen gefunden
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <ClipboardList className="mr-2 h-5 w-5" />
              Aktuelle Übersicht
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-3">
              <div className="text-sm font-medium text-muted-foreground">Offene Rezeptanfragen</div>
              <div className="mt-2 text-2xl font-bold">{prescriptionRequests.length}</div>
            </div>
            <div className="rounded-lg border p-3">
              <div className="text-sm font-medium text-muted-foreground">Offene Terminanfragen</div>
              <div className="mt-2 text-2xl font-bold">{appointmentRequests.length}</div>
            </div>
            <div className="rounded-lg border p-3">
              <div className="text-sm font-medium text-muted-foreground">Ausgestellte Rezepte (Monat)</div>
              <div className="mt-2 text-2xl font-bold">28</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RequestsPage;
