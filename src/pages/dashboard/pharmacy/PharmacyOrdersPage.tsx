
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Package, 
  Search,
  Trash,
  CheckCheck
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const PharmacyOrdersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Mock data - in real app would come from API
  const orders = [
    {
      id: "ORD-2023-001",
      patientName: "Max Mustermann",
      date: "2023-05-20",
      status: "pending",
      items: [
        { name: "Cannabisblüte THC18", quantity: 10, price: 12.99 },
        { name: "CBD Öl 10%", quantity: 1, price: 29.99 },
      ],
      total: 159.89,
    },
    {
      id: "ORD-2023-002",
      patientName: "Anna Schmidt",
      date: "2023-05-19",
      status: "processing",
      items: [
        { name: "Cannabisblüte THC22", quantity: 5, price: 14.99 },
      ],
      total: 74.95,
    },
    {
      id: "ORD-2023-003",
      patientName: "Julia Weber",
      date: "2023-05-18",
      status: "shipped",
      items: [
        { name: "Cannabisblüte THC18", quantity: 5, price: 12.99 },
        { name: "CBD Öl 5%", quantity: 2, price: 19.99 },
      ],
      total: 104.93,
    },
    {
      id: "ORD-2023-004",
      patientName: "Thomas Becker",
      date: "2023-05-17",
      status: "delivered",
      items: [
        { name: "CBD Öl 15%", quantity: 1, price: 39.99 },
      ],
      total: 39.99,
    },
  ];
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <Badge className="bg-yellow-500">Wartend</Badge>;
      case 'processing':
        return <Badge className="bg-blue-500">In Bearbeitung</Badge>;
      case 'shipped':
        return <Badge className="bg-purple-500">Versandt</Badge>;
      case 'delivered':
        return <Badge className="bg-green-500">Geliefert</Badge>;
      default:
        return <Badge>Unbekannt</Badge>;
    }
  };
  
  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    // In a real app, this would make an API call
    toast({
      title: "Status aktualisiert",
      description: `Bestellung ${orderId} wurde auf "${newStatus}" aktualisiert.`,
    });
  };
  
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         order.patientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Bestellungen verwalten</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Bestellungen filtern</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-2/3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Nach Bestellnummer oder Patient suchen..."
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
                <SelectItem value="pending">Wartend</SelectItem>
                <SelectItem value="processing">In Bearbeitung</SelectItem>
                <SelectItem value="shipped">Versandt</SelectItem>
                <SelectItem value="delivered">Geliefert</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Bestellübersicht</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bestellung</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Datum</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Betrag</TableHead>
                <TableHead>Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.patientName}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString('de-DE')}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="text-right">{order.total.toFixed(2)} €</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {order.status === 'pending' && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleStatusUpdate(order.id, 'In Bearbeitung')}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Bestätigen
                        </Button>
                      )}
                      {order.status === 'processing' && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleStatusUpdate(order.id, 'Versandt')}
                        >
                          <Package className="h-4 w-4 mr-1" />
                          Versenden
                        </Button>
                      )}
                      {order.status === 'shipped' && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleStatusUpdate(order.id, 'Geliefert')}
                        >
                          <CheckCheck className="h-4 w-4 mr-1" />
                          Geliefert
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Keine Bestellungen gefunden.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PharmacyOrdersPage;
