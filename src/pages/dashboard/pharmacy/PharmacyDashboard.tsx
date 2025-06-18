
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
  Settings,
  Receipt
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface OrderItem {
  name: string;
  type: "flower" | "extract";
  orderedGrams?: number;
  totalStockGrams?: number;
  orderedBottles?: number;
  bottleSize?: number;
  totalStockBottles?: number;
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
  priority?: "high" | "normal" | "low";
}

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
    completedOrdersToday: 23,
    pendingInvoices: 5
  };

  // Synchronized mock data with PharmacyOrderDetailPage
  const recentOrders: Order[] = [
    {
      id: "ORD-2023-001",
      prescriptionId: "RX-2023-101",
      patientName: "Max Mustermann",
      patientAddress: "Hauptstr. 123, 10115 Berlin",
      items: [
        { 
          name: "Cannabisblüte THC18", 
          type: "flower",
          orderedGrams: 20, 
          totalStockGrams: 250
        },
        { 
          name: "THC Extrakt 25%", 
          type: "extract",
          orderedBottles: 2,
          bottleSize: 10,
          totalStockBottles: 15
        },
      ],
      shippingMethod: "dhl",
      totalAmount: 159.89,
      status: "neu",
      createdAt: "2023-05-20",
      lastUpdated: "2023-05-20",
      priority: "normal"
    },
    {
      id: "ORD-2023-002",
      prescriptionId: "RX-2023-102",
      patientName: "Anna Schmidt",
      patientAddress: "Musterweg 45, 20095 Hamburg",
      items: [
        { 
          name: "Cannabisblüte THC22", 
          type: "flower",
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
      priority: "high"
    },
    {
      id: "ORD-2023-003",
      prescriptionId: "RX-2023-103",
      patientName: "Julia Weber",
      patientAddress: "Gartenstr. 78, 80331 München",
      items: [
        { 
          name: "Cannabisblüte THC18", 
          type: "flower",
          orderedGrams: 10, 
          totalStockGrams: 250
        },
        { 
          name: "CBD Extrakt 15%", 
          type: "extract",
          orderedBottles: 1,
          bottleSize: 15,
          totalStockBottles: 8
        },
      ],
      shippingMethod: "dhl",
      totalAmount: 104.93,
      status: "versendet",
      createdAt: "2023-05-18",
      lastUpdated: "2023-05-19",
      trackingId: "1Z999AA0987654321",
      shippingDate: "2023-05-19",
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
      pricePerMl: 8.99
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
      pricePerMl: 19.99
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      neu: { label: "Neu", className: "bg-gray-100 text-gray-800 border-gray-300", icon: Clock },
      in_bearbeitung: { label: "In Bearbeitung", className: "bg-yellow-100 text-yellow-800 border-yellow-300", icon: Settings },
      versendet: { label: "Versendet", className: "bg-green-100 text-green-800 border-green-300", icon: Truck },
      zugestellt: { label: "Zugestellt", className: "bg-blue-100 text-blue-800 border-blue-300", icon: CheckCircle },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    if (!config) return <Badge>Unbekannt</Badge>;
    
    const IconComponent = config.icon;
    return (
      <Badge className={`${config.className} border text-xs`}>
        <IconComponent className="w-3 h-3 mr-1 flex-shrink-0" />
        <span className="hidden sm:inline">{config.label}</span>
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'high':
        return <Badge variant="destructive" className="text-xs">Hoch</Badge>;
      case 'normal':
        return <Badge variant="outline" className="text-xs">Normal</Badge>;
      case 'low':
        return <Badge variant="secondary" className="text-xs">Niedrig</Badge>;
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

  const handleAddTracking = (order: Order) => {
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

  const formatItemsDisplay = (items: OrderItem[]) => {
    return items.map(item => {
      if (item.type === "flower") {
        return `${item.name} - ${item.orderedGrams}g`;
      } else {
        return `${item.name} - ${item.orderedBottles} × ${item.bottleSize}ml`;
      }
    });
  };

  return (
    <div className="w-full max-w-none overflow-hidden">
      <div className="space-y-4 sm:space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 break-words">Apotheken Dashboard</h1>
          
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mb-4 sm:mb-6">
            <Card className="min-w-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Wartende Bestellungen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="text-lg sm:text-2xl font-bold">{stats.pendingOrders}</div>
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500 flex-shrink-0" />
                </div>
                <p className="text-xs text-muted-foreground">Warten auf Bearbeitung</p>
              </CardContent>
            </Card>
            
            <Card className="min-w-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Wartende Rezepte</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="text-lg sm:text-2xl font-bold">{stats.pendingPrescriptions}</div>
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 flex-shrink-0" />
                </div>
                <p className="text-xs text-muted-foreground">Zu überprüfen</p>
              </CardContent>
            </Card>
            
            <Card className="min-w-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Niedriger Bestand</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="text-lg sm:text-2xl font-bold">{stats.lowStockItems}</div>
                  <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 flex-shrink-0" />
                </div>
                <p className="text-xs text-muted-foreground">Produkte nachbestellen</p>
              </CardContent>
            </Card>
            
            <Card className="min-w-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Abgeschlossen (heute)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="text-lg sm:text-2xl font-bold">{stats.completedOrdersToday}</div>
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                </div>
                <p className="text-xs text-muted-foreground">Versandte Bestellungen</p>
              </CardContent>
            </Card>

            <Card className="min-w-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Offene Rechnungen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="text-lg sm:text-2xl font-bold">{stats.pendingInvoices}</div>
                  <Receipt className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500 flex-shrink-0" />
                </div>
                <p className="text-xs text-muted-foreground">Ausstehende Zahlungen</p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-2">
          {/* Bestellungen */}
          <div className="min-w-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="flex items-center min-w-0">
                    <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                    <span className="truncate">Aktuelle Bestellungen</span>
                  </span>
                  <div className="relative w-full sm:w-auto sm:min-w-[200px] max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Bestellungen suchen..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 text-sm"
                    />
                  </div>
                </CardTitle>
                <CardDescription>Übersicht der neuesten Bestellungen</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-3 sm:p-4 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <p className="font-medium text-sm truncate">{order.id}</p>
                            {order.priority && getPriorityBadge(order.priority)}
                            {getStatusBadge(order.status)}
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs sm:text-sm text-muted-foreground break-words">
                              Patient: <span className="font-medium">{order.patientName}</span>
                            </p>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              {new Date(order.createdAt).toLocaleDateString('de-DE')}
                            </p>
                            <p className="text-xs sm:text-sm text-muted-foreground break-words">
                              Rezept: {order.prescriptionId}
                            </p>
                          </div>
                        </div>
                        <div className="text-right sm:text-left flex-shrink-0">
                          <p className="font-medium text-sm sm:text-base">{order.totalAmount.toFixed(2)} €</p>
                          {order.trackingId && (
                            <p className="text-xs text-blue-600 break-all">
                              Tracking: {order.trackingId}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="text-xs sm:text-sm font-medium mb-1">Bestellte Produkte:</p>
                        <div className="space-y-1">
                          {formatItemsDisplay(order.items).map((itemDisplay, index) => (
                            <div key={index} className="text-xs sm:text-sm text-muted-foreground break-words">
                              • {itemDisplay}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {order.status === 'neu' && (
                          <Button 
                            size="sm" 
                            onClick={() => handleStatusChange(order.id, 'in_bearbeitung')}
                            className="bg-blue-600 hover:bg-blue-700 text-xs"
                          >
                            Bearbeitung starten
                          </Button>
                        )}
                        
                        {order.status === 'in_bearbeitung' && (
                          <>
                            <Button 
                              size="sm" 
                              onClick={() => handleAddTracking(order)}
                              className="bg-green-600 hover:bg-green-700 text-xs"
                            >
                              <Truck className="w-3 h-3 mr-1" />
                              <span className="hidden sm:inline">Versenden</span>
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleAddTracking(order)}
                              className="text-xs"
                            >
                              <span className="hidden sm:inline">Tracking hinzufügen</span>
                              <span className="sm:hidden">Tracking</span>
                            </Button>
                          </>
                        )}
                        
                        {order.status === 'versendet' && order.trackingId && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleStatusChange(order.id, 'zugestellt')}
                            className="text-xs"
                          >
                            <span className="hidden sm:inline">Als zugestellt markieren</span>
                            <span className="sm:hidden">Zugestellt</span>
                          </Button>
                        )}
                        
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => navigate(`/dashboard/pharmacy-orders/${order.id}`, {
                            state: { 
                              from: '/dashboard/pharmacy',
                              fromLabel: 'Dashboard'
                            }
                          })}
                          className="text-xs"
                        >
                          Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-4 text-xs sm:text-sm" 
                  onClick={() => navigate("/dashboard/pharmacy-orders")}
                >
                  Alle Bestellungen anzeigen
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4 sm:space-y-6 min-w-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                  <span className="truncate">Niedriger Bestand</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {lowStockProducts.map((product, index) => (
                    <div key={index} className="p-3 border rounded-lg bg-red-50 dark:bg-red-900/20 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-xs sm:text-sm truncate pr-2">{product.name}</p>
                        <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                      </div>
                      <div className="space-y-1 text-xs">
                        <p className="text-muted-foreground break-words">
                          Aktuell: {product.currentStock} {product.unit}
                        </p>
                        <p className="text-red-600">
                          Mindestbestand: {product.minStock} {product.unit}
                        </p>
                        {product.type === "extract" && product.bottleSize && product.currentStock > 0 && product.pricePerMl && (
                          <div className="space-y-1">
                            <p className="text-blue-600">
                              Gesamt: {product.currentStock * product.bottleSize}ml verfügbar
                            </p>
                            <p className="text-muted-foreground">
                              {product.pricePerMl.toFixed(2)} €/ml
                            </p>
                          </div>
                        )}
                        {product.type === "extract" && product.currentStock === 0 && (
                          <p className="text-red-600 font-medium">
                            Ausverkauft
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-4 text-xs sm:text-sm" 
                  onClick={() => navigate("/dashboard/pharmacy-inventory")}
                >
                  Bestand verwalten
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm sm:text-base">Schnellzugriffe</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <Button 
                    variant="outline" 
                    className="justify-start text-xs sm:text-sm h-8 sm:h-9" 
                    onClick={() => navigate("/dashboard/pharmacy-orders")}
                  >
                    <ShoppingBag className="mr-2 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate">Bestellungen verwalten</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="justify-start text-xs sm:text-sm h-8 sm:h-9" 
                    onClick={() => navigate("/dashboard/pharmacy-inventory")}
                  >
                    <Package className="mr-2 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate">Bestand aktualisieren</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="justify-start text-xs sm:text-sm h-8 sm:h-9" 
                    onClick={() => navigate("/dashboard/pharmacy-prescriptions")}
                  >
                    <FileText className="mr-2 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate">Rezepte prüfen</span>
                  </Button>

                  <Button 
                    variant="outline" 
                    className="justify-start text-xs sm:text-sm h-8 sm:h-9" 
                    onClick={() => navigate("/dashboard/pharmacy-billing")}
                  >
                    <Receipt className="mr-2 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate">Rechnungen verwalten</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Dialog open={isTrackingDialogOpen} onOpenChange={setIsTrackingDialogOpen}>
          <DialogContent className="max-w-sm sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-sm sm:text-base">Tracking-ID hinzufügen</DialogTitle>
              <DialogDescription className="text-xs sm:text-sm">
                Fügen Sie eine Tracking-ID für Bestellung {selectedOrder?.id} hinzu.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <Label htmlFor="trackingId" className="block mb-2 text-xs sm:text-sm">Tracking-ID</Label>
              <Input
                id="trackingId"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="z.B. DHL123456789"
                className="text-sm"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Die Tracking-ID wird an den Patienten weitergeleitet.
              </p>
            </div>
            
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setIsTrackingDialogOpen(false)} className="text-xs sm:text-sm">
                Abbrechen
              </Button>
              <Button onClick={saveTracking} className="text-xs sm:text-sm">
                Tracking-ID speichern
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PharmacyDashboard;
