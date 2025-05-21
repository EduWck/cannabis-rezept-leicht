
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  CheckCircle, 
  XCircle,
  Eye,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
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

const PharmacyPrescriptionsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewingPrescription, setViewingPrescription] = useState<any>(null);
  const [rejectReason, setRejectReason] = useState("");
  
  // Mock data - in real app would come from API
  const prescriptions = [
    {
      id: "RX-2023-001",
      patientName: "Max Mustermann",
      doctorName: "Dr. Sarah Schmidt",
      date: "2023-05-20",
      status: "pending",
      products: [
        { name: "Cannabisblüte THC18", dosage: "3x täglich 0.1g", quantity: "10g" },
      ],
    },
    {
      id: "RX-2023-002",
      patientName: "Anna Weber",
      doctorName: "Dr. Thomas Meyer",
      date: "2023-05-19",
      status: "pending",
      products: [
        { name: "CBD Öl 10%", dosage: "2x täglich 3 Tropfen", quantity: "30ml" },
      ],
    },
    {
      id: "RX-2023-003",
      patientName: "Julia Becker",
      doctorName: "Dr. Sarah Schmidt",
      date: "2023-05-18",
      status: "approved",
      products: [
        { name: "Cannabisblüte THC18", dosage: "2x täglich 0.15g", quantity: "10g" },
        { name: "CBD Öl 5%", dosage: "1x täglich 5 Tropfen", quantity: "30ml" },
      ],
    },
    {
      id: "RX-2023-004",
      patientName: "Thomas Fischer",
      doctorName: "Dr. Michael Schulz",
      date: "2023-05-17",
      status: "rejected",
      products: [
        { name: "CBD Öl 15%", dosage: "3x täglich 2 Tropfen", quantity: "50ml" },
      ],
      rejectionReason: "Unvollständige Dokumentation",
    },
  ];
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <Badge className="bg-yellow-500">Prüfung ausstehend</Badge>;
      case 'approved':
        return <Badge className="bg-green-500">Bestätigt</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">Abgelehnt</Badge>;
      default:
        return <Badge>Unbekannt</Badge>;
    }
  };
  
  const handleApprovePrescription = (prescriptionId: string) => {
    // In a real app, this would make an API call
    toast({
      title: "Rezept bestätigt",
      description: `Rezept ${prescriptionId} wurde bestätigt und für die Bearbeitung freigegeben.`,
    });
  };
  
  const handleRejectPrescription = (prescriptionId: string) => {
    // In a real app, this would make an API call
    toast({
      title: "Rezept abgelehnt",
      description: `Rezept ${prescriptionId} wurde abgelehnt. Grund: ${rejectReason}`,
    });
    setViewingPrescription(null);
    setRejectReason("");
  };
  
  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesSearch = 
      prescription.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      prescription.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.doctorName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || prescription.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Rezepte verwalten</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Rezepte filtern</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-2/3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Nach Rezept-ID, Patient oder Arzt suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-1/3">
                <SelectValue placeholder="Alle Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Status</SelectItem>
                <SelectItem value="pending">Prüfung ausstehend</SelectItem>
                <SelectItem value="approved">Bestätigt</SelectItem>
                <SelectItem value="rejected">Abgelehnt</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Rezeptübersicht</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rezept-ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Arzt</TableHead>
                <TableHead>Datum</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrescriptions.map((prescription) => (
                <TableRow key={prescription.id}>
                  <TableCell className="font-medium">{prescription.id}</TableCell>
                  <TableCell>{prescription.patientName}</TableCell>
                  <TableCell>{prescription.doctorName}</TableCell>
                  <TableCell>{new Date(prescription.date).toLocaleDateString('de-DE')}</TableCell>
                  <TableCell>{getStatusBadge(prescription.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => setViewingPrescription(prescription)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Ansehen
                      </Button>
                      
                      {prescription.status === 'pending' && (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="bg-green-50 hover:bg-green-100 border-green-200"
                            onClick={() => handleApprovePrescription(prescription.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                            Bestätigen
                          </Button>
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="bg-red-50 hover:bg-red-100 border-red-200"
                              >
                                <XCircle className="h-4 w-4 mr-1 text-red-500" />
                                Ablehnen
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Rezept ablehnen</DialogTitle>
                                <DialogDescription>
                                  Bitte geben Sie einen Grund für die Ablehnung des Rezepts {prescription.id} an.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="py-4">
                                <Label htmlFor="rejectionReason" className="block mb-2">Ablehnungsgrund</Label>
                                <Textarea
                                  id="rejectionReason"
                                  value={rejectReason}
                                  onChange={(e) => setRejectReason(e.target.value)}
                                  rows={4}
                                />
                              </div>
                              <DialogFooter>
                                <Button 
                                  variant="destructive" 
                                  onClick={() => handleRejectPrescription(prescription.id)}
                                >
                                  Rezept ablehnen
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredPrescriptions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Keine Rezepte gefunden.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Prescription Details Dialog */}
      <Dialog open={!!viewingPrescription} onOpenChange={(open) => !open && setViewingPrescription(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Rezeptdetails - {viewingPrescription?.id}</DialogTitle>
            <DialogDescription>
              Vollständige Informationen zum ausgewählten Rezept
            </DialogDescription>
          </DialogHeader>
          
          {viewingPrescription && (
            <div className="py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Patient</h3>
                  <p className="font-medium">{viewingPrescription.patientName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Verordnender Arzt</h3>
                  <p className="font-medium">{viewingPrescription.doctorName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Ausstellungsdatum</h3>
                  <p className="font-medium">{new Date(viewingPrescription.date).toLocaleDateString('de-DE')}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                  <p className="font-medium">{getStatusBadge(viewingPrescription.status)}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Verordnete Produkte</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produkt</TableHead>
                      <TableHead>Dosierung</TableHead>
                      <TableHead>Menge</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {viewingPrescription.products.map((product: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.dosage}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {viewingPrescription.status === 'rejected' && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Ablehnungsgrund</h3>
                  <p className="italic">{viewingPrescription.rejectionReason}</p>
                </div>
              )}
              
              {viewingPrescription.status === 'pending' && (
                <div className="flex justify-end space-x-2 pt-4">
                  <Button 
                    variant="outline"
                    className="bg-green-50 hover:bg-green-100 border-green-200"
                    onClick={() => handleApprovePrescription(viewingPrescription.id)}
                  >
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Rezept bestätigen
                  </Button>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline"
                        className="bg-red-50 hover:bg-red-100 border-red-200"
                      >
                        <XCircle className="h-4 w-4 mr-2 text-red-500" />
                        Rezept ablehnen
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Rezept ablehnen</DialogTitle>
                        <DialogDescription>
                          Bitte geben Sie einen Grund für die Ablehnung des Rezepts {viewingPrescription.id} an.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <Label htmlFor="rejectionReason2" className="block mb-2">Ablehnungsgrund</Label>
                        <Textarea
                          id="rejectionReason2"
                          value={rejectReason}
                          onChange={(e) => setRejectReason(e.target.value)}
                          rows={4}
                        />
                      </div>
                      <DialogFooter>
                        <Button 
                          variant="destructive" 
                          onClick={() => handleRejectPrescription(viewingPrescription.id)}
                        >
                          Rezept ablehnen
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PharmacyPrescriptionsPage;
