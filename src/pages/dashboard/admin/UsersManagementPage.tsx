
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  Users, Search, Plus, Edit, Trash2, Filter, ArrowRight 
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { DemoAccountsInfo } from "@/components/auth/DemoAccountsInfo";

const UsersManagementPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  
  const testUsers = [
    { id: 1, name: "Max Mustermann", email: "patient@example.com", role: "patient", status: "active", joined: "01.05.2023" },
    { id: 2, name: "Dr. Maria Schmidt", email: "doctor@example.com", role: "doctor", status: "active", joined: "15.03.2023" },
    { id: 3, name: "Admin User", email: "admin@example.com", role: "admin", status: "active", joined: "01.01.2023" },
    { id: 4, name: "Thomas Weber", email: "thomas.weber@example.com", role: "patient", status: "pending", joined: "10.05.2023" },
    { id: 5, name: "Lisa Müller", email: "lisa.mueller@example.com", role: "patient", status: "active", joined: "22.04.2023" },
    { id: 6, name: "Dr. Klaus Berger", email: "klaus.berger@example.com", role: "doctor", status: "inactive", joined: "05.02.2023" },
  ];
  
  const filteredUsers = testUsers.filter(user => {
    // Apply search filter
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply role filter
    const matchesFilter = filter === "all" || user.role === filter;
    
    return matchesSearch && matchesFilter;
  });
  
  const handleEdit = (id: number, name: string) => {
    toast({
      title: "Benutzer bearbeiten",
      description: `Bearbeitung von ${name} (ID: ${id})`
    });
  };
  
  const handleDelete = (id: number, name: string) => {
    toast({
      title: "Benutzer löschen",
      description: `Löschen von ${name} (ID: ${id})`,
      variant: "destructive"
    });
  };
  
  const handleCreateUser = () => {
    toast({
      title: "Neuen Benutzer erstellen",
      description: "Formular zum Erstellen eines neuen Benutzers geöffnet"
    });
  };
  
  const getRoleClass = (role: string) => {
    switch(role) {
      case "admin":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "doctor":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      default:
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    }
  };
  
  const getStatusClass = (status: string) => {
    switch(status) {
      case "active":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300";
      case "pending":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-300";
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Users className="mr-2 h-6 w-6" />
          <h1 className="text-2xl font-bold">Benutzerverwaltung</h1>
        </div>
        <Button onClick={handleCreateUser}>
          <Plus className="mr-2 h-4 w-4" /> Neuer Benutzer
        </Button>
      </div>
      
      <Card className="mb-8">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Testbenutzer</CardTitle>
        </CardHeader>
        <CardContent>
          <DemoAccountsInfo />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Alle Benutzer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Suche nach Name oder E-Mail..."
                className="pl-8 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                className="rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">Alle Rollen</option>
                <option value="patient">Patienten</option>
                <option value="doctor">Ärzte</option>
                <option value="admin">Administratoren</option>
              </select>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">E-Mail</th>
                  <th className="text-left py-3 px-4">Rolle</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Registriert</th>
                  <th className="text-right py-3 px-4">Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${getRoleClass(user.role)}`}>
                        {user.role === "patient" ? "Patient" : 
                         user.role === "doctor" ? "Arzt" : "Admin"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(user.status)}`}>
                        {user.status === "active" ? "Aktiv" : 
                         user.status === "pending" ? "Ausstehend" : "Inaktiv"}
                      </span>
                    </td>
                    <td className="py-3 px-4">{user.joined}</td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(user.id, user.name)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(user.id, user.name)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Zeige {filteredUsers.length} von {testUsers.length} Benutzern
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Vorherige
              </Button>
              <Button variant="outline" size="sm">
                1
              </Button>
              <Button variant="outline" size="sm" disabled>
                Nächste <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersManagementPage;
