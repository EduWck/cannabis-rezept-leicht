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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  CheckCircle, 
  Package, 
  Search,
  Calendar,
  Truck,
  Eye,
  Edit3,
  MapPin,
  Clock,
  Plus,
  Filter,
  MoreHorizontal,
  Check,
  X
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-is-mobile";

interface OrderItem {
  name: string;
  orderedGrams: number;
  totalStockGrams: number;
}

interface Order {
  id: string;
  prescriptionId: string;
  patientName: string;
  patientAddress: string;
  items: OrderItem[];
  shippingMethod: "dhl" | "kurier" | "abholung";
  totalAmount: number;
  status: "neu" | "in_bearbeitung" | "versendet" | "zugestellt";
  createdAt: string;
  lastUpdated: string;
  trackingId?: string;
  shippingDate?: string;
  notes?: string;
}

const PharmacyOrdersPage = () => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [shippingFilter, setShippingFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  // Vereinfachte Mock-Daten mit nur Gramm-Angaben
  const orders: Order[] = [
    {
      id: "ORD-2023-001",
      prescriptionId: "RX-2023-101",
      patientName: "Max Mustermann",
      patientAddress: "Hauptstr. 123, 10115 Berlin",
      items: [
        { 
          name: "Cannabisblüte THC18", 
          orderedGrams: 20, 
          totalStockGrams: 250
        },
        { 
          name: "CBD Öl 10%", 
          orderedGrams: 0, // Öl wird nicht in Gramm gemessen
          totalStockGrams: 0
        },
      ],
      shippingMethod: "dhl",
      totalAmount: 159.89,
      status: "neu",
      createdAt: "2023-05-20",
      lastUpdated: "2023-05-20",
    },
    {
      id: "ORD-2023-002",
      prescriptionId: "RX-2023-102",
      patientName: "Anna Schmidt",
      patientAddress: "Musterweg 45, 20095 Hamburg",
      items: [
        { 
          name: "Cannabisblüte THC22", 
          orderedGrams: 25, 
          totalStockGrams: 125
        },
      ],
      shippingMethod: "kurier",
      totalAmount: 74.95,
      status: "in_bearbeitung",
      createdAt: "2023-05-19",
      lastUpdated: "2023-05-20",
      trackingId: "1Z999AA1234567890",
    },
    {
      id: "ORD-2023-003",
      prescriptionId: "RX-2023-103",
      patientName: "Julia Weber",
      patientAddress: "Gartenstr. 78, 80331 München",
      items: [
        { 
          name: "Cannabisblüte THC18", 
          orderedGrams: 10, 
          totalStockGrams: 250
        },
        { 
          name: "CBD Öl 5%", 
          orderedGrams: 0, 
          totalStockGrams: 0
        },
      ],
      shippingMethod: "dhl",
      totalAmount: 104.93,
      status: "versendet",
      createdAt: "2023-05-18",
      lastUpdated: "2023-05-19",
      trackingId: "1Z999AA0987654321",
      shippingDate: "2023-05-19",
    },
    {
      id: "ORD-2023-004",
      prescriptionId: "RX-2023-104",
      patientName: "Thomas Becker",
      patientAddress: "Lindenallee 12, 50667 Köln",
      items: [
        { 
          name: "CBD Öl 15%", 
          orderedGrams: 0, 
          totalStockGrams: 0
        },
      ],
      shippingMethod: "abholung",
      totalAmount: 39.99,
      status: "zugestellt",
      createdAt: "2023-05-17",
      lastUpdated: "2023-05-18",
    },
  ];
  
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      neu: { label: "Neu", className: "bg-gray-100 text-gray-800 border-gray-300" },
      in_bearbeitung: { label: "In Bearbeitung", className: "bg-yellow-100 text-yellow-800 border-yellow-300" },
      versendet: { label: "Versendet", className: "bg-green-100 text-green-800 border-green-300" },
      zugestellt: { label: "Zugestellt", className: "bg-blue-100 text-blue-800 border-blue-300" },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge className={`${config.className} border`}>
        {config.label}
      </Badge>
    );
  };
  
  const getShippingMethodLabel = (method: string) => {
    const methods = {
      dhl: "DHL",
      kurier: "Kurier",
      abholung: "Abholung"
    };
    return methods[method as keyof typeof methods] || method;
  };
  
  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    toast({
      title: "Status aktualisiert",
      description: `Bestellung ${orderId} wurde auf "${newStatus}" aktualisiert.`,
    });
  };

  const handleBatchStatusUpdate = (newStatus: string) => {
    if (selectedOrders.length === 0) {
      toast({
        title: "Keine Auswahl",
        description: "Bitte wählen Sie mindestens eine Bestellung aus.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Batch-Update erfolgreich",
      description: `${selectedOrders.length} Bestellung(en) auf "${newStatus}" gesetzt.`,
    });
    setSelectedOrders([]);
  };
  
  const handleOrderUpdate = () => {
    if (editingOrder) {
      toast({
        title: "Bestellung aktualisiert",
        description: `Bestellung ${editingOrder.id} wurde erfolgreich aktualisiert.`,
      });
      setShowEditDialog(false);
      setEditingOrder(null);
    }
  };
  
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      order.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.trackingId?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesShipping = shippingFilter === "all" || order.shippingMethod === shippingFilter;
    return matchesSearch && matchesStatus && matchesShipping;
  });

  const toggleOrderSelection = (orderId: string) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const toggleAllSelection = () => {
    setSelectedOrders(
      selectedOrders.length === filteredOrders.length 
        ? [] 
        : filteredOrders.map(order => order.id)
    );
  };

  const calculateTotalOrderedGrams = (items: OrderItem[]) => {
    return items.reduce((total, item) => total + item.orderedGrams, 0);
  };

  // Mobile Card Component mit vereinfachter Produktanzeige
  const OrderCard = ({ order }: { order: Order }) => {
    const totalOrderedGrams = calculateTotalOrderedGrams(order.items);
    
    return (
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-sm font-medium">{order.id}</CardTitle>
              <p className="text-sm text-muted-foreground">{order.patientName}</p>
            </div>
            {getStatusBadge(order.status)}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground truncate">
                {order.patientAddress.split(',')[0]}...
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Package className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs">
                {order.items.length} Produkt{order.items.length !== 1 ? 'e' : ''}
                {totalOrderedGrams > 0 && (
                  <span className="ml-1 font-medium text-green-600">
                    ({totalOrderedGrams}g bestellt)
                  </span>
                )}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Truck className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs">{getShippingMethodLabel(order.shippingMethod)}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {new Date(order.createdAt).toLocaleDateString('de-DE')}
              </span>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4 pt-3 border-t">
            <span className="font-medium">{order.totalAmount.toFixed(2)} €</span>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  setSelectedOrder(order);
                  setShowDetailDialog(true);
                }}
              >
                <Eye className="h-3 w-3" />
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  setEditingOrder(order);
                  setShowEditDialog(true);
                }}
              >
                <Edit3 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Bestellungen verwalten</h1>
        
        {selectedOrders.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {selectedOrders.length} ausgewählt
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline">
                  Batch-Aktion <MoreHorizontal className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleBatchStatusUpdate("in_bearbeitung")}>
                  Auf "In Bearbeitung" setzen
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBatchStatusUpdate("versendet")}>
                  Auf "Versendet" setzen
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBatchStatusUpdate("zugestellt")}>
                  Auf "Zugestellt" setzen
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
      
      {/* Filter & Suche */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter & Suche
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Name, Bestellnummer, Tracking..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Status</SelectItem>
                <SelectItem value="neu">Neu</SelectItem>
                <SelectItem value="in_bearbeitung">In Bearbeitung</SelectItem>
                <SelectItem value="versendet">Versendet</SelectItem>
                <SelectItem value="zugestellt">Zugestellt</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={shippingFilter} onValueChange={setShippingFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Versandart" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Versandarten</SelectItem>
                <SelectItem value="dhl">DHL</SelectItem>
                <SelectItem value="kurier">Kurier</SelectItem>
                <SelectItem value="abholung">Abholung</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sortieren" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Datum</SelectItem>
                <SelectItem value="status">Status</SelectItem>
                <SelectItem value="shipping">Versandart</SelectItem>
                <SelectItem value="amount">Betrag</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      {/* Vereinfachte Bestellungen Tabelle */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Bestellübersicht ({filteredOrders.length})</span>
            {!isMobile && filteredOrders.length > 0 && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedOrders.length === filteredOrders.length}
                  onCheckedChange={toggleAllSelection}
                />
                <Label className="text-sm">Alle auswählen</Label>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isMobile ? (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedOrders.length === filteredOrders.length}
                        onCheckedChange={toggleAllSelection}
                      />
                    </TableHead>
                    <TableHead>Bestellung</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Produkte & Lagerbestand</TableHead>
                    <TableHead>Versand</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Datum</TableHead>
                    <TableHead className="text-right">Betrag</TableHead>
                    <TableHead>Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => {
                    const totalOrderedGrams = calculateTotalOrderedGrams(order.items);
                    return (
                      <TableRow key={order.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedOrders.includes(order.id)}
                            onCheckedChange={() => toggleOrderSelection(order.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          <div>
                            <p className="font-mono text-sm">{order.id}</p>
                            <p className="text-xs text-muted-foreground">{order.prescriptionId}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{order.patientName}</p>
                            <p className="text-xs text-muted-foreground truncate max-w-32">
                              {order.patientAddress.split(',')[0]}...
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {order.items.map((item, index) => (
                              <div key={index} className="text-xs">
                                <span className="font-medium">{item.name}</span>
                                <br />
                                {item.orderedGrams > 0 ? (
                                  <span className="text-muted-foreground">
                                    <span className="text-green-600 font-medium">
                                      {item.orderedGrams}g bestellt
                                    </span>
                                    <span className={`ml-2 ${item.totalStockGrams < 50 ? 'text-red-500' : 'text-green-600'}`}>
                                      (Lager: {item.totalStockGrams}g)
                                    </span>
                                  </span>
                                ) : (
                                  <span className="text-muted-foreground text-blue-600">
                                    Nicht-Cannabis Produkt
                                  </span>
                                )}
                              </div>
                            ))}
                            {totalOrderedGrams > 0 && (
                              <div className="text-xs font-medium text-green-600 mt-1 pt-1 border-t">
                                Gesamt bestellt: {totalOrderedGrams}g
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Truck className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">{getShippingMethodLabel(order.shippingMethod)}</span>
                          </div>
                          {order.trackingId && (
                            <p className="text-xs text-muted-foreground font-mono mt-1">
                              {order.trackingId}
                            </p>
                          )}
                        </TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{new Date(order.createdAt).toLocaleDateString('de-DE')}</p>
                            <p className="text-xs text-muted-foreground">
                              Upd: {new Date(order.lastUpdated).toLocaleDateString('de-DE')}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {order.totalAmount.toFixed(2)} €
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setSelectedOrder(order);
                                setShowDetailDialog(true);
                              }}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setEditingOrder(order);
                                setShowEditDialog(true);
                              }}
                            >
                              <Edit3 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  
                  {filteredOrders.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={9} className="h-24 text-center">
                        Keine Bestellungen gefunden.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Vereinfachter Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Bestelldetails - {selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Vollständige Informationen zur Bestellung
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Patient</Label>
                  <p className="text-sm">{selectedOrder.patientName}</p>
                  <p className="text-xs text-muted-foreground">{selectedOrder.patientAddress}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <div className="mt-1">{getStatusBadge(selectedOrder.status)}</div>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Bestellte Produkte</Label>
                <div className="mt-2 space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-muted rounded">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        {item.orderedGrams > 0 ? (
                          <p className="text-sm text-muted-foreground">
                            <span className="text-green-600 font-medium">
                              {item.orderedGrams}g bestellt
                            </span>
                            <span className={`ml-2 ${item.totalStockGrams < 50 ? 'text-red-500' : 'text-green-600'}`}>
                              Lagerbestand: {item.totalStockGrams}g
                            </span>
                          </p>
                        ) : (
                          <p className="text-sm text-blue-600">
                            Nicht-Cannabis Produkt
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {calculateTotalOrderedGrams(selectedOrder.items) > 0 && (
                    <div className="p-2 bg-green-50 border border-green-200 rounded">
                      <p className="text-sm font-medium text-green-700">
                        Gesamtmenge bestellt: {calculateTotalOrderedGrams(selectedOrder.items)}g Cannabis
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Versandart</Label>
                  <p className="text-sm">{getShippingMethodLabel(selectedOrder.shippingMethod)}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Gesamtbetrag</Label>
                  <p className="text-sm font-medium">{selectedOrder.totalAmount.toFixed(2)} €</p>
                </div>
              </div>
              
              {selectedOrder.trackingId && (
                <div>
                  <Label className="text-sm font-medium">Tracking-ID</Label>
                  <p className="text-sm font-mono">{selectedOrder.trackingId}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Enhanced Edit Dialog with shipping method editing */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bestellung bearbeiten - {editingOrder?.id}</DialogTitle>
            <DialogDescription>
              Status, Versandart, Tracking-ID und weitere Details verwalten
            </DialogDescription>
          </DialogHeader>
          
          {editingOrder && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={editingOrder.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="neu">Neu</SelectItem>
                    <SelectItem value="in_bearbeitung">In Bearbeitung</SelectItem>
                    <SelectItem value="versendet">Versendet</SelectItem>
                    <SelectItem value="zugestellt">Zugestellt</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="shipping-method">Versandart</Label>
                <Select defaultValue={editingOrder.shippingMethod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dhl">DHL</SelectItem>
                    <SelectItem value="kurier">Kurier</SelectItem>
                    <SelectItem value="abholung">Abholung</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Korrigieren Sie die Versandart falls der Kunde falsch ausgewählt hat
                </p>
              </div>
              
              <div>
                <Label htmlFor="tracking">Tracking-ID</Label>
                <Input
                  id="tracking"
                  defaultValue={editingOrder.trackingId || ""}
                  placeholder="Tracking-Nummer eingeben..."
                />
              </div>
              
              <div>
                <Label htmlFor="shipping-date">Versanddatum</Label>
                <Input
                  id="shipping-date"
                  type="date"
                  defaultValue={editingOrder.shippingDate || ""}
                />
              </div>
              
              <div>
                <Label htmlFor="notes">Notizen</Label>
                <Textarea
                  id="notes"
                  defaultValue={editingOrder.notes || ""}
                  placeholder="Interne Notizen..."
                  rows={3}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Abbrechen
            </Button>
            <Button onClick={handleOrderUpdate}>
              <Check className="mr-2 h-4 w-4" />
              Speichern
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PharmacyOrdersPage;
