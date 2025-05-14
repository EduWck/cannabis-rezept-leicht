
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, User, FileText, ShoppingBag, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";

const PatientDashboard = () => {
  const { user, profile, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    toast({
      title: "Termin angefragt",
      description: "Ihre Terminanfrage wurde erfolgreich übermittelt."
    });
    // In a real app, we would navigate to the appointments page
    setTimeout(() => navigate("/dashboard/appointments"), 1500);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-cannabis-green-500" />
        <span className="ml-2">Lade Patientendaten...</span>
      </div>
    );
  }

  // Testdaten für Dashboard-Anzeige wenn kein Benutzer angemeldet ist
  const testProfile = {
    first_name: "Max",
    last_name: "Mustermann",
    street_address: "Musterstraße 123",
    postal_code: "12345",
    city: "Musterstadt"
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Patienten Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="bg-cannabis-green-50 dark:bg-cannabis-green-900/20">
            <CardTitle className="text-cannabis-green-700 dark:text-cannabis-green-400">
              <User className="h-5 w-5 inline-block mr-2" /> Mein Profil
            </CardTitle>
            <CardDescription>Persönliche Informationen</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p><strong>Name:</strong> {profile?.first_name || testProfile.first_name} {profile?.last_name || testProfile.last_name}</p>
              <p><strong>Email:</strong> {user?.email || "patient@example.com"}</p>
              <p><strong>Adresse:</strong> {profile?.street_address || testProfile.street_address}, {profile?.postal_code || testProfile.postal_code} {profile?.city || testProfile.city}</p>
            </div>
            <div className="mt-4">
              <Link to="/dashboard/profile">
                <Button variant="outline" size="sm">Profil bearbeiten</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="bg-cannabis-green-50 dark:bg-cannabis-green-900/20">
            <CardTitle className="text-cannabis-green-700 dark:text-cannabis-green-400">
              <Calendar className="h-5 w-5 inline-block mr-2" /> Termine
            </CardTitle>
            <CardDescription>Arzttermine verwalten</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-4">Sie haben keine anstehenden Termine.</p>
            <Button size="sm" onClick={handleBookAppointment}>Termin vereinbaren</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="bg-cannabis-green-50 dark:bg-cannabis-green-900/20">
            <CardTitle className="text-cannabis-green-700 dark:text-cannabis-green-400">
              <FileText className="h-5 w-5 inline-block mr-2" /> Rezepte
            </CardTitle>
            <CardDescription>Ihre Verschreibungen</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-4">1 aktives Rezept</p>
            <Link to="/dashboard/prescriptions">
              <Button variant="outline" size="sm">Rezepte anzeigen</Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="bg-cannabis-green-50 dark:bg-cannabis-green-900/20">
            <CardTitle className="text-cannabis-green-700 dark:text-cannabis-green-400">
              <ShoppingBag className="h-5 w-5 inline-block mr-2" /> Bestellungen
            </CardTitle>
            <CardDescription>Ihre Bestellungen</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-4">2 Bestellungen insgesamt</p>
            <Link to="/dashboard/orders">
              <Button variant="outline" size="sm">Bestellungen anzeigen</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientDashboard;
