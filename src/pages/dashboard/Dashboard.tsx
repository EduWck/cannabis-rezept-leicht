import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { user, userRole, isLoading } = useAuth();
  const navigate = useNavigate();
  const [redirecting, setRedirecting] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  // Track when the component is mounted
  useEffect(() => {
    console.log("Dashboard component mounted");
    setPageLoaded(true);
    
    // On initial load, show a notification for doctors to confirm we're on the right path
    if (user?.email?.includes('doctor')) {
      console.log("Doctor detected on dashboard component load");
      toast({
        title: "Arzt-Dashboard",
        description: "Willkommen im Arzt-Bereich."
      });
    }
  }, [user]);

  useEffect(() => {
    if (pageLoaded && !isLoading && !redirecting) {
      // If user is a patient, redirect to profile immediately
      if (user && userRole === "patient") {
        console.log("User is patient in Dashboard component, redirecting to profile");
        setRedirecting(true);
        setTimeout(() => {
          navigate("/dashboard/profile", { replace: true });
        }, 100);
      } else if (!userRole && user) {
        console.log("No user role detected in Dashboard, but user exists");
        
        // Try to determine role from email
        if (user.email) {
          const email = user.email.toLowerCase();
          if (email.includes('doctor')) {
            console.log("Doctor email detected, staying on dashboard");
            toast({
              title: "Arzt erkannt",
              description: "Willkommen im Arzt-Bereich."
            });
          }
        }
      } else if (!user) {
        console.log("No user detected in Dashboard");
      } else {
        console.log(`User is ${userRole}, staying on dashboard`);
      }
    }
  }, [user, userRole, isLoading, navigate, redirecting, pageLoaded]);

  // If still loading, show a loading indicator
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-cannabis-green-500" />
        <span className="ml-2">Lade Benutzerdaten...</span>
      </div>
    );
  }

  // If no user, show appropriate message
  if (!user) {
    return (
      <div className="text-center py-20">
        <p>Kein Benutzer angemeldet.</p>
      </div>
    );
  }
  
  if (!userRole) {
    return (
      <div className="text-center py-20">
        <p>Benutzerrolle konnte nicht erkannt werden.</p>
      </div>
    );
  }

  // Patient users should never see this screen as they get redirected
  if (userRole === "patient") {
    return (
      <div className="text-center py-20">
        <p>Weiterleitung zum Patientenprofil...</p>
        <Loader2 className="h-6 w-6 animate-spin text-cannabis-green-500 mx-auto mt-2" />
      </div>
    );
  }

  // Display appropriate dashboard based on user role
  const renderDashboardContent = () => {
    switch (userRole) {
      case "admin":
        return renderAdminDashboard();
      case "doctor":
        return renderDoctorDashboard();
      default:
        return (
          <div className="text-center py-20">
            <p>Unbekannte Benutzerrolle: {userRole}</p>
          </div>
        );
    }
  };

  const renderAdminDashboard = () => (
    <>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="bg-cannabis-green-50 dark:bg-cannabis-green-900/20">
            <CardTitle className="text-cannabis-green-700 dark:text-cannabis-green-400">Benutzer</CardTitle>
            <CardDescription>Nutzerkonten verwalten</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">127</div>
            <p className="text-sm text-muted-foreground mt-2">Registrierte Nutzer</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="bg-cannabis-green-50 dark:bg-cannabis-green-900/20">
            <CardTitle className="text-cannabis-green-700 dark:text-cannabis-green-400">Rezepte</CardTitle>
            <CardDescription>Verschreibungen verwalten</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">84</div>
            <p className="text-sm text-muted-foreground mt-2">Aktive Rezepte</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="bg-cannabis-green-50 dark:bg-cannabis-green-900/20">
            <CardTitle className="text-cannabis-green-700 dark:text-cannabis-green-400">Bestellungen</CardTitle>
            <CardDescription>Bestellstatus verfolgen</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">42</div>
            <p className="text-sm text-muted-foreground mt-2">Offene Bestellungen</p>
          </CardContent>
        </Card>
      </div>
      
      <h2 className="text-xl font-semibold mt-8 mb-4">Neueste Aktivitäten</h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <ul className="space-y-3">
          <li className="flex justify-between items-center border-b pb-2 dark:border-gray-700">
            <span>Neuer Patient registriert</span>
            <span className="text-sm text-gray-500">Heute, 14:32</span>
          </li>
          <li className="flex justify-between items-center border-b pb-2 dark:border-gray-700">
            <span>Rezept ausgestellt</span>
            <span className="text-sm text-gray-500">Heute, 11:15</span>
          </li>
          <li className="flex justify-between items-center border-b pb-2 dark:border-gray-700">
            <span>Bestellung eingegangen</span>
            <span className="text-sm text-gray-500">Heute, 09:03</span>
          </li>
          <li className="flex justify-between items-center">
            <span>Beratungstermin vereinbart</span>
            <span className="text-sm text-gray-500">Gestern, 16:47</span>
          </li>
        </ul>
      </div>
    </>
  );

  const renderDoctorDashboard = () => (
    <>
      <h1 className="text-2xl font-bold mb-6">Arzt Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="bg-cannabis-green-50 dark:bg-cannabis-green-900/20">
            <CardTitle className="text-cannabis-green-700 dark:text-cannabis-green-400">Patienten</CardTitle>
            <CardDescription>Patientenliste einsehen</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">48</div>
            <p className="text-sm text-muted-foreground mt-2">Aktive Patienten</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="bg-cannabis-green-50 dark:bg-cannabis-green-900/20">
            <CardTitle className="text-cannabis-green-700 dark:text-cannabis-green-400">Termine</CardTitle>
            <CardDescription>Anstehende Konsultationen</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">12</div>
            <p className="text-sm text-muted-foreground mt-2">Für diese Woche</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="bg-cannabis-green-50 dark:bg-cannabis-green-900/20">
            <CardTitle className="text-cannabis-green-700 dark:text-cannabis-green-400">Anfragen</CardTitle>
            <CardDescription>Neue Patientenanfragen</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">7</div>
            <p className="text-sm text-muted-foreground mt-2">Unbearbeitete Anfragen</p>
          </CardContent>
        </Card>
      </div>
      
      <h2 className="text-xl font-semibold mt-8 mb-4">Heutige Termine</h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <ul className="space-y-3">
          <li className="flex justify-between items-center border-b pb-2 dark:border-gray-700">
            <span>Max Mustermann - Erstgespräch</span>
            <span className="text-sm text-gray-500">15:00 - 15:30</span>
          </li>
          <li className="flex justify-between items-center border-b pb-2 dark:border-gray-700">
            <span>Anna Schmidt - Kontrolluntersuchung</span>
            <span className="text-sm text-gray-500">16:00 - 16:30</span>
          </li>
          <li className="flex justify-between items-center">
            <span>Thomas Weber - Rezeptverlängerung</span>
            <span className="text-sm text-gray-500">17:00 - 17:15</span>
          </li>
        </ul>
      </div>
    </>
  );

  return (
    <div className="container mx-auto">
      {renderDashboardContent()}
    </div>
  );
};

export default Dashboard;
