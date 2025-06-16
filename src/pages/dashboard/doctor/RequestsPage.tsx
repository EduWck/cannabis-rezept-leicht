
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";
import { 
  FileText, 
  Calendar, 
  CheckCircle, 
  XCircle,
  Search,
  ClipboardList,
  Eye,
  MessageSquare,
  Clock
} from "lucide-react";
import { Input } from "@/components/ui/input";

const RequestsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  // Sample prescription requests data with enhanced information
  const prescriptionRequests = [
    { 
      id: "REQ-001", 
      patient: "Max Mustermann", 
      patientId: "P-12345",
      symptoms: ["Chronische Schmerzen"], 
      date: "Heute", 
      time: "14:30",
      status: "pending",
      priority: "hoch",
      type: "Cannabis-Rezept"
    },
    { 
      id: "REQ-002", 
      patient: "Anna Schmidt", 
      patientId: "P-12346",
      symptoms: ["Schlafstörungen", "Angstzustände"], 
      date: "Gestern", 
      time: "09:15",
      status: "pending",
      priority: "mittel",
      type: "Cannabis-Rezept"
    },
    { 
      id: "REQ-003", 
      patient: "Klaus Weber", 
      patientId: "P-12347",
      symptoms: ["Rückenschmerzen"], 
      date: "Vorgestern", 
      time: "16:45",
      status: "pending",
      priority: "niedrig",
      type: "Cannabis-Rezept"
    },
    { 
      id: "REQ-004", 
      patient: "Lisa Müller", 
      patientId: "P-12348",
      symptoms: ["Migräne"], 
      date: "12.05.2025", 
      time: "11:20",
      status: "pending",
      priority: "hoch",
      type: "Cannabis-Rezept"
    },
    { 
      id: "REQ-005", 
      patient: "Thomas Bauer", 
      patientId: "P-12349",
      symptoms: ["Appetitlosigkeit"], 
      date: "10.05.2025", 
      time: "13:10",
      status: "pending",
      priority: "mittel",
      type: "Cannabis-Rezept"
    },
  ];

  // Sample appointment requests data with enhanced information
  const appointmentRequests = [
    { 
      id: "APP-001", 
      patient: "Jana Hoffmann", 
      patientId: "P-12350",
      reason: "Erstberatung", 
      preferredDate: "15.06.2025", 
      time: "10:00",
      status: "pending",
      priority: "hoch",
      type: "Ersttermin"
    },
    { 
      id: "APP-002", 
      patient: "Markus Klein", 
      patientId: "P-12351",
      reason: "Folgeuntersuchung", 
      preferredDate: "20.06.2025", 
      time: "14:30",
      status: "pending",
      priority: "mittel",
      type: "Folgetermin"
    },
    { 
      id: "APP-003", 
      patient: "Sarah Wagner", 
      patientId: "P-12352",
      reason: "Rezeptverlängerung", 
      preferredDate: "25.06.2025", 
      time: "09:15",
      status: "pending",
      priority: "niedrig",
      type: "Verlängerung"
    },
  ];

  const filteredPrescriptionRequests = prescriptionRequests.filter(request => 
    request.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.symptoms.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
    request.patientId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAppointmentRequests = appointmentRequests.filter(request => 
    request.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.patientId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <Badge className="bg-yellow-500 text-white">Wartend</Badge>;
      case 'approved':
        return <Badge className="bg-green-500 text-white">Genehmigt</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500 text-white">Abgelehnt</Badge>;
      default:
        return <Badge variant="outline">Unbekannt</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'hoch':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Hoch</Badge>;
      case 'mittel':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Mittel</Badge>;
      case 'niedrig':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Niedrig</Badge>;
      default:
        return <Badge variant="outline">Normal</Badge>;
    }
  };

  const handleApprove = (request: any, type: string) => {
    toast({
      title: type === 'prescription' ? "Rezept genehmigt" : "Termin bestätigt",
      description: `${type === 'prescription' ? 'Rezept für' : 'Termin für'} ${request.patient} wurde ${type === 'prescription' ? 'genehmigt' : 'bestätigt'}.`
    });
  };

  const handleReject = (request: any, type: string) => {
    toast({
      title: type === 'prescription' ? "Rezept abgelehnt" : "Termin abgelehnt",
      description: `Die Anfrage von ${request.patient} wurde abgelehnt.`,
      variant: "destructive"
    });
  };

  const handleViewDetails = (id: string) => {
    navigate(`/dashboard/requests/${id}`);
  };

  return (
    <TooltipProvider>
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
                      <TableHead>Datum/Zeit</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Dringlichkeit</TableHead>
                      <TableHead className="text-right">Aktionen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPrescriptionRequests.map((request) => (
                      <TableRow key={request.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div>
                            <p className="font-medium">{request.patient}</p>
                            <p className="text-sm text-muted-foreground">{request.patientId}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {request.symptoms.map((symptom, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {symptom}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <Clock className="mr-1 h-3 w-3" />
                            <div>
                              <p>{request.date}</p>
                              <p className="text-muted-foreground">{request.time}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(request.status)}
                        </TableCell>
                        <TableCell>
                          {getPriorityBadge(request.priority)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleViewDetails(request.id)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Details anzeigen</p>
                              </TooltipContent>
                            </Tooltip>
                            
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleApprove(request, 'prescription')}
                                  className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Rezept genehmigen</p>
                              </TooltipContent>
                            </Tooltip>
                            
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => {}}
                                  className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                >
                                  <MessageSquare className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Nachfrage stellen</p>
                              </TooltipContent>
                            </Tooltip>
                            
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleReject(request, 'prescription')}
                                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Rezept ablehnen</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}

                    {filteredPrescriptionRequests.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <FileText className="h-8 w-8 mb-2" />
                            <p>Keine Rezeptanfragen gefunden</p>
                          </div>
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
                      <TableHead>Status</TableHead>
                      <TableHead>Dringlichkeit</TableHead>
                      <TableHead className="text-right">Aktionen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAppointmentRequests.map((request) => (
                      <TableRow key={request.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div>
                            <p className="font-medium">{request.patient}</p>
                            <p className="text-sm text-muted-foreground">{request.patientId}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p>{request.reason}</p>
                            <Badge variant="outline" className="text-xs mt-1">
                              {request.type}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <Calendar className="mr-1 h-3 w-3" />
                            <div>
                              <p>{request.preferredDate}</p>
                              <p className="text-muted-foreground">{request.time}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(request.status)}
                        </TableCell>
                        <TableCell>
                          {getPriorityBadge(request.priority)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleViewDetails(request.id)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Details anzeigen</p>
                              </TooltipContent>
                            </Tooltip>
                            
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleApprove(request, 'appointment')}
                                  className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Termin bestätigen</p>
                              </TooltipContent>
                            </Tooltip>
                            
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => {}}
                                  className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                >
                                  <MessageSquare className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Nachfrage stellen</p>
                              </TooltipContent>
                            </Tooltip>
                            
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleReject(request, 'appointment')}
                                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Termin ablehnen</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}

                    {filteredAppointmentRequests.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <Calendar className="h-8 w-8 mb-2" />
                            <p>Keine Terminanfragen gefunden</p>
                          </div>
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
    </TooltipProvider>
  );
};

export default RequestsPage;
