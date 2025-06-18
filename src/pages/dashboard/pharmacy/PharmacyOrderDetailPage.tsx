
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

const PharmacyOrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);

  // Get the previous route information from navigation state
  const fromRoute = location.state?.from || "/dashboard/pharmacy-orders";
  const fromLabel = location.state?.fromLabel || "Bestellungen";

  // Mock order data with prescription details (adapted for pharmacy view)
  const [orderData, setOrderData] = useState({
    id: id || "ORD-2023-105",
    patientName: "Max Mustermann",
    patientAddress: "Musterstraße 123, 20095 Hamburg",
    status: "in_bearbeitung",
    orderDate: "2023-12-15T10:30:00",
    shippingDate: "2023-12-16T14:20:00",
    estimatedDelivery: "2023-12-18T12:00:00",
    trackingNumber: "DE123456789",
    shippingMethod: "dhl",
    prescriptionId: "RX-2023-001",
    prescriptionDetails: {
      doctorName: "Dr. Sarah Schmidt",
      issuedAt: "2023-12-14T14:30:00",
      validUntil: "2024-01-14T23:59:59",
      symptoms: ["Chronische Schmerzen", "Schlafstörungen"],
      dosage: "2x täglich 0.25g",
      instructions: "Vaporisation bei 180°C, nach Bedarf"
    },
    items: [
      {
        name: "Cannabis Blüten - THC18",
        type: "flower",
        quantity: "5g",
        price: 120.00,
        prescriptionId: "RX-001",
        stockStatus: "available"
      },
      {
        name: "THC Extrakt 25%", 
        type: "extract",
        quantity: "2x 10ml Flaschen",
        price: 89.99,
        prescriptionId: "RX-001",
        stockStatus: "low"
      }
    ],
    subtotal: 209.99,
    shipping: 4.99,
    total: 214.98,
    notes: ""
  });

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

  const getStockStatusBadge = (status: string) => {
    switch(status) {
      case 'available':
        return <Badge className="bg-green-100 text-green-800">Verfügbar</Badge>;
      case 'low':
        return <Badge className="bg-yellow-100 text-yellow-800">Niedrig</Badge>;
      case 'out':
        return <Badge className="bg-red-100 text-red-800">Nicht verfügbar</Badge>;
      default:
        return <Badge>Unbekannt</Badge>;
    }
  };

  const handleViewPrescription = () => {
    navigate(`/dashboard/prescriptions/${orderData.prescriptionId}`, {
      state: { 
        from: `/dashboard/pharmacy-orders/${id}`,
        fromLabel: 'Bestelldetails'
      }
    });
  };

  const handleSaveChanges = () => {
    toast({
      title: "Bestellung aktualisiert",
      description: `Bestellung ${orderData.id} wurde erfolgreich aktualisiert.`,
    });
    setIsEditing(false);
  };

  const handleStatusChange = (newStatus: string) => {
    setOrderData(prev => ({ ...prev, status: newStatus }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate(fromRoute)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück zu {fromLabel}
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
                  Bestellung {orderData.id}
                </span>
                {getStatusBadge(orderData.status)}
              </CardTitle>
              <CardDescription>
                Bestellt am {new Date(orderData.orderDate).toLocaleDateString('de-DE')}
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
                  {orderData.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        <Badge variant={item.type === "flower" ? "default" : "secondary"}>
                          {item.type === "flower" ? "Cannabis" : "Extrakt"}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{getStockStatusBadge(item.stockStatus)}</TableCell>
                      <TableCell>€ {item.price.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Zwischensumme:</span>
                  <span>€ {orderData.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Versand:</span>
                  <span>€ {orderData.shipping.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Gesamt:</span>
                  <span>€ {orderData.total.toFixed(2)}</span>
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
                Details zum zugehörigen Rezept {orderData.prescriptionId}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Rezept-ID</p>
                  <p className="font-medium font-mono">{orderData.prescriptionId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ausstellender Arzt</p>
                  <p className="font-medium">{orderData.prescriptionDetails.doctorName}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Ausgestellt am</p>
                  <p className="font-medium">{new Date(orderData.prescriptionDetails.issuedAt).toLocaleDateString('de-DE')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gültig bis</p>
                  <p className="font-medium">{new Date(orderData.prescriptionDetails.validUntil).toLocaleDateString('de-DE')}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Symptome</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {orderData.prescriptionDetails.symptoms.map((symptom, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {symptom}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Dosierung</p>
                <p className="font-medium">{orderData.prescriptionDetails.dosage}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Anwendungshinweise</p>
                <p className="text-sm">{orderData.prescriptionDetails.instructions}</p>
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
                <p className="font-medium">{orderData.patientName}</p>
                <p className="text-sm text-muted-foreground">{orderData.patientAddress}</p>
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
                  <Select value={orderData.status} onValueChange={handleStatusChange}>
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
                  <div className="mt-1">{getStatusBadge(orderData.status)}</div>
                )}
              </div>

              <div>
                <Label htmlFor="shipping-method">Versandart</Label>
                <p className="mt-1 text-sm">{getShippingMethodLabel(orderData.shippingMethod)}</p>
              </div>

              {isEditing ? (
                <div>
                  <Label htmlFor="tracking">Tracking-Nummer</Label>
                  <Input
                    id="tracking"
                    value={orderData.trackingNumber}
                    onChange={(e) => setOrderData(prev => ({ ...prev, trackingNumber: e.target.value }))}
                    placeholder="Tracking-Nummer eingeben..."
                  />
                </div>
              ) : (
                orderData.trackingNumber && (
                  <div>
                    <p className="text-sm text-muted-foreground">Tracking-Nummer</p>
                    <p className="font-medium font-mono">{orderData.trackingNumber}</p>
                  </div>
                )
              )}

              {isEditing && (
                <div>
                  <Label htmlFor="notes">Interne Notizen</Label>
                  <Textarea
                    id="notes"
                    value={orderData.notes}
                    onChange={(e) => setOrderData(prev => ({ ...prev, notes: e.target.value }))}
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
                  {orderData.shippingDate ? new Date(orderData.shippingDate).toLocaleDateString('de-DE') : 'Noch nicht versendet'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Voraussichtliche Lieferung</p>
                <p className="font-medium">{new Date(orderData.estimatedDelivery).toLocaleDateString('de-DE')}</p>
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
                <Button className="w-full" variant="default">
                  <Truck className="w-4 h-4 mr-2" />
                  Versand verfolgen
                </Button>
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
