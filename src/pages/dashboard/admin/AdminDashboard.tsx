
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Users, FileText, ShoppingBag, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const { user, isLoading } = useAuth();
  
  const handleActivityClick = (activity: string) => {
    toast({
      title: "Aktivität ausgewählt",
      description: `Sie haben "${activity}" ausgewählt.`
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-cannabis-green-500" />
        <span className="ml-2">Lade Administratordaten...</span>
      </div>
    );
  }

  // Show dashboard content even without a logged-in user
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
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
    </div>
  );
};

export default AdminDashboard;
