
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Clock, User, Plus } from "lucide-react";

const CalendarPage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Sample appointments data
  const appointments = [
    { id: 1, patientName: "Max Mustermann", time: "09:00", duration: 30, type: "Erstgespräch" },
    { id: 2, patientName: "Anna Schmidt", time: "10:15", duration: 30, type: "Folgeuntersuchung" },
    { id: 3, patientName: "Klaus Weber", time: "11:30", duration: 45, type: "Beratungsgespräch" },
    { id: 4, patientName: "Lisa Müller", time: "14:00", duration: 30, type: "Rezeptverlängerung" },
    { id: 5, patientName: "Thomas Bauer", time: "15:30", duration: 45, type: "Erstgespräch" },
  ];

  const handleAddAppointment = () => {
    toast({
      title: "Termin hinzufügen",
      description: "Maske zum Hinzufügen eines neuen Termins geöffnet."
    });
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Terminkalender</h1>
        <Button onClick={handleAddAppointment}>
          <Plus className="mr-2 h-4 w-4" />
          Neuen Termin anlegen
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Kalender</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              locale={de}
              className="rounded-md border"
            />
            <div className="mt-4 flex flex-col space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Termine heute:</span>
                <span className="bg-cannabis-green-100 text-cannabis-green-700 text-xs font-semibold px-2.5 py-0.5 rounded">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Termine diese Woche:</span>
                <span className="bg-cannabis-green-100 text-cannabis-green-700 text-xs font-semibold px-2.5 py-0.5 rounded">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Termine diesen Monat:</span>
                <span className="bg-cannabis-green-100 text-cannabis-green-700 text-xs font-semibold px-2.5 py-0.5 rounded">48</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                Termine für {selectedDate ? format(selectedDate, "d. MMMM yyyy", { locale: de }) : "Heute"}
              </CardTitle>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => {
                    const newDate = new Date(selectedDate || date);
                    newDate.setDate(newDate.getDate() - 1);
                    setSelectedDate(newDate);
                  }}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => {
                    const newDate = new Date(selectedDate || date);
                    newDate.setDate(newDate.getDate() + 1);
                    setSelectedDate(newDate);
                  }}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div 
                  key={appointment.id} 
                  className="flex justify-between items-center border rounded-lg p-3 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="bg-cannabis-green-100 p-2 rounded-full mr-3">
                      <Clock className="h-4 w-4 text-cannabis-green-700" />
                    </div>
                    <div>
                      <div className="font-medium">{appointment.time} ({appointment.duration} Min.)</div>
                      <div className="text-sm text-muted-foreground">{appointment.type}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right mr-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        <span>{appointment.patientName}</span>
                      </div>
                    </div>
                    <div className="space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => toast({
                          title: "Termin bearbeiten",
                          description: `Der Termin mit ${appointment.patientName} wird bearbeitet.`
                        })}
                      >
                        Bearbeiten
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => toast({
                          title: "Patient aufgerufen",
                          description: `${appointment.patientName} wurde zum Termin aufgerufen.`
                        })}
                      >
                        Aufrufen
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {appointments.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  Keine Termine an diesem Tag
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarPage;
