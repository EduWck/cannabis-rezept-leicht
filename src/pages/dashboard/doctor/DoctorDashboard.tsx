
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Users, Calendar, MessageSquare, FileText, User, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState } from "react";

const DoctorDashboard = () => {
  const { user, isLoading } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleAppointmentClick = (patientName: string) => {
    toast({
      title: "Termin bestätigt",
      description: `Der Termin mit ${patientName} wurde bestätigt und der Patient benachrichtigt.`
    });
  };
  
  const handleRescheduleClick = (patientName: string) => {
    toast({
      title: "Termin verschieben",
      description: `Sie können jetzt einen neuen Termin für ${patientName} auswählen.`
    });
  };
  
  const handleViewPatient = (patientName: string) => {
    toast({
      title: "Patientenakte",
      description: `Die Akte von ${patientName} wird geöffnet.`
    });
  };

  // Show dashboard content even without a logged-in user
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Arzt Dashboard</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Patient suchen..."
              className="pl-8 h-9 w-[200px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            onClick={() => toast({ title: "Neuer Patient", description: "Formular zum Hinzufügen eines neuen Patienten geöffnet." })}
          >
            <Plus className="mr-1 h-4 w-4" /> Neuer Patient
          </Button>
        </div>
      </div>
      
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
            <Link to="/dashboard/patients" className="mt-4 inline-block">
              <Button variant="outline" size="sm">Patienten anzeigen</Button>
            </Link>
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
            <Link to="/dashboard/calendar" className="mt-4 inline-block">
              <Button variant="outline" size="sm">Kalender öffnen</Button>
            </Link>
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
            <Link to="/dashboard/requests" className="mt-4 inline-block">
              <Button variant="outline" size="sm">Anfragen bearbeiten</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      
      {/* Prescription Requests */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Rezeptanfragen</h2>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Offene Anfragen</CardTitle>
            <CardDescription>Zu prüfende Rezeptanfragen</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2">Patient</th>
                    <th className="text-left py-3 px-2">Symptome</th>
                    <th className="text-left py-3 px-2">Datum</th>
                    <th className="text-right py-3 px-2">Aktion</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Lisa Müller", symptoms: ["Schlaflosigkeit", "Schmerzen"], date: "Heute" },
                    { name: "Klaus Weber", symptoms: ["Angststörung"], date: "Gestern" },
                    { name: "Sophie Bauer", symptoms: ["Chronische Schmerzen"], date: "Vorgestern" }
                  ].map((request, i) => (
                    <tr key={i} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-2 cursor-pointer" onClick={() => handleViewPatient(request.name)}>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{request.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2">{request.symptoms.join(", ")}</td>
                      <td className="py-3 px-2">{request.date}</td>
                      <td className="py-3 px-2 text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => toast({
                              title: "Rezeptanfrage prüfen",
                              description: `Rezeptanfrage von ${request.name} wird zur Prüfung geöffnet.`
                            })}
                          >
                            <FileText className="h-3.5 w-3.5 mr-1" />
                            Prüfen
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
              <Button size="sm" onClick={() => handleAppointmentClick("Max Mustermann")}>Bestätigen</Button>
              <Button variant="outline" size="sm" onClick={() => handleRescheduleClick("Max Mustermann")}>Verschieben</Button>
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
              <Button size="sm" onClick={() => handleAppointmentClick("Anna Schmidt")}>Bestätigen</Button>
              <Button variant="outline" size="sm" onClick={() => handleRescheduleClick("Anna Schmidt")}>Verschieben</Button>
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
              <Button size="sm" onClick={() => handleAppointmentClick("Thomas Weber")}>Bestätigen</Button>
              <Button variant="outline" size="sm" onClick={() => handleRescheduleClick("Thomas Weber")}>Verschieben</Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Weekly Calendar Preview */}
      <div className="mt-8 mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Wochenübersicht</h2>
          <Link to="/dashboard/calendar">
            <Button>Alle Termine anzeigen</Button>
          </Link>
        </div>
        
        <Card className="mt-4">
          <CardContent className="pt-6">
            <AspectRatio ratio={21/9}>
              <div className="bg-muted w-full h-full rounded-md p-4 flex flex-col">
                <div className="grid grid-cols-5 gap-2 h-full">
                  {['Mo', 'Di', 'Mi', 'Do', 'Fr'].map((day, dayIndex) => (
                    <div key={day} className="flex flex-col h-full">
                      <div className="text-center font-medium pb-2 border-b">{day}</div>
                      <div className="flex-1 overflow-hidden">
                        {dayIndex === 0 && (
                          <div className="mt-2 p-1 bg-blue-100 dark:bg-blue-900/30 rounded text-xs">
                            <p className="font-bold">09:15 - 10:00</p>
                            <p>Karl Heinz</p>
                          </div>
                        )}
                        {dayIndex === 1 && (
                          <div className="mt-2 p-1 bg-green-100 dark:bg-green-900/30 rounded text-xs">
                            <p className="font-bold">11:30 - 12:15</p>
                            <p>Maria Schmidt</p>
                          </div>
                        )}
                        {dayIndex === 2 && (
                          <div className="mt-2 p-1 bg-purple-100 dark:bg-purple-900/30 rounded text-xs">
                            <p className="font-bold">14:00 - 14:45</p>
                            <p>Thomas Weber</p>
                          </div>
                        )}
                        {dayIndex === 3 && (
                          <>
                            <div className="mt-2 p-1 bg-orange-100 dark:bg-orange-900/30 rounded text-xs">
                              <p className="font-bold">10:15 - 11:00</p>
                              <p>Lisa Müller</p>
                            </div>
                            <div className="mt-2 p-1 bg-yellow-100 dark:bg-yellow-900/30 rounded text-xs">
                              <p className="font-bold">15:30 - 16:15</p>
                              <p>Hans Peter</p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AspectRatio>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoctorDashboard;
