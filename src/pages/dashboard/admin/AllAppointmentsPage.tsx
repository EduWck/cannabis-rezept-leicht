
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Search, Calendar as CalendarIcon, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { de } from "date-fns/locale";

const AllAppointmentsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Sample appointments data
  const appointments = [
    { 
      id: 1, 
      patient: "Max Mustermann", 
      doctor: "Dr. Schmidt", 
      date: "15.06.2025", 
      time: "14:30", 
      type: "Erstgespräch",
      status: "confirmed"
    },
    { 
      id: 2, 
      patient: "Anna Schmidt", 
      doctor: "Dr. Müller", 
      date: "15.06.2025", 
      time: "15:00", 
      type: "Folgeuntersuchung",
      status: "pending"
    },
    { 
      id: 3, 
      patient: "Klaus Weber", 
      doctor: "Dr. Schmidt", 
      date: "15.06.2025", 
      time: "16:30", 
      type: "Rezeptverlängerung",
      status: "confirmed"
    },
    { 
      id: 4, 
      patient: "Lisa Müller", 
      doctor: "Dr. Weber", 
      date: "16.06.2025", 
      time: "09:00", 
      type: "Erstgespräch",
      status: "confirmed"
    },
    { 
      id: 5, 
      patient: "Thomas Bauer", 
      doctor: "Dr. Müller", 
      date: "16.06.2025", 
      time: "11:30", 
      type: "Kontrolle",
      status: "cancelled"
    },
  ];

  // Filter appointments based on search, doctor, and date
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesDoctor = doctorFilter === "all" || appointment.doctor.includes(doctorFilter);
    
    const matchesDate = !selectedDate || appointment.date === format(selectedDate, 'dd.MM.yyyy');
    
    return matchesSearch && matchesDoctor && matchesDate;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Bestätigt</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Ausstehend</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Storniert</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleDayClick = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Alle Termine</h1>
        <Button onClick={() => toast({
          title: "Neuer Termin",
          description: "Formular zum Erstellen eines neuen Termins geöffnet."
        })}>
          <Plus className="mr-2 h-4 w-4" />
          Neuen Termin erstellen
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Terminübersicht</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Suchen..."
                      className="pl-8 w-[180px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={doctorFilter} onValueChange={setDoctorFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Arzt auswählen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Alle Ärzte</SelectItem>
                      <SelectItem value="Dr. Schmidt">Dr. Schmidt</SelectItem>
                      <SelectItem value="Dr. Müller">Dr. Müller</SelectItem>
                      <SelectItem value="Dr. Weber">Dr. Weber</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Arzt</TableHead>
                    <TableHead>Datum</TableHead>
                    <TableHead>Uhrzeit</TableHead>
                    <TableHead>Art</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.patient}</TableCell>
                      <TableCell>{appointment.doctor}</TableCell>
                      <TableCell>{appointment.date}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>{appointment.type}</TableCell>
                      <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => toast({
                              title: "Termin bearbeiten",
                              description: `Termin von ${appointment.patient} wird bearbeitet.`
                            })}
                          >
                            Bearbeiten
                          </Button>
                          
                          {appointment.status !== "cancelled" && (
                            <Button 
                              size="sm"
                              variant="outline"
                              onClick={() => toast({
                                title: "Termin storniert",
                                description: `Der Termin von ${appointment.patient} wurde storniert.`
                              })}
                            >
                              Stornieren
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {filteredAppointments.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">
                        Keine Termine gefunden
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5" />
                Kalender
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDayClick}
                locale={de}
                className="rounded-md border"
              />
              
              <div className="mt-4">
                <h3 className="font-medium mb-2">
                  {selectedDate ? format(selectedDate, 'd. MMMM yyyy', { locale: de }) : "Heute"}
                </h3>
                {filteredAppointments.length > 0 ? (
                  <div className="space-y-2">
                    {filteredAppointments.map(appointment => (
                      <div key={appointment.id} className="p-2 border rounded-md">
                        <p className="font-medium">{appointment.time} - {appointment.patient}</p>
                        <p className="text-sm text-muted-foreground">{appointment.doctor} • {appointment.type}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Keine Termine an diesem Tag</p>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Terminstatistik</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Heute:</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between">
                  <span>Diese Woche:</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span>Diesen Monat:</span>
                  <span className="font-medium">48</span>
                </div>
                <div className="flex justify-between">
                  <span>Stornierte Termine:</span>
                  <span className="font-medium">5</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AllAppointmentsPage;
