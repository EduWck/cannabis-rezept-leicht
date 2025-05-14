
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, Search, Plus, MoreHorizontal, Edit, FileCheck, Printer, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DoctorPrescriptionsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewPrescriptionDialog, setShowNewPrescriptionDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedMedication, setSelectedMedication] = useState("");
  const [selectedDosage, setSelectedDosage] = useState("");
  
  // Sample prescriptions data
  const activePrescriptions = [
    { id: 1, patient: "Max Mustermann", medication: "Cannabis Blüten THC 18%", dosage: "0.5g täglich", issuedDate: "01.05.2025", expiryDate: "01.08.2025", status: "Aktiv" },
    { id: 2, patient: "Anna Schmidt", medication: "CBD Öl 10%", dosage: "2 Tropfen 3x täglich", issuedDate: "28.04.2025", expiryDate: "28.07.2025", status: "Aktiv" },
    { id: 3, patient: "Thomas Weber", medication: "Cannabis Blüten THC 22%", dosage: "0.3g täglich", issuedDate: "15.04.2025", expiryDate: "15.07.2025", status: "Aktiv" },
    { id: 4, patient: "Lisa Müller", medication: "Cannabis Extrakt THC:CBD 1:1", dosage: "0.2ml 2x täglich", issuedDate: "10.04.2025", expiryDate: "10.07.2025", status: "Aktiv" },
  ];
  
  const expiredPrescriptions = [
    { id: 5, patient: "Klaus Schulz", medication: "Cannabis Blüten THC 20%", dosage: "0.4g täglich", issuedDate: "01.02.2025", expiryDate: "01.05.2025", status: "Abgelaufen" },
    { id: 6, patient: "Petra Meier", medication: "CBD Öl 5%", dosage: "1 Tropfen 2x täglich", issuedDate: "15.01.2025", expiryDate: "15.04.2025", status: "Abgelaufen" }
  ];
  
  const filteredActive = activePrescriptions.filter(prescription => 
    prescription.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prescription.medication.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prescription.dosage.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredExpired = expiredPrescriptions.filter(prescription => 
    prescription.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prescription.medication.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prescription.dosage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreatePrescription = () => {
    if (!selectedPatient || !selectedMedication || !selectedDosage) {
      toast({
        title: "Fehlende Angaben",
        description: "Bitte füllen Sie alle erforderlichen Felder aus.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Rezept erstellt",
      description: `Rezept für ${selectedPatient} wurde erfolgreich ausgestellt.`
    });
    
    setShowNewPrescriptionDialog(false);
    setSelectedPatient("");
    setSelectedMedication("");
    setSelectedDosage("");
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Rezepte verwalten</h1>
        <div className="flex items-center gap-3">
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
          <Dialog open={showNewPrescriptionDialog} onOpenChange={setShowNewPrescriptionDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Neues Rezept
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Neues Rezept ausstellen</DialogTitle>
                <DialogDescription>
                  Füllen Sie alle Felder aus, um ein neues Rezept zu erstellen.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="patient" className="text-right">
                    Patient
                  </label>
                  <div className="col-span-3">
                    <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                      <SelectTrigger>
                        <SelectValue placeholder="Patient auswählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Max Mustermann">Max Mustermann</SelectItem>
                        <SelectItem value="Anna Schmidt">Anna Schmidt</SelectItem>
                        <SelectItem value="Thomas Weber">Thomas Weber</SelectItem>
                        <SelectItem value="Lisa Müller">Lisa Müller</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="medication" className="text-right">
                    Medikament
                  </label>
                  <div className="col-span-3">
                    <Select value={selectedMedication} onValueChange={setSelectedMedication}>
                      <SelectTrigger>
                        <SelectValue placeholder="Medikament auswählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cannabis Blüten THC 18%">Cannabis Blüten THC 18%</SelectItem>
                        <SelectItem value="Cannabis Blüten THC 22%">Cannabis Blüten THC 22%</SelectItem>
                        <SelectItem value="CBD Öl 10%">CBD Öl 10%</SelectItem>
                        <SelectItem value="CBD Öl 5%">CBD Öl 5%</SelectItem>
                        <SelectItem value="Cannabis Extrakt THC:CBD 1:1">Cannabis Extrakt THC:CBD 1:1</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="dosage" className="text-right">
                    Dosierung
                  </label>
                  <div className="col-span-3">
                    <Select value={selectedDosage} onValueChange={setSelectedDosage}>
                      <SelectTrigger>
                        <SelectValue placeholder="Dosierung auswählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.3g täglich">0.3g täglich</SelectItem>
                        <SelectItem value="0.5g täglich">0.5g täglich</SelectItem>
                        <SelectItem value="1.0g täglich">1.0g täglich</SelectItem>
                        <SelectItem value="2 Tropfen 3x täglich">2 Tropfen 3x täglich</SelectItem>
                        <SelectItem value="0.2ml 2x täglich">0.2ml 2x täglich</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowNewPrescriptionDialog(false)}>
                  Abbrechen
                </Button>
                <Button onClick={handleCreatePrescription}>
                  Rezept ausstellen
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="active">
        <TabsList className="mb-4">
          <TabsTrigger value="active" className="flex items-center">
            <FileCheck className="mr-2 h-4 w-4" />
            Aktive Rezepte
          </TabsTrigger>
          <TabsTrigger value="expired" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            Abgelaufene Rezepte
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Aktive Rezepte</CardTitle>
              <CardDescription>Aktuelle ausgestellte und gültige Rezepte</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Medikament</TableHead>
                    <TableHead>Dosierung</TableHead>
                    <TableHead>Ausstellungsdatum</TableHead>
                    <TableHead>Gültig bis</TableHead>
                    <TableHead className="text-right">Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredActive.map((prescription) => (
                    <TableRow key={prescription.id}>
                      <TableCell className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        {prescription.patient}
                      </TableCell>
                      <TableCell>{prescription.medication}</TableCell>
                      <TableCell>{prescription.dosage}</TableCell>
                      <TableCell>{prescription.issuedDate}</TableCell>
                      <TableCell>{prescription.expiryDate}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <span className="sr-only">Menü öffnen</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Aktionen</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => toast({ title: "Rezept bearbeiten", description: `Rezept für ${prescription.patient} wird bearbeitet.`})}>
                              <Edit className="mr-2 h-4 w-4" /> Bearbeiten
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toast({ title: "Rezept drucken", description: `Rezept für ${prescription.patient} wird gedruckt.`})}>
                              <Printer className="mr-2 h-4 w-4" /> Drucken
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600" 
                              onClick={() => toast({
                                title: "Rezept storniert", 
                                description: `Rezept für ${prescription.patient} wurde storniert.`
                              })}
                            >
                              Stornieren
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}

                  {filteredActive.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        Keine aktiven Rezepte gefunden
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="expired">
          <Card>
            <CardHeader>
              <CardTitle>Abgelaufene Rezepte</CardTitle>
              <CardDescription>Rezepte, deren Gültigkeitszeitraum abgelaufen ist</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Medikament</TableHead>
                    <TableHead>Dosierung</TableHead>
                    <TableHead>Ausstellungsdatum</TableHead>
                    <TableHead>Ablaufdatum</TableHead>
                    <TableHead className="text-right">Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExpired.map((prescription) => (
                    <TableRow key={prescription.id}>
                      <TableCell className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        {prescription.patient}
                      </TableCell>
                      <TableCell>{prescription.medication}</TableCell>
                      <TableCell>{prescription.dosage}</TableCell>
                      <TableCell>{prescription.issuedDate}</TableCell>
                      <TableCell>{prescription.expiryDate}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toast({
                            title: "Rezept erneuert",
                            description: `Ein neues Rezept für ${prescription.patient} wurde erstellt.`
                          })}
                        >
                          Erneuern
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}

                  {filteredExpired.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        Keine abgelaufenen Rezepte gefunden
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DoctorPrescriptionsPage;
