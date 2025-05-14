
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar, Clock, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AppointmentsPage = () => {
  const handleBookAppointment = () => {
    toast({
      title: "Termin angefragt",
      description: "Ihre Terminanfrage wurde erfolgreich übermittelt."
    });
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Meine Termine</h1>
        <Button onClick={handleBookAppointment}>
          <Plus className="mr-2 h-4 w-4" />
          Neuen Termin vereinbaren
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Anstehende Termine</CardTitle>
          <CardDescription>Ihre bestätigten Arzttermine</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            <div className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Dr. Schmidt - Erstgespräch</h3>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>15. Juni 2025</span>
                    <Clock className="h-4 w-4 ml-3 mr-1" />
                    <span>14:30 - 15:00 Uhr</span>
                  </div>
                </div>
                <div className="space-x-2">
                  <Button size="sm" variant="outline" onClick={() => toast({
                    title: "Termin abgesagt",
                    description: "Ihr Termin wurde storniert."
                  })}>
                    Absagen
                  </Button>
                  <Button size="sm" onClick={() => toast({
                    title: "Termin verschoben",
                    description: "Sie können nun einen neuen Termin wählen."
                  })}>
                    Verschieben
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Dr. Müller - Folgeuntersuchung</h3>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>22. Juli 2025</span>
                    <Clock className="h-4 w-4 ml-3 mr-1" />
                    <span>10:00 - 10:30 Uhr</span>
                  </div>
                </div>
                <div className="space-x-2">
                  <Button size="sm" variant="outline" onClick={() => toast({
                    title: "Termin abgesagt",
                    description: "Ihr Termin wurde storniert."
                  })}>
                    Absagen
                  </Button>
                  <Button size="sm" onClick={() => toast({
                    title: "Termin verschoben",
                    description: "Sie können nun einen neuen Termin wählen."
                  })}>
                    Verschieben
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Vergangene Termine</CardTitle>
          <CardDescription>Ihre bisherigen Arzttermine</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            <div className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Dr. Schmidt - Erstberatung</h3>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>10. April 2025</span>
                    <Clock className="h-4 w-4 ml-3 mr-1" />
                    <span>11:00 - 11:30 Uhr</span>
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={() => toast({
                  title: "Termin angefragt",
                  description: "Ihre Terminanfrage wurde übermittelt."
                })}>
                  Erneut buchen
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentsPage;
