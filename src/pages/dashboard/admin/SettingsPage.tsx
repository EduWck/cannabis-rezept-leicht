
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Switch,
} from "@/components/ui/switch";
import { 
  Save, 
  Building, 
  Mail, 
  Globe, 
  Phone, 
  Lock, 
  Bell, 
  Palette,
  FileText,
  Plus
} from "lucide-react";

const SettingsPage = () => {
  // Company settings
  const [companyName, setCompanyName] = useState("MediCannabis GmbH");
  const [email, setEmail] = useState("kontakt@medicannabis.de");
  const [website, setWebsite] = useState("www.medicannabis.de");
  const [phone, setPhone] = useState("+49 30 123456789");
  const [address, setAddress] = useState("Musterstraße 123, 10115 Berlin");
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [orderNotifications, setOrderNotifications] = useState(true);
  const [appointmentNotifications, setAppointmentNotifications] = useState(true);
  const [prescriptionNotifications, setPrescriptionNotifications] = useState(true);
  
  // System settings
  const [darkMode, setDarkMode] = useState(false);
  const [autoLogout, setAutoLogout] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState("30");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  
  const handleSaveCompanySettings = () => {
    toast({
      title: "Einstellungen gespeichert",
      description: "Die Unternehmenseinstellungen wurden aktualisiert."
    });
  };
  
  const handleSaveNotificationSettings = () => {
    toast({
      title: "Benachrichtigungen aktualisiert",
      description: "Ihre Benachrichtigungseinstellungen wurden gespeichert."
    });
  };
  
  const handleSaveSystemSettings = () => {
    toast({
      title: "Systemeinstellungen gespeichert",
      description: "Die Systemeinstellungen wurden aktualisiert."
    });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Einstellungen</h1>
      
      <Tabs defaultValue="company">
        <TabsList className="mb-4">
          <TabsTrigger value="company" className="flex items-center">
            <Building className="mr-2 h-4 w-4" />
            Unternehmen
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="mr-2 h-4 w-4" />
            Benachrichtigungen
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center">
            <Lock className="mr-2 h-4 w-4" />
            System
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            Dokumente
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Unternehmenseinstellungen</CardTitle>
              <CardDescription>Verwalten Sie die Grundinformationen Ihres Unternehmens</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleSaveCompanySettings();
              }}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="company-name">Unternehmensname</Label>
                    <Input 
                      id="company-name" 
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="company-email">E-Mail-Adresse</Label>
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="company-email" 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="company-website">Website</Label>
                    <div className="flex items-center">
                      <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="company-website" 
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="company-phone">Telefonnummer</Label>
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="company-phone" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="company-address">Adresse</Label>
                    <Input 
                      id="company-address" 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  
                  <Button type="submit" className="mt-4">
                    <Save className="mr-2 h-4 w-4" />
                    Einstellungen speichern
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Benachrichtigungseinstellungen</CardTitle>
              <CardDescription>Legen Sie fest, wann und wie Sie benachrichtigt werden möchten</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleSaveNotificationSettings();
              }}>
                <div className="grid gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">E-Mail-Benachrichtigungen</Label>
                      <p className="text-sm text-muted-foreground">Erhalten Sie wichtige Mitteilungen per E-Mail</p>
                    </div>
                    <Switch 
                      id="email-notifications" 
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="order-notifications">Bestellungen</Label>
                      <p className="text-sm text-muted-foreground">Benachrichtigungen bei neuen oder aktualisierten Bestellungen</p>
                    </div>
                    <Switch 
                      id="order-notifications" 
                      checked={orderNotifications}
                      onCheckedChange={setOrderNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="appointment-notifications">Termine</Label>
                      <p className="text-sm text-muted-foreground">Benachrichtigungen bei neuen Terminanfragen</p>
                    </div>
                    <Switch 
                      id="appointment-notifications" 
                      checked={appointmentNotifications}
                      onCheckedChange={setAppointmentNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="prescription-notifications">Rezepte</Label>
                      <p className="text-sm text-muted-foreground">Benachrichtigungen bei neuen Rezeptanfragen</p>
                    </div>
                    <Switch 
                      id="prescription-notifications" 
                      checked={prescriptionNotifications}
                      onCheckedChange={setPrescriptionNotifications}
                    />
                  </div>
                  
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    Einstellungen speichern
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>Systemeinstellungen</CardTitle>
              <CardDescription>Konfigurieren Sie grundlegende Systemeinstellungen</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleSaveSystemSettings();
              }}>
                <div className="grid gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">Dunkles Erscheinungsbild aktivieren</p>
                    </div>
                    <Switch 
                      id="dark-mode" 
                      checked={darkMode}
                      onCheckedChange={setDarkMode}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-logout">Automatischer Logout</Label>
                      <p className="text-sm text-muted-foreground">Bei Inaktivität automatisch abmelden</p>
                    </div>
                    <Switch 
                      id="auto-logout" 
                      checked={autoLogout}
                      onCheckedChange={setAutoLogout}
                    />
                  </div>
                  
                  {autoLogout && (
                    <div className="grid gap-2">
                      <Label htmlFor="session-timeout">Timeout nach (Minuten)</Label>
                      <Input 
                        id="session-timeout" 
                        type="number"
                        min="5"
                        max="120"
                        value={sessionTimeout}
                        onChange={(e) => setSessionTimeout(e.target.value)}
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="maintenance-mode">Wartungsmodus</Label>
                      <p className="text-sm text-muted-foreground">System für Wartungsarbeiten sperren</p>
                    </div>
                    <Switch 
                      id="maintenance-mode" 
                      checked={maintenanceMode}
                      onCheckedChange={setMaintenanceMode}
                    />
                  </div>
                  
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    Einstellungen speichern
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Dokumentenverwaltung</CardTitle>
              <CardDescription>Verwalten Sie Vorlagen und Dokumente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label>Rezeptvorlagen</Label>
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Standard-Rezeptvorlage</p>
                        <p className="text-sm text-muted-foreground">Zuletzt aktualisiert: 05.04.2025</p>
                      </div>
                    </div>
                    <div className="space-x-2">
                      <Button size="sm" variant="outline" onClick={() => toast({
                        title: "Vorschau",
                        description: "Vorschau der Rezeptvorlage wird geöffnet."
                      })}>
                        Vorschau
                      </Button>
                      <Button size="sm" onClick={() => toast({
                        title: "Bearbeiten",
                        description: "Der Editor für die Rezeptvorlage wird geöffnet."
                      })}>
                        Bearbeiten
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label>Rechnungsvorlagen</Label>
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Standard-Rechnungsvorlage</p>
                        <p className="text-sm text-muted-foreground">Zuletzt aktualisiert: 12.04.2025</p>
                      </div>
                    </div>
                    <div className="space-x-2">
                      <Button size="sm" variant="outline" onClick={() => toast({
                        title: "Vorschau",
                        description: "Vorschau der Rechnungsvorlage wird geöffnet."
                      })}>
                        Vorschau
                      </Button>
                      <Button size="sm" onClick={() => toast({
                        title: "Bearbeiten",
                        description: "Der Editor für die Rechnungsvorlage wird geöffnet."
                      })}>
                        Bearbeiten
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label>Patientendokumente</Label>
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Einwilligungserklärung</p>
                        <p className="text-sm text-muted-foreground">Zuletzt aktualisiert: 20.03.2025</p>
                      </div>
                    </div>
                    <div className="space-x-2">
                      <Button size="sm" variant="outline" onClick={() => toast({
                        title: "Vorschau",
                        description: "Vorschau der Einwilligungserklärung wird geöffnet."
                      })}>
                        Vorschau
                      </Button>
                      <Button size="sm" onClick={() => toast({
                        title: "Bearbeiten",
                        description: "Der Editor für die Einwilligungserklärung wird geöffnet."
                      })}>
                        Bearbeiten
                      </Button>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" onClick={() => toast({
                  title: "Neue Vorlage",
                  description: "Der Dialog zum Erstellen einer neuen Dokumentenvorlage wurde geöffnet."
                })}>
                  <Plus className="h-4 w-4 mr-1" />
                  Neue Vorlage erstellen
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
