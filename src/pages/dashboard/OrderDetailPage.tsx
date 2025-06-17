
import { useParams, useNavigate } from "react-router-dom";
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
import { ArrowLeft, ShoppingBag, Package, Truck, MapPin, FileText, User, Eye } from "lucide-react";

const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock order data with prescription details
  const order = {
    id: id || "ORD-2023-105",
    patientName: "Max Mustermann",
    pharmacyName: "Apotheke Hamburg",
    status: "shipped",
    orderDate: "2023-12-15T10:30:00",
    shippingDate: "2023-12-16T14:20:00",
    estimatedDelivery: "2023-12-18T12:00:00",
    trackingNumber: "DE123456789",
    prescriptionId: "RX-2023-001",
    prescriptionDetails: {
      doctorName: "Dr. Sarah Schmidt",
      issuedAt: "2023-12-14T14:30:00",
      validUntil: "2024-01-14T23:59:59",
      symptoms: ["Chronische Schmerzen", "Schlafstörungen"],
      dosage: "2x täglich 0.25g",
      instructions: "Vaporisation bei 180°C, nach Bedarf"
    },
    shippingAddress: {
      street: "Musterstraße 123",
      city: "20095 Hamburg",
      country: "Deutschland"
    },
    items: [
      {
        name: "Cannabis Blüten - Sorte A",
        quantity: "5g",
        price: 120.00,
        prescriptionId: "RX-001"
      },
      {
        name: "Vaporizer",
        quantity: "1 Stück",
        price: 89.99,
        prescriptionId: null
      }
    ],
    subtotal: 209.99,
    shipping: 4.99,
    total: 214.98
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <Badge className="bg-yellow-500">Ausstehend</Badge>;
      case 'confirmed':
        return <Badge className="bg-blue-500">Bestätigt</Badge>;
      case 'shipped':
        return <Badge className="bg-purple-500">Versendet</Badge>;
      case 'delivered':
        return <Badge className="bg-green-500">Zugestellt</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500">Storniert</Badge>;
      default:
        return <Badge>Unbekannt</Badge>;
    }
  };

  const handleViewPrescription = () => {
    navigate(`/dashboard/prescriptions/${order.prescriptionId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate("/dashboard/orders")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zurück zu Bestellungen
        </Button>
        <h1 className="text-2xl font-bold">Bestellung Details</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Bestellung {order.id}
                </span>
                {getStatusBadge(order.status)}
              </CardTitle>
              <CardDescription>
                Bestellt am {new Date(order.orderDate).toLocaleDateString('de-DE')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Artikel</TableHead>
                    <TableHead>Menge</TableHead>
                    <TableHead>Preis</TableHead>
                    <TableHead>Rezept</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>€ {item.price.toFixed(2)}</TableCell>
                      <TableCell>
                        {item.prescriptionId ? (
                          <Badge variant="outline">{item.prescriptionId}</Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Zwischensumme:</span>
                  <span>€ {order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Versand:</span>
                  <span>€ {order.shipping.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Gesamt:</span>
                  <span>€ {order.total.toFixed(2)}</span>
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
                Details zum zugehörigen Rezept {order.prescriptionId}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Rezept-ID</p>
                  <p className="font-medium font-mono">{order.prescriptionId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ausstellender Arzt</p>
                  <p className="font-medium">{order.prescriptionDetails.doctorName}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Ausgestellt am</p>
                  <p className="font-medium">{new Date(order.prescriptionDetails.issuedAt).toLocaleDateString('de-DE')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gültig bis</p>
                  <p className="font-medium">{new Date(order.prescriptionDetails.validUntil).toLocaleDateString('de-DE')}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Symptome</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {order.prescriptionDetails.symptoms.map((symptom, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {symptom}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Dosierung</p>
                <p className="font-medium">{order.prescriptionDetails.dosage}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Anwendungshinweise</p>
                <p className="text-sm">{order.prescriptionDetails.instructions}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="w-5 h-5 mr-2" />
                Versandinformationen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Apotheke</p>
                <p className="font-medium">{order.pharmacyName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Versanddatum</p>
                <p className="font-medium">
                  {order.shippingDate ? new Date(order.shippingDate).toLocaleDateString('de-DE') : 'Noch nicht versendet'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sendungsnummer</p>
                <p className="font-medium">{order.trackingNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Voraussichtliche Lieferung</p>
                <p className="font-medium">{new Date(order.estimatedDelivery).toLocaleDateString('de-DE')}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Lieferadresse
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="font-medium">{order.patientName}</p>
                <p>{order.shippingAddress.street}</p>
                <p>{order.shippingAddress.city}</p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Aktionen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="default">
                Sendung verfolgen
              </Button>
              <Button className="w-full" variant="outline">
                Rechnung herunterladen
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
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
