
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Users, Calendar, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const DoctorDashboard = () => {
  const { user, isLoading } = useAuth();
  
  const handleAppointmentClick = () => {
    toast({
      title: "Termin bestätigt",
      description: "Der Termin wurde bestätigt und der Patient benachrichtigt."
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-cannabis-green-500" />
        <span className="ml-2">Lade Arztdaten...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-20">
        <p>Kein Benutzer angemeldet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Arzt Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="bg-cannabis-green-50 dark:bg-cannabis-green-900/20">
            <CardTitle className="text-cannabis-green-700 dark:text-cannabis-green-400">
              <Users className="h-5 w-5 inline-block mr-2" /> Patienten
            </CardTitle>
            <CardDescription>Patientenliste einsehen</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">48</div>
            <p className="text-sm text-muted-foreground mt-2">Aktive Patienten</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="bg-cannabis-green-50 dark:bg-cannabis-green-900/20">
            <CardTitle className="text-cannabis-green-700 dark:text-cannabis-green-400">
              <Calendar className="h-5 w-5 inline-block mr-2" /> Termine
            </CardTitle>
            <CardDescription>Anstehende Konsultationen</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">12</div>
            <p className="text-sm text-muted-foreground mt-2">Für diese Woche</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="bg-cannabis-green-50 dark:bg-cannabis-green-900/20">
            <CardTitle className="text-cannabis-green-700 dark:text-cannabis-green-400">
              <MessageSquare className="h-5 w-5 inline-block mr-2" /> Anfragen
            </CardTitle>
            <CardDescription>Neue Patientenanfragen</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">7</div>
            <p className="text-sm text-muted-foreground mt-2">Unbearbeitete Anfragen</p>
          </CardContent>
        </Card>
      </div>
      
      <h2 className="text-xl font-semibold mt-8 mb-4">Heutige Termine</h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-4 border-b dark:border-gray-700">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Max Mustermann</h3>
              <p className="text-sm text-muted-foreground">Erstgespräch</p>
              <p className="text-sm text-muted-foreground">15:00 - 15:30</p>
            </div>
            <div className="space-x-2">
              <Button size="sm" onClick={handleAppointmentClick}>Bestätigen</Button>
              <Button variant="outline" size="sm">Verschieben</Button>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-b dark:border-gray-700">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Anna Schmidt</h3>
              <p className="text-sm text-muted-foreground">Kontrolluntersuchung</p>
              <p className="text-sm text-muted-foreground">16:00 - 16:30</p>
            </div>
            <div className="space-x-2">
              <Button size="sm" onClick={handleAppointmentClick}>Bestätigen</Button>
              <Button variant="outline" size="sm">Verschieben</Button>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Thomas Weber</h3>
              <p className="text-sm text-muted-foreground">Rezeptverlängerung</p>
              <p className="text-sm text-muted-foreground">17:00 - 17:15</p>
            </div>
            <div className="space-x-2">
              <Button size="sm" onClick={handleAppointmentClick}>Bestätigen</Button>
              <Button variant="outline" size="sm">Verschieben</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
