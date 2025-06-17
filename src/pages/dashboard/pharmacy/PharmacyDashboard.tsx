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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  ShoppingBag, 
  Package, 
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  Truck,
  Search,
  Settings
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const PharmacyDashboard = () => {
  const navigate = useNavigate();
  const [trackingId, setTrackingId] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isTrackingDialogOpen, setIsTrackingDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data - in real app would come from API
  const stats = {
    pendingOrders: 12,
    pendingPrescriptions: 8,
    lowStockItems: 5,
    completedOrdersToday: 23
  };

  const recentOrders = [
    {
      id: "ORD-2023-105",
      patientName: "Max Mustermann",
      prescriptionId: "RX-2023-001",
      date: "2023-12-15",
      status: "pending",
      total: 129.90, // Aktualisiert für neuen ml-basierten Preis
      items: [
        { name: "Cannabisblüte THC18", quantity: "10g", type: "flower", price: 129.90 }
      ],
      trackingId: null,
      priority: "normal"
    },
    {
      id: "ORD-2023-104",
      patientName: "Anna Weber",
      prescriptionId: "RX-2023-002",
      date: "2023-12-14", 
      status: "processing",
      total: 154.85, // Aktualisiert: 10ml THC Extrakt (89.90€) + 5g Blüte (64.95€)
      items: [
        { name: "THC Extrakt 25%", quantity: "1 Flasche à 10ml", type: "extract", price: 89.90 },
        { name: "Cannabisblüte THC15", quantity: "5g", type: "flower", price: 64.95 }
      ],
      trackingId: null,
      priority: "high"
    },
    {
      id: "ORD-2023-103",
      patientName: "Julia Becker",
      prescriptionId: "RX-2023-003",
      date: "2023-12-13",
      status: "shipped",
      total: 399.80, // Aktualisiert: 2 × 10ml THC/CBD Extrakt (2 × 199.90€)
      items: [
        { name: "THC/CBD Extrakt 1:1", quantity: "2 Flaschen à 10ml", type: "extract", price: 399.80 }
      ],
      trackingId: "DHL123456789",
      priority: "normal"
    }
  ];

  const lowStockProducts = [
    { 
      name: "THC Extrakt 25%", 
      currentStock: 3, 
      minStock: 10, 
      unit: "Flaschen à 10ml",
      type: "extract",
      bottleSize: 10,
      pricePerMl: 8.99 // Hinzugefügt für Preisberechnung
    },
    { 
      name: "Cannabisblüte THC18", 
      currentStock: 2, 
      minStock: 5, 
      unit: "10g Packungen",
      type: "flower"
    },
    { 
      name: "THC/CBD Extrakt 1:1", 
      currentStock: 0, 
      minStock: 3, 
      unit: "Flaschen à 10ml",
      type: "extract",
      bottleSize: 10,
      pricePerMl: 19.99 // Hinzugefügt für Preisberechnung
    }
  ];

  const pendingPrescriptions = [
    {
      id: "RX-2023-008",
      patientName: "Thomas Fischer",
      doctorName: "Dr. Sarah Schmidt",
      submittedAt: "2023-12-15T10:30:00",
      products: ["Cannabisblüte THC20", "THC Extrakt 20%"],
      urgency: "normal"
    },
    {
      id: "RX-2023-009", 
      patientName: "Maria Gonzalez",
      doctorName: "Dr. Michael Weber",
      submittedAt: "2023-12-15T09:15:00",
      products: ["THC/CBD Extrakt 1:1"],
      urgency: "high"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <Badge className="bg-yellow-500"><Clock className="w-3 h-3 mr-1" />Wartend</Badge>;
      case 'processing':
        return <Badge className="bg-blue-500"><Settings className="w-3 h-3 mr-1" />In Bearbeitung</Badge>;
      case 'shipped':
        return <Badge className="bg-green-500"><Truck className="w-3 h-3 mr-1" />Versendet</Badge>;
      case 'delivered':
        return <Badge className="bg-green-600"><CheckCircle className="w-3 h-3 mr-1" />Zugestellt</Badge>;
      default:
        return <Badge>Unbekannt</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'high':
        return <Badge variant="destructive">Hoch</Badge>;
      case 'normal':
        return <Badge variant="outline">Normal</Badge>;
      case 'low':
        return <Badge variant="secondary">Niedrig</Badge>;
      default:
        return null;
    }
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    toast({
      title: "Status aktualisiert",
      description: `Bestellung ${orderId} wurde auf "${newStatus}" gesetzt.`,
    });
  };

  const handleAddTracking = (order: any) => {
    setSelectedOrder(order);
    setTrackingId(order.trackingId || "");
    setIsTrackingDialogOpen(true);
  };

  const saveTracking = () => {
    if (!trackingId.trim()) {
      toast({
        title: "Tracking-ID erforderlich",
        description: "Bitte geben Sie eine gültige Tracking-ID ein.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Tracking-ID gespeichert",
      description: `Tracking-ID ${trackingId} für Bestellung ${selectedOrder?.id} wurde gespeichert.`,
    });
    setIsTrackingDialogOpen(false);
    setSelectedOrder(null);
    setTrackingId("");
  };

  const filteredOrders = recentOrders.filter(order => 
    order.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.prescriptionId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-6">Apotheken Dashboard</h1>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Wartende Bestellungen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{stats.pendingOrders}</div>
                <Clock className="h-5 w-5 text-amber-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Warten auf Bearbeitung</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Wartende Rezepte</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{stats.pendingPrescriptions}</div>
                <FileText className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Zu überprüfen</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Niedriger Bestand</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{stats.lowStockItems}</div>
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Produkte nachbestellen</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Abgeschlossen (heute)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{stats.completedOrdersToday}</div>
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Versandte Bestellungen</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Bestellungen */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Aktuelle Bestellungen
                </span>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Bestellungen suchen..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </CardTitle>
              <CardDescription>Übersicht der neuesten Bestellungen</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium">{order.id}</p>
                          {getPriorityBadge(order.priority)}
                          {getStatusBadge(order.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Patient: {order.patientName} • {new Date(order.date).toLocaleDateString('de-DE')}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Rezept: {order.prescriptionId}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{order.total.toFixed(2)} €</p>
                        {order.trackingId && (
                          <p className="text-xs text-blue-600">
                            Tracking: {order.trackingId}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm font-medium mb-1">Bestellte Produkte:</p>
                      <div className="space-y-1">
                        {order.items.map((item, index) => (
                          <div key={index} className="text-sm text-muted-foreground flex justify-between">
                            <span>• {item.name} - {item.quantity}</span>
                            {item.price && (
                              <span className="font-medium">{item.price.toFixed(2)} €</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {order.status === 'pending' && (
                        <Button 
                          size="sm" 
                          onClick={() => handleStatusChange(order.id, 'processing')}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Bearbeitung starten
                        </Button>
                      )}
                      
                      {order.status === 'processing' && (
                        <>
                          <Button 
                            size="sm" 
                            onClick={() => handleAddTracking(order)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Truck className="w-3 h-3 mr-1" />
                            Versenden
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleAddTracking(order)}
                          >
                            Tracking hinzufügen
                          </Button>
                        </>
                      )}
                      
                      {order.status === 'shipped' && order.trackingId && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleStatusChange(order.id, 'delivered')}
                        >
                          Als zugestellt markieren
                        </Button>
                      )}
                      
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => navigate(`/dashboard/pharmacy-orders/${order.id}`)}
                      >
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button 
                variant="outline" 
                className="w-full mt-4" 
                onClick={() => navigate("/dashboard/pharmacy-orders")}
              >
                Alle Bestellungen anzeigen
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Wartende Rezepte */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Wartende Rezepte
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingPrescriptions.map((prescription) => (
                  <div key={prescription.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm">{prescription.id}</p>
                      {prescription.urgency === 'high' && (
                        <Badge variant="destructive" className="text-xs">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Dringend
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Patient: {prescription.patientName}
                    </p>
                    <p className="text-xs text-muted-foreground mb-2">
                      Arzt: {prescription.doctorName}
                    </p>
                    <div className="text-xs text-muted-foreground">
                      Produkte: {prescription.products.join(", ")}
                    </div>
                  </div>
                ))}
              </div>
              
              <Button 
                variant="outline" 
                className="w-full mt-4" 
                onClick={() => navigate("/dashboard/pharmacy-prescriptions")}
              >
                Alle Rezepte prüfen
              </Button>
            </CardContent>
          </Card>

          {/* Niedriger Bestand */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Niedriger Bestand
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lowStockProducts.map((product, index) => (
                  <div key={index} className="p-3 border rounded-lg bg-red-50 dark:bg-red-900/20">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-sm">{product.name}</p>
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Aktuell: {product.currentStock} {product.unit}
                    </p>
                    <p className="text-xs text-red-600">
                      Mindestbestand: {product.minStock} {product.unit}
                    </p>
                    {product.type === "extract" && product.bottleSize && product.currentStock > 0 && product.pricePerMl && (
                      <div className="text-xs space-y-1 mt-1">
                        <p className="text-blue-600">
                          Gesamt: {product.currentStock * product.bottleSize}ml verfügbar
                        </p>
                        <p className="text-green-600">
                          Wert: {(product.currentStock * product.bottleSize * product.pricePerMl).toFixed(2)} €
                        </p>
                        <p className="text-muted-foreground">
                          {product.pricePerMl.toFixed(2)} €/ml
                        </p>
                      </div>
                    )}
                    {product.type === "extract" && product.currentStock === 0 && (
                      <p className="text-xs text-red-600 font-medium">
                        Ausverkauft
                      </p>
                    )}
                  </div>
                ))}
              </div>
              
              <Button 
                variant="outline" 
                className="w-full mt-4" 
                onClick={() => navigate("/dashboard/pharmacy-inventory")}
              >
                Bestand verwalten
              </Button>
            </CardContent>
          </Card>

          {/* Schnellzugriffe */}
          <Card>
            <CardHeader>
              <CardTitle>Schnellzugriffe</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <Button 
                  variant="outline" 
                  className="justify-start" 
                  onClick={() => navigate("/dashboard/pharmacy-orders")}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Bestellungen verwalten
                </Button>
                
                <Button 
                  variant="outline" 
                  className="justify-start" 
                  onClick={() => navigate("/dashboard/pharmacy-inventory")}
                >
                  <Package className="mr-2 h-4 w-4" />
                  Bestand aktualisieren
                </Button>
                
                <Button 
                  variant="outline" 
                  className="justify-start" 
                  onClick={() => navigate("/dashboard/pharmacy-prescriptions")}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Rezepte prüfen
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tracking Dialog */}
      <Dialog open={isTrackingDialogOpen} onOpenChange={setIsTrackingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tracking-ID hinzufügen</DialogTitle>
            <DialogDescription>
              Fügen Sie eine Tracking-ID für Bestellung {selectedOrder?.id} hinzu.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Label htmlFor="trackingId" className="block mb-2">Tracking-ID</Label>
            <Input
              id="trackingId"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="z.B. DHL123456789"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Die Tracking-ID wird an den Patienten weitergeleitet.
            </p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTrackingDialogOpen(false)}>
              Abbrechen
            </Button>
            <Button onClick={saveTracking}>
              Tracking-ID speichern
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PharmacyDashboard;
