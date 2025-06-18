
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  ShoppingBag, 
  Package, 
  Truck, 
  MapPin, 
  FileText, 
  User, 
  Eye,
  Edit3,
  Save
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

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
}

const PharmacyOrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);

  // Enhanced route detection for better back navigation
  const getReturnInfo = () => {
    // Check if we have explicit state from navigation
    if (location.state?.from && location.state?.fromLabel) {
      return {
        route: location.state.from,
        label: location.state.fromLabel
      };
    }
    
    // Fallback: detect based on current path or referrer
    const currentPath = window.location.pathname;
    const referrer = document.referrer;
    
    // Check if coming from pharmacy dashboard
    if (referrer.includes('/dashboard/pharmacy') && !referrer.includes('/pharmacy-orders')) {
      return {
        route: '/dashboard/pharmacy',
        label: 'Dashboard'
      };
    }
    
    // Default to pharmacy orders overview
    return {
      route: '/dashboard/pharmacy-orders',
      label: 'Bestellungen'
    };
  };

  const returnInfo = getReturnInfo();

  // Mock orders data - same as PharmacyOrdersPage
  const orders: Order[] = [
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
    },
    {
      id: "ORD-2023-004",
      prescriptionId: "RX-2023-104",
      patientName: "Thomas Becker",
      patientAddress: "Lindenallee 12, 50667 Köln",
      items: [
        { 
          name: "THC/CBD Extrakt 1:1", 
          type: "extract",
          orderedBottles: 3,
          bottleSize: 5,
          totalStockBottles: 20
        },
      ],
      shippingMethod: "abholung",
      totalAmount: 39.99,
      status: "zugestellt",
      createdAt: "2023-05-17",
      lastUpdated: "2023-05-18",
    },
  ];

  // Find the order based on ID
  const orderData = orders.find(order => order.id === id);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(orderData || null);

  if (!currentOrder) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate(returnInfo.route)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück zu {returnInfo.label}
          </Button>
          <h1 className="text-2xl font-bold">Bestellung nicht gefunden</h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <p>Die angeforderte Bestellung konnte nicht gefunden werden.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

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

  const getStockStatusBadge = (item: OrderItem) => {
    if (item.type === "flower") {
      const stockLevel = item.totalStockGrams || 0;
      if (stockLevel < 50) {
        return <Badge className="bg-red-100 text-red-800">Niedrig</Badge>;
      }
      return <Badge className="bg-green-100 text-green-800">Verfügbar</Badge>;
    } else {
      const stockLevel = item.totalStockBottles || 0;
      if (stockLevel < 5) {
        return <Badge className="bg-red-100 text-red-800">Niedrig</Badge>;
      }
      return <Badge className="bg-green-100 text-green-800">Verfügbar</Badge>;
    }
  };

  const handleViewPrescription = () => {
    navigate(`/dashboard/prescriptions/${currentOrder.prescriptionId}`, {
      state: { 
        from: `/dashboard/pharmacy-orders/${id}`,
        fromLabel: 'Bestelldetails'
      }
    });
  };

  const handleSaveChanges = () => {
    toast({
      title: "Bestellung aktualisiert",
      description: `Bestellung ${currentOrder.id} wurde erfolgreich aktualisiert.`,
    });
    setIsEditing(false);
  };

  const handleStatusChange = (newStatus: string) => {
    setCurrentOrder(prev => prev ? { ...prev, status: newStatus as any } : null);
  };

  const calculateItemPrice = (item: OrderItem): number => {
    // Simple price calculation based on item type and quantity
    if (item.type === "flower") {
      const pricePerGram = item.name.includes("THC22") ? 3.00 : 2.50;
      return (item.orderedGrams || 0) * pricePerGram;
    } else {
      const pricePerBottle = item.bottleSize === 15 ? 45.00 : 25.00;
      return (item.orderedBottles || 0) * pricePerBottle;
    }
  };

  const subtotal = currentOrder.items.reduce((sum, item) => sum + calculateItemPrice(item), 0);
  const shipping = subtotal > 100 ? 0 : 4.99;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate(returnInfo.route)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück zu {returnInfo.label}
          </Button>
          <h1 className="text-2xl font-bold">Bestellung Details</h1>
        </div>
        
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Abbrechen
              </Button>
              <Button onClick={handleSaveChanges}>
                <Save className="w-4 h-4 mr-2" />
                Speichern
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} variant="outline">
              <Edit3 className="w-4 h-4 mr-2" />
              Bearbeiten
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Bestellung {currentOrder.id}
                </span>
                {getStatusBadge(currentOrder.status)}
              </CardTitle>
              <CardDescription>
                Bestellt am {new Date(currentOrder.createdAt).toLocaleDateString('de-DE')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Artikel</TableHead>
                    <TableHead>Typ</TableHead>
                    <TableHead>Menge</TableHead>
                    <TableHead>Lagerbestand</TableHead>
                    <TableHead>Preis</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentOrder.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        <Badge variant={item.type === "flower" ? "default" : "secondary"}>
                          {item.type === "flower" ? "Cannabis" : "Extrakt"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {item.type === "flower" 
                          ? `${item.orderedGrams}g`
                          : `${item.orderedBottles} × ${item.bottleSize}ml`
                        }
                      </TableCell>
                      <TableCell>{getStockStatusBadge(item)}</TableCell>
                      <TableCell>€ {calculateItemPrice(item).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Zwischensumme:</span>
                  <span>€ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Versand:</span>
                  <span>€ {shipping.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Gesamt:</span>
                  <span>€ {currentOrder.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prescription Details Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Rezept-Informationen
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleViewPrescription}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Rezept anzeigen
                </Button>
              </CardTitle>
              <CardDescription>
                Details zum zugehörigen Rezept {currentOrder.prescriptionId}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Rezept-ID</p>
                  <p className="font-medium font-mono">{currentOrder.prescriptionId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Patient</p>
                  <p className="font-medium">{currentOrder.patientName}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Erstellt am</p>
                  <p className="font-medium">{new Date(currentOrder.createdAt).toLocaleDateString('de-DE')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Letzte Aktualisierung</p>
                  <p className="font-medium">{new Date(currentOrder.lastUpdated).toLocaleDateString('de-DE')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Patient Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Patient
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium">{currentOrder.patientName}</p>
                <p className="text-sm text-muted-foreground">{currentOrder.patientAddress}</p>
              </div>
            </CardContent>
          </Card>

          {/* Order Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Bestellverwaltung
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="status">Status</Label>
                {isEditing ? (
                  <Select value={currentOrder.status} onValueChange={handleStatusChange}>
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
                ) : (
                  <div className="mt-1">{getStatusBadge(currentOrder.status)}</div>
                )}
              </div>

              <div>
                <Label htmlFor="shipping-method">Versandart</Label>
                <p className="mt-1 text-sm">{getShippingMethodLabel(currentOrder.shippingMethod)}</p>
              </div>

              {isEditing ? (
                <div>
                  <Label htmlFor="tracking">Tracking-Nummer</Label>
                  <Input
                    id="tracking"
                    value={currentOrder.trackingId || ""}
                    onChange={(e) => setCurrentOrder(prev => prev ? { ...prev, trackingId: e.target.value } : null)}
                    placeholder="Tracking-Nummer eingeben..."
                  />
                </div>
              ) : (
                currentOrder.trackingId && (
                  <div>
                    <p className="text-sm text-muted-foreground">Tracking-Nummer</p>
                    <p className="font-medium font-mono">{currentOrder.trackingId}</p>
                  </div>
                )
              )}

              {isEditing && (
                <div>
                  <Label htmlFor="notes">Interne Notizen</Label>
                  <Textarea
                    id="notes"
                    value={currentOrder.notes || ""}
                    onChange={(e) => setCurrentOrder(prev => prev ? { ...prev, notes: e.target.value } : null)}
                    placeholder="Interne Notizen zur Bestellung..."
                    rows={3}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Shipping Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="w-5 h-5 mr-2" />
                Versandinformationen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Versanddatum</p>
                <p className="font-medium">
                  {currentOrder.shippingDate ? new Date(currentOrder.shippingDate).toLocaleDateString('de-DE') : 'Noch nicht versendet'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Versandart</p>
                <p className="font-medium">{getShippingMethodLabel(currentOrder.shippingMethod)}</p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          {!isEditing && (
            <Card>
              <CardHeader>
                <CardTitle>Aktionen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {currentOrder.trackingId && (
                  <Button className="w-full" variant="default">
                    <Truck className="w-4 h-4 mr-2" />
                    Versand verfolgen
                  </Button>
                )}
                <Button className="w-full" variant="outline">
                  Rechnung erstellen
                </Button>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={handleViewPrescription}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Rezept öffnen
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PharmacyOrderDetailPage;
