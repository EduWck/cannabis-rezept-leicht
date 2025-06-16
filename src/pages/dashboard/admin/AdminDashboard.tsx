
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card,
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Users, 
  ShoppingBag,
  Package,
  TrendingUp,
  MoreHorizontal,
  UserCheck,
  UserX,
  Edit,
  Download,
  Search,
  Euro
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [actionComment, setActionComment] = useState("");
  const [isUserActionDialogOpen, setIsUserActionDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<'suspend' | 'activate'>('activate');
  
  // Mock data - in real app would come from API
  const kpiData = {
    totalUsers: 2847,
    newRegistrations: 156,
    totalRevenue: 125840.50,
    activeOrders: 89,
    lowStockItems: 7,
    totalProducts: 245
  };

  const recentUsers = [
    {
      id: "U-001",
      name: "Max Mustermann",
      email: "max@example.com",
      role: "patient",
      status: "active",
      registeredAt: "2023-12-15T10:30:00",
      lastLogin: "2023-12-15T14:20:00"
    },
    {
      id: "U-002", 
      name: "Dr. Sarah Schmidt",
      email: "dr.schmidt@example.com",
      role: "doctor",
      status: "active",
      registeredAt: "2023-12-14T09:15:00",
      lastLogin: "2023-12-15T13:45:00"
    },
    {
      id: "U-003",
      name: "Apotheke Berlin Mitte",
      email: "berlin-mitte@example.com", 
      role: "pharmacy",
      status: "pending",
      registeredAt: "2023-12-13T16:20:00",
      lastLogin: null
    }
  ];

  const recentOrders = [
    {
      id: "ORD-2023-105",
      patientName: "Julia Becker",
      total: 156.80,
      status: "shipped",
      date: "2023-12-15",
      pharmacyName: "Apotheke Hamburg"
    },
    {
      id: "ORD-2023-104", 
      patientName: "Robert Klaus",
      total: 203.45,
      status: "delivered",
      date: "2023-12-14",
      pharmacyName: "Apotheke München"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-500"><UserCheck className="w-3 h-3 mr-1" />Aktiv</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Wartend</Badge>;
      case 'suspended':
        return <Badge className="bg-red-500"><UserX className="w-3 h-3 mr-1" />Gesperrt</Badge>;
      case 'shipped':
        return <Badge className="bg-blue-500">Versendet</Badge>;
      case 'delivered':
        return <Badge className="bg-green-500">Zugestellt</Badge>;
      default:
        return <Badge>Unbekannt</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch(role) {
      case 'patient':
        return <Badge variant="outline">Patient</Badge>;
      case 'doctor':
        return <Badge variant="secondary">Arzt</Badge>;
      case 'pharmacy':
        return <Badge variant="default">Apotheke</Badge>;
      case 'admin':
        return <Badge className="bg-purple-500">Admin</Badge>;
      default:
        return <Badge>Unbekannt</Badge>;
    }
  };

  const handleUserAction = (user: any, action: 'suspend' | 'activate') => {
    setSelectedUser(user);
    setActionType(action);
    setIsUserActionDialogOpen(true);
  };

  const confirmUserAction = () => {
    const actionText = actionType === 'suspend' ? 'gesperrt' : 'aktiviert';
    toast({
      title: `Benutzer ${actionText}`,
      description: `${selectedUser?.name} wurde erfolgreich ${actionText}.`,
    });
    setIsUserActionDialogOpen(false);
    setSelectedUser(null);
    setActionComment("");
  };

  const exportData = (type: string) => {
    toast({
      title: "Export gestartet",
      description: `${type} werden als CSV-Datei heruntergeladen.`,
    });
  };

  const filteredUsers = recentUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        
        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Benutzer gesamt</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{kpiData.totalUsers.toLocaleString()}</div>
                <Users className="h-5 w-5 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Neue Registrierungen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{kpiData.newRegistrations}</div>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Diese Woche</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Gesamtumsatz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{kpiData.totalRevenue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</div>
                <Euro className="h-5 w-5 text-purple-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Diesen Monat</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Aktive Bestellungen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{kpiData.activeOrders}</div>
                <ShoppingBag className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">In Bearbeitung</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Produkte gesamt</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{kpiData.totalProducts}</div>
                <Package className="h-5 w-5 text-indigo-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Verfügbare Produkte</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Niedriger Bestand</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{kpiData.lowStockItems}</div>
                <Package className="h-5 w-5 text-red-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Produkte</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Hauptbereich */}
        <div className="lg:col-span-2 space-y-6">
          {/* Benutzerverwaltung */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Benutzerverwaltung
              </CardTitle>
              {/* Suchbereich unter der Überschrift */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-4">
                <div className="relative flex-1 w-full sm:w-auto">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Benutzer suchen..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => exportData("Benutzerliste")}
                  className="w-full sm:w-auto"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Benutzer</TableHead>
                    <TableHead>Rolle</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Letzter Login</TableHead>
                    <TableHead>Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>
                        {user.lastLogin ? (
                          <div>
                            <p className="text-sm">
                              {new Date(user.lastLogin).toLocaleDateString('de-DE')}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(user.lastLogin).toLocaleTimeString('de-DE', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </p>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">Noch nie</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 border">
                            <DropdownMenuLabel>Aktionen</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigate(`/dashboard/users/${user.id}`)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Bearbeiten
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {user.status === 'active' ? (
                              <DropdownMenuItem 
                                onClick={() => handleUserAction(user, 'suspend')}
                                className="text-red-600"
                              >
                                <UserX className="mr-2 h-4 w-4" />
                                Sperren
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem 
                                onClick={() => handleUserAction(user, 'activate')}
                                className="text-green-600"
                              >
                                <UserCheck className="mr-2 h-4 w-4" />
                                Aktivieren
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <Button 
                variant="outline" 
                className="w-full mt-4" 
                onClick={() => navigate("/dashboard/users")}
              >
                Alle Benutzer verwalten
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Letzte Bestellungen */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Letzte Bestellungen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm">{order.id}</p>
                      {getStatusBadge(order.status)}
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Patient: {order.patientName}
                    </p>
                    <p className="text-xs text-muted-foreground mb-1">
                      Apotheke: {order.pharmacyName}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium">{order.total.toFixed(2)} €</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.date).toLocaleDateString('de-DE')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button 
                variant="outline" 
                className="w-full mt-4" 
                onClick={() => navigate("/dashboard/all-orders")}
              >
                Alle Bestellungen
              </Button>
            </CardContent>
          </Card>

          {/* Schnellzugriffe */}
          <Card>
            <CardHeader>
              <CardTitle>Verwaltung</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => navigate("/dashboard/users")}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Benutzer verwalten
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => navigate("/dashboard/products")}
                >
                  <Package className="mr-2 h-4 w-4" />
                  Produkte verwalten
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => navigate("/dashboard/all-orders")}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Alle Bestellungen
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => navigate("/dashboard/billing")}
                >
                  <Euro className="mr-2 h-4 w-4" />
                  Rechnungen
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => exportData("Vollständiger Bericht")}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Berichte exportieren
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* User Action Dialog */}
      <Dialog open={isUserActionDialogOpen} onOpenChange={setIsUserActionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Benutzer {actionType === 'suspend' ? 'sperren' : 'aktivieren'}
            </DialogTitle>
            <DialogDescription>
              Möchten Sie {selectedUser?.name} wirklich {actionType === 'suspend' ? 'sperren' : 'aktivieren'}?
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Label htmlFor="actionComment" className="block mb-2">
              {actionType === 'suspend' ? 'Grund für Sperrung' : 'Kommentar'} (optional)
            </Label>
            <Textarea
              id="actionComment"
              value={actionComment}
              onChange={(e) => setActionComment(e.target.value)}
              placeholder={actionType === 'suspend' ? 'Grund für die Sperrung...' : 'Zusätzliche Informationen...'}
              rows={3}
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUserActionDialogOpen(false)}>
              Abbrechen
            </Button>
            <Button 
              onClick={confirmUserAction}
              variant={actionType === 'suspend' ? 'destructive' : 'default'}
            >
              {actionType === 'suspend' ? 'Sperren' : 'Aktivieren'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
