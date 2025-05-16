
import { User, FileText, ShoppingBag, Calendar, FileCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import MedicalFindings from "@/components/dashboard/MedicalFindings";

const PatientDashboard = () => {
  const navigate = useNavigate();

  // Test profile data
  const testProfile = {
    first_name: "Max",
    last_name: "Mustermann",
    email: "patient@example.com",
    street_address: "Musterstraße 123",
    postal_code: "12345",
    city: "Musterstadt"
  };

  const handleBookAppointment = () => {
    navigate("/dashboard/appointments");
  };

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold mb-6">Patienten Dashboard</h1>
      
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="bg-cannabis-green-50 dark:bg-cannabis-green-900/20 px-4 sm:px-6 py-4">
            <CardTitle className="text-cannabis-green-700 dark:text-cannabis-green-400 flex items-center text-base sm:text-lg">
              <User className="h-4 w-4 sm:h-5 sm:w-5 inline-block mr-2" /> Mein Profil
            </CardTitle>
            <CardDescription>Persönliche Informationen</CardDescription>
          </CardHeader>
          <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
            <div className="space-y-2 text-sm sm:text-base">
              <p><strong>Name:</strong> {testProfile.first_name} {testProfile.last_name}</p>
              <p className="break-words"><strong>Email:</strong> {testProfile.email}</p>
              <p><strong>Adresse:</strong> {testProfile.street_address}, {testProfile.postal_code} {testProfile.city}</p>
            </div>
            <div className="mt-4">
              <Link to="/dashboard/profile">
                <Button variant="outline" size="sm">Profil bearbeiten</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="bg-cannabis-green-50 dark:bg-cannabis-green-900/20 px-4 sm:px-6 py-4">
            <CardTitle className="text-cannabis-green-700 dark:text-cannabis-green-400 flex items-center text-base sm:text-lg">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 inline-block mr-2" /> Termine
            </CardTitle>
            <CardDescription>Arzttermine verwalten</CardDescription>
          </CardHeader>
          <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
            <p className="mb-4 text-sm sm:text-base">Sie haben keine anstehenden Termine.</p>
            <Button size="sm" onClick={handleBookAppointment}>Termin vereinbaren</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="bg-cannabis-green-50 dark:bg-cannabis-green-900/20 px-4 sm:px-6 py-4">
            <CardTitle className="text-cannabis-green-700 dark:text-cannabis-green-400 flex items-center text-base sm:text-lg">
              <FileText className="h-4 w-4 sm:h-5 sm:w-5 inline-block mr-2" /> Rezepte
            </CardTitle>
            <CardDescription>Ihre Verschreibungen</CardDescription>
          </CardHeader>
          <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
            <p className="mb-4 text-sm sm:text-base">1 aktives Rezept</p>
            <Link to="/dashboard/prescriptions">
              <Button variant="outline" size="sm">Rezepte anzeigen</Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="bg-cannabis-green-50 dark:bg-cannabis-green-900/20 px-4 sm:px-6 py-4">
            <CardTitle className="text-cannabis-green-700 dark:text-cannabis-green-400 flex items-center text-base sm:text-lg">
              <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 inline-block mr-2" /> Bestellungen
            </CardTitle>
            <CardDescription>Ihre Bestellungen</CardDescription>
          </CardHeader>
          <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
            <p className="mb-4 text-sm sm:text-base">2 Bestellungen insgesamt</p>
            <Link to="/dashboard/orders">
              <Button variant="outline" size="sm">Bestellungen anzeigen</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="bg-cannabis-green-50 dark:bg-cannabis-green-900/20 px-4 sm:px-6 py-4">
            <CardTitle className="text-cannabis-green-700 dark:text-cannabis-green-400 flex items-center text-base sm:text-lg">
              <FileCheck className="h-4 w-4 sm:h-5 sm:w-5 inline-block mr-2" /> Medizinische Befunde
            </CardTitle>
            <CardDescription>Ihre ärztlichen Befunde und Diagnosen</CardDescription>
          </CardHeader>
          <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
            <div className="space-y-4">
              <p className="mb-4 text-sm sm:text-base">Sie haben 2 medizinische Befunde.</p>
              <Link to="/dashboard/medical-findings">
                <Button variant="outline" size="sm">Alle Befunde anzeigen</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientDashboard;
