
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card,
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Users, 
  FileText, 
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  MessageSquare,
  Stethoscope,
  ClipboardList
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [approvalComment, setApprovalComment] = useState("");
  const [rejectionComment, setRejectionComment] = useState("");
  const [internalNotes, setInternalNotes] = useState("");
  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false);
  const [isRejectionDialogOpen, setIsRejectionDialogOpen] = useState(false);
  const [isNotesDialogOpen, setIsNotesDialogOpen] = useState(false);
  
  // Mock data - in real app would come from API
  const todayStats = {
    newCases: 8,
    pendingReviews: 12,
    approvedToday: 15,
    appointmentsToday: 6
  };

  const recentCases = [
    {
      id: "RX-2023-001",
      patientName: "Max Mustermann",
      patientId: "P-001",
      submittedAt: "2023-12-15T10:30:00",
      status: "pending_review",
      urgency: "normal",
      symptoms: ["Chronische Schmerzen", "Schlafstörungen"],
      previousTreatments: ["Ibuprofen", "Physiotherapie"],
      questionnaire: {
        painLevel: 7,
        duration: "6 Monate",
        previousCannabisUse: false
      }
    },
    {
      id: "RX-2023-002",
      patientName: "Anna Weber", 
      patientId: "P-002",
      submittedAt: "2023-12-15T09:15:00",
      status: "pending_review",
      urgency: "high",
      symptoms: ["Epilepsie", "Angststörungen"],
      previousTreatments: ["Levetiracetam", "Lorazepam"],
      questionnaire: {
        painLevel: 8,
        duration: "2 Jahre",
        previousCannabisUse: true
      }
    },
    {
      id: "RX-2023-003",
      patientName: "Thomas Fischer",
      patientId: "P-003", 
      submittedAt: "2023-12-14T16:45:00",
      status: "approved",
      urgency: "normal",
      symptoms: ["Multiple Sklerose", "Muskelspastik"],
      previousTreatments: ["Baclofen", "Gabapentin"],
      approvedAt: "2023-12-15T08:30:00",
      prescribedProducts: ["CBD Öl 10%", "Cannabisblüte THC18"]
    }
  ];

  const upcomingAppointments = [
    {
      id: "APT-001",
      patientName: "Julia Becker",
      time: "14:00",
      type: "Erstberatung",
      duration: "45 min"
    },
    {
      id: "APT-002", 
      patientName: "Robert Klaus",
      time: "15:30",
      type: "Verlaufskontrolle",
      duration: "30 min"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending_review':
        return <Badge className="bg-yellow-500"><Clock className="w-3 h-3 mr-1" />Wartend</Badge>;
      case 'approved':
        return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Freigegeben</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500"><XCircle className="w-3 h-3 mr-1" />Abgelehnt</Badge>;
      default:
        return <Badge>Unbekannt</Badge>;
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch(urgency) {
      case 'high':
        return <Badge variant="destructive"><AlertCircle className="w-3 h-3 mr-1" />Dringend</Badge>;
      case 'normal':
        return <Badge variant="outline">Normal</Badge>;
      case 'low':
        return <Badge variant="secondary">Niedrig</Badge>;
      default:
        return <Badge>-</Badge>;
    }
  };

  const handleApproveCase = (caseItem: any) => {
    setSelectedCase(caseItem);
    setIsApprovalDialogOpen(true);
  };

  const handleRejectCase = (caseItem: any) => {
    setSelectedCase(caseItem);
    setIsRejectionDialogOpen(true);
  };

  const handleAddNotes = (caseItem: any) => {
    setSelectedCase(caseItem);
    setIsNotesDialogOpen(true);
  };

  const confirmApproval = () => {
    toast({
      title: "Rezept freigegeben",
      description: `Rezept ${selectedCase?.id} wurde erfolgreich freigegeben.`,
    });
    setIsApprovalDialogOpen(false);
    setSelectedCase(null);
    setApprovalComment("");
  };

  const confirmRejection = () => {
    if (!rejectionComment.trim()) {
      toast({
        title: "Begründung erforderlich",
        description: "Bitte geben Sie einen Grund für die Ablehnung an.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Rezept abgelehnt",
      description: `Rezept ${selectedCase?.id} wurde abgelehnt.`,
    });
    setIsRejectionDialogOpen(false);
    setSelectedCase(null);
    setRejectionComment("");
  };

  const saveNotes = () => {
    toast({
      title: "Notizen gespeichert",
      description: `Interne Notizen für ${selectedCase?.id} wurden gespeichert.`,
    });
    setIsNotesDialogOpen(false);
    setSelectedCase(null);
    setInternalNotes("");
  };

  return (
    <div className="space-y-6">
      {/* Header mit Statistiken */}
      <div>
        <h1 className="text-2xl font-bold mb-6">Ärzte-Dashboard</h1>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Neue Fälle heute</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{todayStats.newCases}</div>
                <ClipboardList className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Zur Bearbeitung</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Wartende Prüfungen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{todayStats.pendingReviews}</div>
                <Clock className="h-5 w-5 text-yellow-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Benötigen Aufmerksamkeit</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Freigaben heute</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{todayStats.approvedToday}</div>
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Bearbeitete Rezepte</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Termine heute</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{todayStats.appointmentsToday}</div>
                <Calendar className="h-5 w-5 text-purple-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Anstehende Termine</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Aktuelle Fälle */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Aktuelle Fälle
              </CardTitle>
              <CardDescription>Rezeptanträge zur Bearbeitung</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Eingegangen</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Dringlichkeit</TableHead>
                    <TableHead>Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentCases.map((caseItem) => (
                    <TableRow key={caseItem.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{caseItem.patientName}</p>
                          <p className="text-sm text-muted-foreground">{caseItem.id}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">
                            {new Date(caseItem.submittedAt).toLocaleDateString('de-DE')}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(caseItem.submittedAt).toLocaleTimeString('de-DE', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(caseItem.status)}</TableCell>
                      <TableCell>{getUrgencyBadge(caseItem.urgency)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => navigate(`/dashboard/requests/${caseItem.id}`)}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          
                          {caseItem.status === 'pending_review' && (
                            <>
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="bg-green-50 hover:bg-green-100 border-green-200"
                                onClick={() => handleApproveCase(caseItem)}
                              >
                                <CheckCircle className="h-3 w-3 text-green-600" />
                              </Button>
                              
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="bg-red-50 hover:bg-red-100 border-red-200"
                                onClick={() => handleRejectCase(caseItem)}
                              >
                                <XCircle className="h-3 w-3 text-red-600" />
                              </Button>
                            </>
                          )}
                          
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleAddNotes(caseItem)}
                          >
                            <MessageSquare className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <Button 
                variant="outline" 
                className="w-full mt-4" 
                onClick={() => navigate("/dashboard/requests")}
              >
                Alle Anfragen anzeigen
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar mit Terminen und Quick Actions */}
        <div className="space-y-6">
          {/* Heutige Termine */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Heutige Termine
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{appointment.patientName}</p>
                      <p className="text-xs text-muted-foreground">{appointment.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{appointment.time}</p>
                      <p className="text-xs text-muted-foreground">{appointment.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button 
                variant="outline" 
                className="w-full mt-4" 
                onClick={() => navigate("/dashboard/calendar")}
              >
                Alle Termine anzeigen
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Schnellzugriffe</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => navigate("/dashboard/patients")}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Patienten verwalten
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => navigate("/dashboard/calendar")}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Terminkalender
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => navigate("/dashboard/requests")}
                >
                  <ClipboardList className="mr-2 h-4 w-4" />
                  Alle Anfragen
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => navigate("/dashboard/profile")}
                >
                  <Stethoscope className="mr-2 h-4 w-4" />
                  Profil bearbeiten
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Approval Dialog */}
      <Dialog open={isApprovalDialogOpen} onOpenChange={setIsApprovalDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rezept freigeben</DialogTitle>
            <DialogDescription>
              Möchten Sie das Rezept {selectedCase?.id} für {selectedCase?.patientName} freigeben?
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Label htmlFor="approvalComment" className="block mb-2">Kommentar (optional)</Label>
            <Textarea
              id="approvalComment"
              value={approvalComment}
              onChange={(e) => setApprovalComment(e.target.value)}
              placeholder="Zusätzliche Hinweise für den Patienten..."
              rows={3}
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApprovalDialogOpen(false)}>
              Abbrechen
            </Button>
            <Button onClick={confirmApproval} className="bg-green-600 hover:bg-green-700">
              Freigeben
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rejection Dialog */}
      <Dialog open={isRejectionDialogOpen} onOpenChange={setIsRejectionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rezept ablehnen</DialogTitle>
            <DialogDescription>
              Bitte geben Sie einen Grund für die Ablehnung des Rezepts {selectedCase?.id} an.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Label htmlFor="rejectionComment" className="block mb-2">Ablehnungsgrund *</Label>
            <Textarea
              id="rejectionComment"
              value={rejectionComment}
              onChange={(e) => setRejectionComment(e.target.value)}
              placeholder="Begründung für die Ablehnung..."
              rows={4}
              required
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectionDialogOpen(false)}>
              Abbrechen
            </Button>
            <Button variant="destructive" onClick={confirmRejection}>
              Ablehnen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Notes Dialog */}
      <Dialog open={isNotesDialogOpen} onOpenChange={setIsNotesDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Interne Notizen</DialogTitle>
            <DialogDescription>
              Fügen Sie interne Notizen zu {selectedCase?.patientName} ({selectedCase?.id}) hinzu.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Label htmlFor="internalNotes" className="block mb-2">Notizen (nur für Ärzte sichtbar)</Label>
            <Textarea
              id="internalNotes"
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
              placeholder="Interne Notizen zum Fall..."
              rows={5}
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNotesDialogOpen(false)}>
              Abbrechen
            </Button>
            <Button onClick={saveNotes}>
              Notizen speichern
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DoctorDashboard;
