
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
import { 
  FileText, 
  Download, 
  ShoppingCart, 
  Heart,
  Clock,
  CheckCircle,
  XCircle,
  Stethoscope,
  Receipt,
  User,
  HelpCircle
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [isReorderDialogOpen, setIsReorderDialogOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<any>(null);
  
  // Mock data - in real app would come from API
  const prescriptions = [
    {
      id: "RX-2023-001",
      date: "2023-12-15",
      status: "approved",
      products: [
        { name: "Cannabisblüte THC18", quantity: "10g", dosage: "3x täglich 0.1g" }
      ],
      doctor: "Dr. Sarah Schmidt",
      canReorder: true,
      lastOrdered: "2023-12-10"
    },
    {
      id: "RX-2023-002", 
      date: "2023-12-10",
      status: "in_review",
      products: [
        { name: "CBD Öl 10%", quantity: "30ml", dosage: "2x täglich 3 Tropfen" }
      ],
      doctor: "Dr. Thomas Meyer",
      canReorder: false
    },
    {
      id: "RX-2023-003",
      date: "2023-12-05",
      status: "rejected",
      products: [
        { name: "Cannabisblüte THC22", quantity: "15g", dosage: "2x täglich 0.15g" }
      ],
      doctor: "Dr. Sarah Schmidt",
      canReorder: false,
      rejectionReason: "Zusätzliche Dokumentation erforderlich"
    }
  ];

  const recentOrders = [
    {
      id: "ORD-2023-105",
      date: "2023-12-12",
      status: "shipped",
      total: 89.95,
      tracking: "DHL123456789",
      items: 2
    },
    {
      id: "ORD-2023-104",
      date: "2023-12-08",
      status: "delivered",
      total: 156.50,
      tracking: "DHL987654321",
      items: 3
    }
  ];

  const medicalFindings = [
    {
      id: "MF-2023-001",
      date: "2023-12-14",
      doctor: "Dr. Sarah Schmidt",
      type: "Verlaufskontrolle",
      hasComments: true,
      summary: "Gute Verträglichkeit, Dosierung beibehalten"
    },
    {
      id: "MF-2023-002",
      date: "2023-11-28",
      doctor: "Dr. Thomas Meyer",
      type: "Erstberatung",
      hasComments: true,
      summary: "Therapieempfehlung erstellt"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'approved':
        return <Badge className="bg-green-500 hover:bg-green-600"><CheckCircle className="w-3 h-3 mr-1" />Freigegeben</Badge>;
      case 'in_review':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600"><Clock className="w-3 h-3 mr-1" />In Prüfung</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500 hover:bg-red-600"><XCircle className="w-3 h-3 mr-1" />Abgelehnt</Badge>;
      case 'shipped':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Versendet</Badge>;
      case 'delivered':
        return <Badge className="bg-green-500 hover:bg-green-600">Zugestellt</Badge>;
      default:
        return <Badge>Unbekannt</Badge>;
    }
  };

  const handleReorder = (prescription: any) => {
    setSelectedPrescription(prescription);
    setIsReorderDialogOpen(true);
  };

  const confirmReorder = () => {
    toast({
      title: "Bestellung aufgegeben",
      description: `Ihre Nachbestellung für ${selectedPrescription?.id} wurde erfolgreich aufgegeben.`,
    });
    setIsReorderDialogOpen(false);
    setSelectedPrescription(null);
  };

  const downloadInvoice = (orderId: string) => {
    toast({
      title: "Download gestartet",
      description: `Rechnung für Bestellung ${orderId} wird heruntergeladen.`,
    });
    // In real app: trigger actual PDF download
  };

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Guten Morgen";
    if (hour < 18) return "Guten Tag";
    return "Guten Abend";
  };

  return (
    <div className="space-y-6">
      {/* Begrüßungsbereich */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">{getCurrentGreeting()}!</h1>
        <p className="text-muted-foreground">
          Hier finden Sie eine Übersicht über Ihre Rezepte, Bestellungen und medizinischen Befunde.
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          <Button onClick={() => navigate("/dashboard/prescriptions")} className="bg-green-600 hover:bg-green-700">
            <FileText className="w-4 h-4 mr-2" />
            Alle Rezepte
          </Button>
          <Button variant="outline" onClick={() => navigate("/dashboard/orders")}>
            <ShoppingCart className="w-4 h-4 mr-2" />
            Bestellungen
          </Button>
          <Button variant="outline" onClick={() => navigate("/dashboard/medical-findings")}>
            <Stethoscope className="w-4 h-4 mr-2" />
            Befunde
          </Button>
        </div>
      </div>

      {/* Aktuelle Rezepte */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Aktuelle Rezepte
          </CardTitle>
          <CardDescription>Ihre neuesten Verschreibungen und deren Status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {prescriptions.map((prescription) => (
              <Card key={prescription.id} className="border hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-sm font-medium">{prescription.id}</CardTitle>
                    {getStatusBadge(prescription.status)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Ausgestellt: {new Date(prescription.date).toLocaleDateString('de-DE')}
                  </p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Verschrieben von:</p>
                    <p className="text-sm text-muted-foreground">{prescription.doctor}</p>
                    
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Produkte:</p>
                      {prescription.products.map((product, index) => (
                        <div key={index} className="text-sm">
                          <p className="font-medium">{product.name}</p>
                          <p className="text-muted-foreground text-xs">
                            {product.quantity} • {product.dosage}
                          </p>
                        </div>
                      ))}
                    </div>

                    {prescription.status === 'rejected' && prescription.rejectionReason && (
                      <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 rounded">
                        <p className="text-xs text-red-700 dark:text-red-300">
                          <strong>Ablehnungsgrund:</strong> {prescription.rejectionReason}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-col gap-2 mt-4">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => navigate(`/dashboard/prescriptions/${prescription.id}`)}
                        className="w-full"
                      >
                        Details ansehen
                      </Button>
                      
                      {prescription.canReorder && prescription.status === 'approved' && (
                        <Button 
                          size="sm" 
                          onClick={() => handleReorder(prescription)}
                          className="w-full bg-green-600 hover:bg-green-700"
                        >
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          Erneut bestellen
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {prescriptions.length === 0 && (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Noch keine Rezepte vorhanden</p>
              <Button className="mt-2" onClick={() => navigate("/fragebogen")}>
                Erstes Rezept beantragen
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bestellungen & Befunde */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Letzte Bestellungen */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Receipt className="w-5 h-5 mr-2" />
              Letzte Bestellungen
            </CardTitle>
            <CardDescription>Ihre neuesten Bestellungen und Rechnungen</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.date).toLocaleDateString('de-DE')} • {order.items} Artikel
                    </p>
                    {order.tracking && (
                      <p className="text-xs text-blue-600">Tracking: {order.tracking}</p>
                    )}
                  </div>
                  <div className="text-right space-y-2">
                    <p className="font-medium">{order.total.toFixed(2)} €</p>
                    {getStatusBadge(order.status)}
                    <div className="flex gap-1">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => downloadInvoice(order.id)}
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Rechnung
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button 
              variant="outline" 
              className="w-full mt-4" 
              onClick={() => navigate("/dashboard/orders")}
            >
              Alle Bestellungen anzeigen
            </Button>
          </CardContent>
        </Card>

        {/* Medizinische Befunde */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Stethoscope className="w-5 h-5 mr-2" />
              Medizinische Befunde
            </CardTitle>
            <CardDescription>Ihre Behandlungsverläufe und ärztlichen Kommentare</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {medicalFindings.map((finding) => (
                <div key={finding.id} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium">{finding.type}</p>
                    <Badge variant="outline">{new Date(finding.date).toLocaleDateString('de-DE')}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Behandelnder Arzt: {finding.doctor}
                  </p>
                  <p className="text-sm">{finding.summary}</p>
                  {finding.hasComments && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="mt-2"
                      onClick={() => navigate(`/dashboard/medical-findings/${finding.id}`)}
                    >
                      Vollständige Befunde ansehen
                    </Button>
                  )}
                </div>
              ))}
            </div>
            
            <Button 
              variant="outline" 
              className="w-full mt-4" 
              onClick={() => navigate("/dashboard/medical-findings")}
            >
              Alle Befunde anzeigen
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Schnellzugriffe */}
      <Card>
        <CardHeader>
          <CardTitle>Schnellzugriffe</CardTitle>
          <CardDescription>Häufig verwendete Funktionen</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex-col" 
              onClick={() => navigate("/dashboard/profile")}
            >
              <User className="w-6 h-6 mb-2" />
              <span className="text-sm">Profil bearbeiten</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex-col" 
              onClick={() => navigate("/fragebogen")}
            >
              <Heart className="w-6 h-6 mb-2" />
              <span className="text-sm">Neues Rezept</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex-col" 
              onClick={() => navigate("/kontakt")}
            >
              <HelpCircle className="w-6 h-6 mb-2" />
              <span className="text-sm">Hilfe & Support</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex-col" 
              onClick={() => toast({ title: "Feature verfügbar", description: "Video-Sprechstunden sind bald verfügbar." })}
            >
              <Stethoscope className="w-6 h-6 mb-2" />
              <span className="text-sm">Telemedizin</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reorder Dialog */}
      <Dialog open={isReorderDialogOpen} onOpenChange={setIsReorderDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nachbestellung bestätigen</DialogTitle>
            <DialogDescription>
              Möchten Sie das Rezept {selectedPrescription?.id} erneut bestellen?
            </DialogDescription>
          </DialogHeader>
          
          {selectedPrescription && (
            <div className="py-4">
              <div className="space-y-2">
                <p className="font-medium">Produkte:</p>
                {selectedPrescription.products.map((product: any, index: number) => (
                  <div key={index} className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Menge: {product.quantity} • Dosierung: {product.dosage}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Letzte Bestellung: {selectedPrescription.lastOrdered && new Date(selectedPrescription.lastOrdered).toLocaleDateString('de-DE')}
              </p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReorderDialogOpen(false)}>
              Abbrechen
            </Button>
            <Button onClick={confirmReorder} className="bg-green-600 hover:bg-green-700">
              Bestellen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientDashboard;
