
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, User, Users, Stethoscope, Package } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Dashboard = () => {
  const { user, userRole } = useAuth();
  const navigate = useNavigate();
  
  // For testing - always provide dashboard selector
  return (
    <div className="py-6 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 text-center">Dashboard Auswahl</h1>
      <p className="text-center mb-8 sm:mb-12 text-base sm:text-lg text-muted-foreground">
        Willkommen im MediCannabis-Portal. Bitte wählen Sie einen Dashboard-Typ aus:
      </p>
      
      <div className="grid gap-4 sm:gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
        <Card className="p-4 sm:p-6 hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate("/dashboard/admin")}>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-cannabis-green-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-cannabis-green-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">Administrator</h3>
            <p className="text-muted-foreground mb-4 text-sm sm:text-base">
              Verwalten Sie Benutzer, Bestellungen und Rezepte im Administrationsbereich.
            </p>
            <Button variant="outline" className="mt-2 w-full" onClick={() => navigate("/dashboard/admin")}>
              Administrator Dashboard öffnen
            </Button>
          </div>
        </Card>
        
        <Card className="p-4 sm:p-6 hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate("/dashboard/doctor")}>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-cannabis-green-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <Stethoscope className="h-6 w-6 sm:h-8 sm:w-8 text-cannabis-green-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">Arzt</h3>
            <p className="text-muted-foreground mb-4 text-sm sm:text-base">
              Verwalten Sie Patientendaten, Termine und stellen Sie Rezepte aus.
            </p>
            <Button variant="outline" className="mt-2 w-full" onClick={() => navigate("/dashboard/doctor")}>
              Arzt Dashboard öffnen
            </Button>
          </div>
        </Card>
        
        <Card className="p-4 sm:p-6 hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate("/dashboard/patient")}>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-cannabis-green-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <User className="h-6 w-6 sm:h-8 sm:w-8 text-cannabis-green-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">Patient</h3>
            <p className="text-muted-foreground mb-4 text-sm sm:text-base">
              Verwalten Sie Ihre Rezepte, Bestellungen und persönlichen Daten.
            </p>
            <Button variant="outline" className="mt-2 w-full" onClick={() => navigate("/dashboard/patient")}>
              Patienten Dashboard öffnen
            </Button>
          </div>
        </Card>
        
        <Card className="p-4 sm:p-6 hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate("/dashboard/pharmacy")}>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-cannabis-green-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <Package className="h-6 w-6 sm:h-8 sm:w-8 text-cannabis-green-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">Apotheke</h3>
            <p className="text-muted-foreground mb-4 text-sm sm:text-base">
              Verwalten Sie Bestellungen, Ihren Bestand und Rezeptanfragen.
            </p>
            <Button variant="outline" className="mt-2 w-full" onClick={() => navigate("/dashboard/pharmacy")}>
              Apotheken Dashboard öffnen
            </Button>
          </div>
        </Card>
      </div>
      
      <div className="mt-8 sm:mt-12 text-center">
        <p className="text-xs sm:text-sm text-muted-foreground px-4">
          Dies ist ein Testmodus. In einer produktiven Umgebung würden Sie automatisch zum entsprechenden Dashboard basierend auf Ihrer Benutzerrolle weitergeleitet.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
