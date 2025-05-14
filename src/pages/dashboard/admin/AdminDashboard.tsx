
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Users, FileText, ShoppingBag, Calendar, BarChart2, Settings, Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState } from "react";

const AdminDashboard = () => {
  const { user, isLoading } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleActivityClick = (activity: string) => {
    toast({
      title: "Aktivität ausgewählt",
      description: `Sie haben "${activity}" ausgewählt.`
    });
  };

  // Show dashboard content even without a logged-in user
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Suchen..."
              className="pl-8 h-9 w-[200px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            onClick={() => toast({ title: "Neuen Benutzer erstellen", description: "Formular zum Erstellen eines neuen Benutzers geöffnet." })}
          >
            <Plus className="mr-1 h-4 w-4" /> Neuer Benutzer
          </Button>
        </div>
      </div>
      
      {/* Stats cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="bg-cannabis-green-50 dark:bg-cannabis-green-900/20">
            <CardTitle className="text-cannabis-green-700 dark:text-cannabis-green-400">
              <Users className="h-5 w-5 inline-block mr-2" /> Benutzer
            </CardTitle>
            <CardDescription>Nutzerkonten verwalten</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">127</div>
            <p className="text-sm text-muted-foreground mt-2">Registrierte Nutzer</p>
            <Link to="/dashboard/users" className="mt-4 inline-block">
              <Button variant="outline" size="sm">Benutzer verwalten</Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="bg-cannabis-green-50 dark:bg-cannabis-green-900/20">
            <CardTitle className="text-cannabis-green-700 dark:text-cannabis-green-400">
              <FileText className="h-5 w-5 inline-block mr-2" /> Rezepte
            </CardTitle>
            <CardDescription>Verschreibungen verwalten</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">84</div>
            <p className="text-sm text-muted-foreground mt-2">Aktive Rezepte</p>
            <Link to="/dashboard/all-prescriptions" className="mt-4 inline-block">
              <Button variant="outline" size="sm">Rezepte verwalten</Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="bg-cannabis-green-50 dark:bg-cannabis-green-900/20">
            <CardTitle className="text-cannabis-green-700 dark:text-cannabis-green-400">
              <ShoppingBag className="h-5 w-5 inline-block mr-2" /> Bestellungen
            </CardTitle>
            <CardDescription>Bestellstatus verfolgen</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">42</div>
            <p className="text-sm text-muted-foreground mt-2">Offene Bestellungen</p>
            <Link to="/dashboard/all-orders" className="mt-4 inline-block">
              <Button variant="outline" size="sm">Bestellungen verwalten</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      
      {/* Analytics Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Plattform-Statistiken</h2>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Nutzungsdaten</CardTitle>
            <CardDescription>Benutzeraktivitäten der letzten 30 Tage</CardDescription>
          </CardHeader>
          <CardContent>
            <AspectRatio ratio={16/6}>
              <div className="bg-muted w-full h-full rounded-md p-4 flex items-center justify-center">
                <div className="w-full h-full flex items-center">
                  <div className="w-full">
                    <div className="flex justify-between mb-2">
                      <div>Statistiken</div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-cannabis-green-500"></span>
                        <span className="text-sm">Neue Benutzer</span>
                        <span className="w-3 h-3 rounded-full bg-blue-500 ml-2"></span>
                        <span className="text-sm">Verschreibungen</span>
                        <span className="w-3 h-3 rounded-full bg-orange-500 ml-2"></span>
                        <span className="text-sm">Bestellungen</span>
                      </div>
                    </div>
                    <div className="w-full h-40 bg-muted-foreground/20 rounded-md relative">
                      {/* Mock Chart */}
                      <div className="absolute bottom-0 left-0 w-full h-full flex items-end">
                        <div className="flex items-end w-full h-full justify-between px-2">
                          {[35, 45, 30, 65, 40, 80, 60, 75, 50, 55, 70, 45].map((height, i) => (
                            <div key={i} className="flex flex-col items-center gap-1 w-full">
                              <div style={{height: `${height}%`}} className="w-4 bg-cannabis-green-500 rounded-t-sm"></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <div>Jan</div>
                      <div>Feb</div>
                      <div>Mär</div>
                      <div>Apr</div>
                      <div>Mai</div>
                      <div>Jun</div>
                      <div>Jul</div>
                      <div>Aug</div>
                      <div>Sep</div>
                      <div>Okt</div>
                      <div>Nov</div>
                      <div>Dez</div>
                    </div>
                  </div>
                </div>
              </div>
            </AspectRatio>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-muted-foreground text-sm">Neue Benutzer</div>
                  <div className="text-2xl font-bold">+24%</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-muted-foreground text-sm">Verschreibungen</div>
                  <div className="text-2xl font-bold">+12%</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-muted-foreground text-sm">Bestellungen</div>
                  <div className="text-2xl font-bold">+18%</div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <h2 className="text-xl font-semibold mt-8 mb-4">Neueste Aktivitäten</h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <ul className="space-y-3">
          <li className="flex justify-between items-center border-b pb-2 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded" onClick={() => handleActivityClick("Neuer Patient registriert")}>
            <span>Neuer Patient registriert</span>
            <span className="text-sm text-gray-500">Heute, 14:32</span>
          </li>
          <li className="flex justify-between items-center border-b pb-2 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded" onClick={() => handleActivityClick("Rezept ausgestellt")}>
            <span>Rezept ausgestellt</span>
            <span className="text-sm text-gray-500">Heute, 11:15</span>
          </li>
          <li className="flex justify-between items-center border-b pb-2 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded" onClick={() => handleActivityClick("Bestellung eingegangen")}>
            <span>Bestellung eingegangen</span>
            <span className="text-sm text-gray-500">Heute, 09:03</span>
          </li>
          <li className="flex justify-between items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded" onClick={() => handleActivityClick("Beratungstermin vereinbart")}>
            <span>Beratungstermin vereinbart</span>
            <span className="text-sm text-gray-500">Gestern, 16:47</span>
          </li>
        </ul>
      </div>
      
      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Schnellzugriff</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center" onClick={() => toast({ title: "Systemeinstellungen", description: "Systemeinstellungen werden geöffnet." })}>
            <Settings className="h-8 w-8 mb-2" />
            <span>Einstellungen</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center" onClick={() => toast({ title: "Berichte", description: "Berichte werden generiert." })}>
            <BarChart2 className="h-8 w-8 mb-2" />
            <span>Berichte</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center" onClick={() => toast({ title: "Produkte", description: "Produktverwaltung wird geöffnet." })}>
            <ShoppingBag className="h-8 w-8 mb-2" />
            <span>Produkte</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center" onClick={() => toast({ title: "Terminkalender", description: "Terminkalender wird geöffnet." })}>
            <Calendar className="h-8 w-8 mb-2" />
            <span>Kalender</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
