
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
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 sm:gap-0">
        <h1 className="text-xl sm:text-2xl font-bold">Meine Termine</h1>
        <Button onClick={handleBookAppointment} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Neuen Termin vereinbaren
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="px-4 sm:px-6 py-4">
          <CardTitle className="text-lg sm:text-xl">Anstehende Termine</CardTitle>
          <CardDescription>Ihre bestätigten Arzttermine</CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <div className="divide-y">
            <div className="py-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
                <div>
                  <h3 className="font-medium text-sm sm:text-base">Dr. Schmidt - Erstgespräch</h3>
                  <div className="flex flex-wrap items-center text-xs sm:text-sm text-muted-foreground mt-1 gap-x-3">
                    <div className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                      <span>15. Juni 2025</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                      <span>14:30 - 15:00 Uhr</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 sm:flex-initial"
                    onClick={() => toast({
                      title: "Termin abgesagt",
                      description: "Ihr Termin wurde storniert."
                    })}
                  >
                    Absagen
                  </Button>
                  <Button 
                    size="sm"
                    className="flex-1 sm:flex-initial"
                    onClick={() => toast({
                      title: "Termin verschoben",
                      description: "Sie können nun einen neuen Termin wählen."
                    })}
                  >
                    Verschieben
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="py-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
                <div>
                  <h3 className="font-medium text-sm sm:text-base">Dr. Müller - Folgeuntersuchung</h3>
                  <div className="flex flex-wrap items-center text-xs sm:text-sm text-muted-foreground mt-1 gap-x-3">
                    <div className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                      <span>22. Juli 2025</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                      <span>10:00 - 10:30 Uhr</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex-1 sm:flex-initial" 
                    onClick={() => toast({
                      title: "Termin abgesagt",
                      description: "Ihr Termin wurde storniert."
                    })}
                  >
                    Absagen
                  </Button>
                  <Button 
                    size="sm"
                    className="flex-1 sm:flex-initial" 
                    onClick={() => toast({
                      title: "Termin verschoben",
                      description: "Sie können nun einen neuen Termin wählen."
                    })}
                  >
                    Verschieben
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="px-4 sm:px-6 py-4">
          <CardTitle className="text-lg sm:text-xl">Vergangene Termine</CardTitle>
          <CardDescription>Ihre bisherigen Arzttermine</CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <div className="divide-y">
            <div className="py-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
                <div>
                  <h3 className="font-medium text-sm sm:text-base">Dr. Schmidt - Erstberatung</h3>
                  <div className="flex flex-wrap items-center text-xs sm:text-sm text-muted-foreground mt-1 gap-x-3">
                    <div className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                      <span>10. April 2025</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                      <span>11:00 - 11:30 Uhr</span>
                    </div>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="w-full sm:w-auto mt-2 sm:mt-0" 
                  onClick={() => toast({
                    title: "Termin angefragt",
                    description: "Ihre Terminanfrage wurde übermittelt."
                  })}
                >
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
