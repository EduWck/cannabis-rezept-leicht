
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { 
  Search, 
  Plus, 
  User, 
  FileText, 
  Calendar, 
  MessageSquare 
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const PatientsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sample patient data
  const patients = [
    { id: 1, name: "Max Mustermann", age: 42, condition: "Chronische Schmerzen", lastVisit: "03.04.2025" },
    { id: 2, name: "Anna Schmidt", age: 35, condition: "Schlafstörungen", lastVisit: "12.05.2025" },
    { id: 3, name: "Klaus Weber", age: 51, condition: "Angststörung", lastVisit: "28.03.2025" },
    { id: 4, name: "Lisa Müller", age: 29, condition: "Migräne", lastVisit: "15.05.2025" },
    { id: 5, name: "Thomas Bauer", age: 47, condition: "Rückenschmerzen", lastVisit: "01.05.2025" },
  ];
  
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Patienten</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Nach Patienten suchen..."
              className="pl-8 w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={() => toast({
            title: "Neuer Patient",
            description: "Formular zum Hinzufügen eines neuen Patienten geöffnet."
          })}>
            <Plus className="mr-1 h-4 w-4" /> Neuer Patient
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patientenliste</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Alter</TableHead>
                <TableHead>Diagnose</TableHead>
                <TableHead>Letzter Besuch</TableHead>
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map(patient => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.name}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.condition}</TableCell>
                  <TableCell>{patient.lastVisit}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => toast({
                          title: "Patientenakte",
                          description: `Die Akte von ${patient.name} wurde geöffnet.`
                        })}
                      >
                        <User className="h-4 w-4 mr-1" />
                        Akte
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => toast({
                          title: "Rezept ausstellen",
                          description: `Neues Rezept für ${patient.name} erstellen.`
                        })}
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        Rezept
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => toast({
                          title: "Termin vereinbaren",
                          description: `Terminvereinbarung für ${patient.name} geöffnet.`
                        })}
                      >
                        <Calendar className="h-4 w-4 mr-1" />
                        Termin
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Patientenstatistik
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Gesamtzahl Patienten:</span>
                <span className="font-medium">48</span>
              </div>
              <div className="flex justify-between">
                <span>Neue Patienten (30 Tage):</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span>Aktive Behandlungen:</span>
                <span className="font-medium">35</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Anstehende Termine
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Heute, 14:30</span>
                <span>Max Mustermann</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Morgen, 10:15</span>
                <span>Anna Schmidt</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Morgen, 15:00</span>
                <span>Klaus Weber</span>
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-2"
                onClick={() => toast({
                  title: "Kalender",
                  description: "Kalenderansicht wird geöffnet."
                })}
              >
                <Calendar className="mr-1 h-4 w-4" />
                Kalender öffnen
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              Anfragen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex flex-col">
                <span>3 neue Rezeptanfragen</span>
              </div>
              <div className="flex flex-col">
                <span>2 neue Terminanfragen</span>
              </div>
              <div className="flex flex-col">
                <span>5 zu prüfende Dokumente</span>
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-2"
                onClick={() => toast({
                  title: "Anfragen",
                  description: "Liste aller Anfragen wird geöffnet."
                })}
              >
                <MessageSquare className="mr-1 h-4 w-4" />
                Alle Anfragen
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientsPage;
