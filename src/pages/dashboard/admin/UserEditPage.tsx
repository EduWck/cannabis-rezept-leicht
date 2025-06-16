
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  User, Save, ArrowLeft, UserCheck, UserX 
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const UserEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock user data - in real app would come from API
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
    status: "",
    phone: "",
    street_address: "",
    postal_code: "",
    city: "",
    country: "",
    notes: "",
    joined: ""
  });
  
  const [loading, setLoading] = useState(false);
  
  // Mock data for different users
  const mockUsers = {
    "1": { 
      id: "1", 
      name: "Max Mustermann", 
      email: "patient@example.com", 
      role: "patient", 
      status: "active", 
      phone: "+49 123 456789",
      street_address: "Musterstraße 123",
      postal_code: "12345",
      city: "Berlin",
      country: "Deutschland",
      notes: "Regelmäßiger Patient, sehr zuverlässig",
      joined: "01.05.2023"
    },
    "2": { 
      id: "2", 
      name: "Dr. Maria Schmidt", 
      email: "doctor@example.com", 
      role: "doctor", 
      status: "active",
      phone: "+49 987 654321",
      street_address: "Arztpraxis Zentrum",
      postal_code: "54321",
      city: "München",
      country: "Deutschland", 
      notes: "Spezialist für Cannabis-Therapie",
      joined: "15.03.2023"
    },
    "3": { 
      id: "3", 
      name: "Admin User", 
      email: "admin@example.com", 
      role: "admin", 
      status: "active",
      phone: "+49 555 123456",
      street_address: "Verwaltung GmbH",
      postal_code: "98765",
      city: "Hamburg",
      country: "Deutschland",
      notes: "System Administrator",
      joined: "01.01.2023"
    },
    "4": { 
      id: "4", 
      name: "Thomas Weber", 
      email: "thomas.weber@example.com", 
      role: "patient", 
      status: "pending",
      phone: "+49 777 888999",
      street_address: "Neue Straße 45",
      postal_code: "67890",
      city: "Frankfurt",
      country: "Deutschland",
      notes: "Neuer Patient, Registrierung ausstehend",
      joined: "10.05.2023"
    },
    "5": { 
      id: "5", 
      name: "Lisa Müller", 
      email: "lisa.mueller@example.com", 
      role: "patient", 
      status: "active",
      phone: "+49 333 444555",
      street_address: "Gartenweg 78",
      postal_code: "13579",
      city: "Köln",
      country: "Deutschland",
      notes: "Sehr zufriedene Patientin",
      joined: "22.04.2023"
    },
    "6": { 
      id: "6", 
      name: "Dr. Klaus Berger", 
      email: "klaus.berger@example.com", 
      role: "doctor", 
      status: "inactive",
      phone: "+49 666 777888",
      street_address: "Medizinisches Zentrum",
      postal_code: "24680",
      city: "Stuttgart",
      country: "Deutschland",
      notes: "Derzeit nicht aktiv",
      joined: "05.02.2023"
    }
  };
  
  useEffect(() => {
    if (id && mockUsers[id as keyof typeof mockUsers]) {
      setUser(mockUsers[id as keyof typeof mockUsers]);
    } else {
      toast({
        title: "Benutzer nicht gefunden",
        description: "Der angeforderte Benutzer konnte nicht gefunden werden.",
        variant: "destructive"
      });
      navigate("/dashboard/users");
    }
  }, [id, navigate]);
  
  const handleSave = async () => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Benutzer aktualisiert",
      description: `Die Daten von ${user.name} wurden erfolgreich gespeichert.`
    });
    
    setLoading(false);
  };
  
  const handleStatusChange = (newStatus: string) => {
    setUser(prev => ({ ...prev, status: newStatus }));
    
    const statusText = newStatus === 'active' ? 'aktiviert' : 
                     newStatus === 'inactive' ? 'deaktiviert' : 'auf ausstehend gesetzt';
    
    toast({
      title: "Status geändert",
      description: `Benutzer wurde ${statusText}.`
    });
  };
  
  const getRoleDisplayName = (role: string) => {
    switch(role) {
      case "patient": return "Patient";
      case "doctor": return "Arzt";
      case "admin": return "Administrator";
      default: return role;
    }
  };
  
  const getStatusDisplayName = (status: string) => {
    switch(status) {
      case "active": return "Aktiv";
      case "inactive": return "Inaktiv";
      case "pending": return "Ausstehend";
      default: return status;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case "active": return "text-emerald-600";
      case "inactive": return "text-gray-600";
      case "pending": return "text-amber-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/dashboard/users")}
            className="mr-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Zurück
          </Button>
          <User className="mr-2 h-6 w-6" />
          <h1 className="text-2xl font-bold">Benutzer bearbeiten</h1>
        </div>
        <div className="flex items-center gap-2">
          {user.status === 'active' ? (
            <Button 
              variant="outline" 
              onClick={() => handleStatusChange('inactive')}
              className="text-red-600 hover:text-red-700"
            >
              <UserX className="mr-2 h-4 w-4" />
              Deaktivieren
            </Button>
          ) : (
            <Button 
              variant="outline" 
              onClick={() => handleStatusChange('active')}
              className="text-green-600 hover:text-green-700"
            >
              <UserCheck className="mr-2 h-4 w-4" />
              Aktivieren
            </Button>
          )}
          <Button onClick={handleSave} disabled={loading}>
            <Save className="mr-2 h-4 w-4" />
            {loading ? "Speichern..." : "Speichern"}
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Hauptformular */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Benutzerdaten</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={user.name}
                    onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Vollständiger Name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-Mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="E-Mail-Adresse"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="role">Rolle</Label>
                  <Select value={user.role} onValueChange={(value) => setUser(prev => ({ ...prev, role: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Rolle auswählen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="patient">Patient</SelectItem>
                      <SelectItem value="doctor">Arzt</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    value={user.phone}
                    onChange={(e) => setUser(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Telefonnummer"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="street">Straße</Label>
                <Input
                  id="street"
                  value={user.street_address}
                  onChange={(e) => setUser(prev => ({ ...prev, street_address: e.target.value }))}
                  placeholder="Straße und Hausnummer"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="postal">PLZ</Label>
                  <Input
                    id="postal"
                    value={user.postal_code}
                    onChange={(e) => setUser(prev => ({ ...prev, postal_code: e.target.value }))}
                    placeholder="Postleitzahl"
                  />
                </div>
                <div>
                  <Label htmlFor="city">Stadt</Label>
                  <Input
                    id="city"
                    value={user.city}
                    onChange={(e) => setUser(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="Stadt"
                  />
                </div>
                <div>
                  <Label htmlFor="country">Land</Label>
                  <Input
                    id="country"
                    value={user.country}
                    onChange={(e) => setUser(prev => ({ ...prev, country: e.target.value }))}
                    placeholder="Land"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="notes">Notizen</Label>
                <Textarea
                  id="notes"
                  value={user.notes}
                  onChange={(e) => setUser(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Interne Notizen zum Benutzer..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar mit Status und Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Benutzerstatus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Aktueller Status</Label>
                  <p className={`text-lg font-semibold ${getStatusColor(user.status)}`}>
                    {getStatusDisplayName(user.status)}
                  </p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Rolle</Label>
                  <p className="text-lg">{getRoleDisplayName(user.role)}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Benutzer-ID</Label>
                  <p className="text-sm text-muted-foreground font-mono">{user.id}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Registriert seit</Label>
                  <p className="text-sm">{user.joined}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Schnellaktionen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => toast({ title: "E-Mail gesendet", description: "Willkommens-E-Mail wurde erneut gesendet." })}
                >
                  E-Mail erneut senden
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => toast({ title: "Passwort zurückgesetzt", description: "Passwort-Reset E-Mail wurde gesendet." })}
                >
                  Passwort zurücksetzen
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-red-600 hover:text-red-700"
                  onClick={() => toast({ title: "Benutzer löschen", description: "Diese Funktion ist noch nicht implementiert.", variant: "destructive" })}
                >
                  Benutzer löschen
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserEditPage;
