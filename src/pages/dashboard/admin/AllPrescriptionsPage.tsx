
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Search, Filter, FileText, Download } from "lucide-react";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AllPrescriptionsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Sample prescription data
  const prescriptions = [
    { id: "RX-1234", patient: "Max Mustermann", doctor: "Dr. Schmidt", date: "14.05.2025", status: "approved", items: "Cannabis Blüten 10g" },
    { id: "RX-1235", patient: "Anna Schmidt", doctor: "Dr. Müller", date: "13.05.2025", status: "pending", items: "Cannabis Extrakt 5ml" },
    { id: "RX-1236", patient: "Klaus Weber", doctor: "Dr. Schmidt", date: "12.05.2025", status: "approved", items: "Cannabis Öl 20ml" },
    { id: "RX-1237", patient: "Lisa Müller", doctor: "Dr. Weber", date: "11.05.2025", status: "rejected", items: "Cannabis Blüten 15g" },
    { id: "RX-1238", patient: "Thomas Bauer", doctor: "Dr. Müller", date: "10.05.2025", status: "approved", items: "Cannabis Spray 10ml" },
    { id: "RX-1239", patient: "Jana Hoffmann", doctor: "Dr. Schmidt", date: "09.05.2025", status: "pending", items: "Cannabis Blüten 5g" },
    { id: "RX-1240", patient: "Markus Klein", doctor: "Dr. Weber", date: "08.05.2025", status: "approved", items: "Cannabis Kapseln 30 Stk" },
  ];

  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesSearch = 
      prescription.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.items.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter === "all" || prescription.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Genehmigt</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">In Bearbeitung</Badge>;
      case "rejected":
        return <Badge className="bg-red-500">Abgelehnt</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleExport = () => {
    toast({
      title: "Export gestartet",
      description: "Die Rezeptdaten werden exportiert."
    });
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Alle Rezepte</h1>
        <Button onClick={handleExport} className="flex items-center">
          <Download className="mr-2 h-4 w-4" />
          Exportieren
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Nach Rezept, Patient oder Arzt suchen..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-full md:w-[200px]">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Status Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Status</SelectItem>
              <SelectItem value="approved">Genehmigt</SelectItem>
              <SelectItem value="pending">In Bearbeitung</SelectItem>
              <SelectItem value="rejected">Abgelehnt</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rezeptübersicht</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rezept-Nr.</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Arzt</TableHead>
                <TableHead>Datum</TableHead>
                <TableHead>Medikamente</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrescriptions.map((prescription) => (
                <TableRow key={prescription.id}>
                  <TableCell>{prescription.id}</TableCell>
                  <TableCell>{prescription.patient}</TableCell>
                  <TableCell>{prescription.doctor}</TableCell>
                  <TableCell>{prescription.date}</TableCell>
                  <TableCell>{prescription.items}</TableCell>
                  <TableCell>{getStatusBadge(prescription.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          Aktionen
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => toast({
                          title: "Rezeptdetails",
                          description: `Details für Rezept ${prescription.id} werden angezeigt.`
                        })}>
                          <FileText className="mr-2 h-4 w-4" />
                          Details anzeigen
                        </DropdownMenuItem>
                        {prescription.status === "pending" && (
                          <>
                            <DropdownMenuItem onClick={() => toast({
                              title: "Rezept genehmigt",
                              description: `Rezept ${prescription.id} wurde genehmigt.`
                            })}>
                              Genehmigen
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toast({
                              title: "Rezept abgelehnt",
                              description: `Rezept ${prescription.id} wurde abgelehnt.`
                            })}>
                              Ablehnen
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem onClick={() => toast({
                          title: "Rezept gedruckt",
                          description: `Rezept ${prescription.id} wird gedruckt.`
                        })}>
                          Drucken
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredPrescriptions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    Keine Rezepte gefunden
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Rezeptstatistik</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Gesamtzahl Rezepte:</span>
                <span className="font-medium">{prescriptions.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Genehmigte Rezepte:</span>
                <span className="font-medium">{prescriptions.filter(p => p.status === "approved").length}</span>
              </div>
              <div className="flex justify-between">
                <span>In Bearbeitung:</span>
                <span className="font-medium">{prescriptions.filter(p => p.status === "pending").length}</span>
              </div>
              <div className="flex justify-between">
                <span>Abgelehnte Rezepte:</span>
                <span className="font-medium">{prescriptions.filter(p => p.status === "rejected").length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AllPrescriptionsPage;
