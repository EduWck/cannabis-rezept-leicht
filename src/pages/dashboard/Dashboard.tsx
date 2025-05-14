
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Prescription, Order } from "@/types";
import { Loader2, FileText, ShoppingCart, Calendar } from "lucide-react";

const Dashboard = () => {
  const { userRole } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    prescriptions: 0,
    orders: 0,
    appointments: 0,
    pendingRequests: 0,
  });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        if (userRole === "patient") {
          // Fix the async/await for getUserData
          const user = await supabase.auth.getUser();
          const userId = user.data.user?.id;
          
          if (userId) {
            const [prescriptionsRes, ordersRes, appointmentsRes] = await Promise.all([
              supabase.from("prescriptions").select("id", { count: "exact" }).eq("patient_id", userId),
              supabase.from("orders").select("id", { count: "exact" }).eq("patient_id", userId),
              supabase.from("appointments").select("id", { count: "exact" }).eq("patient_id", userId),
            ]);

            setStats({
              prescriptions: prescriptionsRes.count || 0,
              orders: ordersRes.count || 0,
              appointments: appointmentsRes.count || 0,
              pendingRequests: 0,
            });
          }
        } else if (userRole === "doctor") {
          const user = await supabase.auth.getUser();
          const userId = user.data.user?.id;
          
          if (userId) {
            const pendingRes = await supabase
              .from("prescriptions")
              .select("id", { count: "exact" })
              .eq("doctor_id", userId)
              .eq("status", "in_review");

            const [prescriptionsRes, appointmentsRes] = await Promise.all([
              supabase.from("prescriptions").select("id", { count: "exact" }).eq("doctor_id", userId),
              supabase.from("appointments").select("id", { count: "exact" }).eq("doctor_id", userId),
            ]);

            setStats({
              prescriptions: prescriptionsRes.count || 0,
              orders: 0,
              appointments: appointmentsRes.count || 0,
              pendingRequests: pendingRes.count || 0,
            });
          }
        } else if (userRole === "admin") {
          const [prescriptionsRes, ordersRes, appointmentsRes, pendingRes] = await Promise.all([
            supabase.from("prescriptions").select("id", { count: "exact" }),
            supabase.from("orders").select("id", { count: "exact" }),
            supabase.from("appointments").select("id", { count: "exact" }),
            supabase.from("prescriptions").select("id", { count: "exact" }).eq("status", "in_review"),
          ]);

          setStats({
            prescriptions: prescriptionsRes.count || 0,
            orders: ordersRes.count || 0,
            appointments: appointmentsRes.count || 0,
            pendingRequests: pendingRes.count || 0,
          });
        }
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userRole) {
      fetchDashboardStats();
    }
  }, [userRole]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-cannabis-green-500" />
      </div>
    );
  }

  const renderPatientDashboard = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Willkommen in Ihrem Patienten-Portal</h1>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rezepte</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.prescriptions}</div>
            <p className="text-xs text-muted-foreground">Rezepte insgesamt</p>
            <Button variant="link" className="mt-2 h-8 px-0" onClick={() => navigate("/dashboard/prescriptions")}>
              Alle ansehen
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bestellungen</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.orders}</div>
            <p className="text-xs text-muted-foreground">Bestellungen insgesamt</p>
            <Button variant="link" className="mt-2 h-8 px-0" onClick={() => navigate("/dashboard/orders")}>
              Alle ansehen
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Termine</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.appointments}</div>
            <p className="text-xs text-muted-foreground">Termine insgesamt</p>
            <Button variant="link" className="mt-2 h-8 px-0" onClick={() => navigate("/dashboard/appointments")}>
              Alle ansehen
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Neues Rezept anfordern</CardTitle>
          <CardDescription>
            Erhalten Sie ein neues Rezept für Ihre medizinische Cannabis-Therapie
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => navigate("/fragebogen")}>
            Rezept-Fragebogen starten
          </Button>
        </CardContent>
      </Card>

      {stats.prescriptions > 0 && (
        <RecentPrescriptions />
      )}
    </div>
  );

  const renderDoctorDashboard = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Arzt-Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-yellow-50 dark:bg-yellow-900/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offene Anfragen</CardTitle>
            <FileText className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingRequests}</div>
            <p className="text-xs text-muted-foreground">Wartende Anfragen</p>
            <Button 
              variant="outline" 
              className="mt-3 border-yellow-600 text-yellow-600 hover:bg-yellow-100 dark:border-yellow-400 dark:text-yellow-400 dark:hover:bg-yellow-900"
              onClick={() => navigate("/dashboard/requests")}
            >
              Überprüfen
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rezepte</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.prescriptions}</div>
            <p className="text-xs text-muted-foreground">Bearbeitete Rezepte</p>
            <Button variant="link" className="mt-2 h-8 px-0" onClick={() => navigate("/dashboard/requests")}>
              Alle ansehen
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Termine</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.appointments}</div>
            <p className="text-xs text-muted-foreground">Geplante Termine</p>
            <Button variant="link" className="mt-2 h-8 px-0" onClick={() => navigate("/dashboard/calendar")}>
              Kalender öffnen
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {stats.pendingRequests > 0 && (
        <PendingRequests />
      )}
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin-Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-yellow-50 dark:bg-yellow-900/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offene Anfragen</CardTitle>
            <FileText className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingRequests}</div>
            <p className="text-xs text-muted-foreground">Wartende Anfragen</p>
            <Button 
              variant="outline" 
              className="mt-3 border-yellow-600 text-yellow-600 hover:bg-yellow-100 dark:border-yellow-400 dark:text-yellow-400 dark:hover:bg-yellow-900"
              onClick={() => navigate("/dashboard/all-prescriptions")}
            >
              Überprüfen
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rezepte</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.prescriptions}</div>
            <p className="text-xs text-muted-foreground">Insgesamt</p>
            <Button variant="link" className="mt-2 h-8 px-0" onClick={() => navigate("/dashboard/all-prescriptions")}>
              Alle ansehen
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bestellungen</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.orders}</div>
            <p className="text-xs text-muted-foreground">Insgesamt</p>
            <Button variant="link" className="mt-2 h-8 px-0" onClick={() => navigate("/dashboard/all-orders")}>
              Alle ansehen
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Termine</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.appointments}</div>
            <p className="text-xs text-muted-foreground">Insgesamt</p>
            <Button variant="link" className="mt-2 h-8 px-0" onClick={() => navigate("/dashboard/all-appointments")}>
              Alle ansehen
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Benutzer verwalten</CardTitle>
            <CardDescription>Ärzte und Administratoren verwalten</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/dashboard/users")}>
              Benutzer verwalten
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Produkte verwalten</CardTitle>
            <CardDescription>Cannabisprodukte und Preise bearbeiten</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/dashboard/products")}>
              Produktverwaltung öffnen
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div>
      {userRole === "patient" && renderPatientDashboard()}
      {userRole === "doctor" && renderDoctorDashboard()}
      {userRole === "admin" && renderAdminDashboard()}
    </div>
  );
};

