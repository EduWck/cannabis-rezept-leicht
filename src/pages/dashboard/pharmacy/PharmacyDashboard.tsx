
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
import { 
  ShoppingBag, 
  Package, 
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp
} from "lucide-react";

const PharmacyDashboard = () => {
  const navigate = useNavigate();
  
  // Mock data - in real app would come from API
  const stats = {
    pendingOrders: 12,
    pendingPrescriptions: 8,
    lowStockItems: 5,
    completedOrdersToday: 23
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Apotheken Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
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
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Letzte Bestellungen</CardTitle>
            <CardDescription>Übersicht der neuesten Bestellungen</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">Bestellung #1234{i}</p>
                    <p className="text-sm text-muted-foreground">12.0{i}.2023, 14:3{i} Uhr</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium">89.9{i} €</div>
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
                      In Bearbeitung
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="mt-4 w-full" 
              onClick={() => navigate("/dashboard/pharmacy-orders")}
            >
              Alle Bestellungen anzeigen
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Schnellzugriff</CardTitle>
            <CardDescription>Häufig verwendete Funktionen</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
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
  );
};

export default PharmacyDashboard;
