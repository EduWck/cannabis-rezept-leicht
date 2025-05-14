
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Search, Download, Eye, PackageCheck } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AllOrdersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Sample order data
  const orders = [
    { 
      id: "ORD-1234", 
      patient: "Max Mustermann", 
      date: "14.05.2025", 
      status: "completed", 
      items: "Cannabis Blüten 10g", 
      amount: "€120,00",
      prescriptionId: "RX-1234"
    },
    { 
      id: "ORD-1235", 
      patient: "Anna Schmidt", 
      date: "13.05.2025", 
      status: "processing", 
      items: "Cannabis Extrakt 5ml", 
      amount: "€75,50",
      prescriptionId: "RX-1235"
    },
    { 
      id: "ORD-1236", 
      patient: "Klaus Weber", 
      date: "12.05.2025", 
      status: "shipped", 
      items: "Cannabis Öl 20ml", 
      amount: "€89,90",
      prescriptionId: "RX-1236"
    },
    { 
      id: "ORD-1237", 
      patient: "Lisa Müller", 
      date: "11.05.2025", 
      status: "pending", 
      items: "Cannabis Blüten 15g", 
      amount: "€180,00",
      prescriptionId: "RX-1237"
    },
    { 
      id: "ORD-1238", 
      patient: "Thomas Bauer", 
      date: "10.05.2025", 
      status: "completed", 
      items: "Cannabis Spray 10ml", 
      amount: "€65,00",
      prescriptionId: "RX-1238"
    },
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.prescriptionId.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Abgeschlossen</Badge>;
      case "processing":
        return <Badge className="bg-blue-500">In Bearbeitung</Badge>;
      case "shipped":
        return <Badge className="bg-purple-500">Versendet</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Ausstehend</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleExport = () => {
    toast({
      title: "Export gestartet",
      description: "Die Bestelldaten werden exportiert."
    });
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Alle Bestellungen</h1>
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
            placeholder="Nach Bestellung, Patient oder Rezept suchen..."
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
              <SelectItem value="pending">Ausstehend</SelectItem>
              <SelectItem value="processing">In Bearbeitung</SelectItem>
              <SelectItem value="shipped">Versendet</SelectItem>
              <SelectItem value="completed">Abgeschlossen</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bestellübersicht</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bestell-Nr.</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Datum</TableHead>
                <TableHead>Medikamente</TableHead>
                <TableHead>Betrag</TableHead>
                <TableHead>Rezept-Nr.</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.patient}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell>{order.prescriptionId}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => toast({
                          title: "Bestelldetails",
                          description: `Details für Bestellung ${order.id} werden angezeigt.`
                        })}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                      
                      {(order.status === "pending" || order.status === "processing") && (
                        <Button 
                          size="sm"
                          onClick={() => {
                            const nextStatus = order.status === "pending" ? "processing" : "shipped";
                            toast({
                              title: "Status aktualisiert",
                              description: `Bestellung ${order.id} wurde auf "${nextStatus === "processing" ? "In Bearbeitung" : "Versendet"}" gesetzt.`
                            });
                          }}
                        >
                          <PackageCheck className="h-4 w-4 mr-1" />
                          {order.status === "pending" ? "Bearbeiten" : "Versenden"}
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4">
                    Keine Bestellungen gefunden
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
            <CardTitle>Bestellstatistik</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Gesamtzahl Bestellungen:</span>
                <span className="font-medium">{orders.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Abgeschlossene Bestellungen:</span>
                <span className="font-medium">{orders.filter(o => o.status === "completed").length}</span>
              </div>
              <div className="flex justify-between">
                <span>Versendete Bestellungen:</span>
                <span className="font-medium">{orders.filter(o => o.status === "shipped").length}</span>
              </div>
              <div className="flex justify-between">
                <span>In Bearbeitung:</span>
                <span className="font-medium">{orders.filter(o => o.status === "processing").length}</span>
              </div>
              <div className="flex justify-between">
                <span>Ausstehende Bestellungen:</span>
                <span className="font-medium">{orders.filter(o => o.status === "pending").length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Umsatzübersicht</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-4">€530,40</div>
            <p className="text-sm text-muted-foreground">Gesamtumsatz (letzten 7 Tage)</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AllOrdersPage;