// Component for showing recent prescriptions (for patient dashboard)
const RecentPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        // Fix the getUserData call
        const user = await supabase.auth.getUser();
        const userId = user.data.user?.id;
        
        if (userId) {
          const { data, error } = await supabase
            .from("prescriptions")
            .select("*")
            .eq("patient_id", userId)
            .order("created_at", { ascending: false })
            .limit(3);

          if (error) throw error;
          setPrescriptions(data || []);
        }
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Aktuelle Rezepte</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-cannabis-green-500" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Aktuelle Rezepte</CardTitle>
      </CardHeader>
      <CardContent>
        {prescriptions.length === 0 ? (
          <p className="text-muted-foreground">Keine Rezepte gefunden.</p>
        ) : (
          <ul className="space-y-4">
            {prescriptions.map((prescription) => (
              <li key={prescription.id} className="rounded-md border p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      Rezept vom {new Date(prescription.created_at).toLocaleDateString("de-DE")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Status: {" "}
                      <span className={
                        prescription.status === "approved" 
                          ? "text-green-600" 
                          : prescription.status === "rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }>
                        {prescription.status === "in_review" 
                          ? "In Prüfung" 
                          : prescription.status === "approved"
                          ? "Freigegeben"
                          : "Abgelehnt"}
                      </span>
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Details
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

// Component for showing pending requests (for doctor dashboard)
const PendingRequests = () => {
  const [requests, setRequests] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // Fix the getUserData call
        const user = await supabase.auth.getUser();
        const userId = user.data.user?.id;
        
        if (userId) {
          // Fix the query to include patient profile information directly
          const { data, error } = await supabase
            .from("prescriptions")
            .select(`
              *,
              patient:patient_id (
                first_name,
                last_name
              )
            `)
            .eq("doctor_id", userId)
            .eq("status", "in_review")
            .order("created_at", { ascending: false })
            .limit(5);

          if (error) throw error;
          setRequests(data || []);
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Wartende Anfragen</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-cannabis-green-500" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wartende Anfragen</CardTitle>
      </CardHeader>
      <CardContent>
        {requests.length === 0 ? (
          <p className="text-muted-foreground">Keine offenen Anfragen.</p>
        ) : (
          <ul className="space-y-4">
            {requests.map((request) => (
              <li key={request.id} className="rounded-md border p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      {/* Fix access to patient information */}
                      {request.patient?.first_name} {request.patient?.last_name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Vom {new Date(request.created_at).toLocaleDateString("de-DE")}
                    </p>
                  </div>
                  <Button onClick={() => navigate(`/dashboard/requests/${request.id}`)}>
                    Prüfen
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default Dashboard;
