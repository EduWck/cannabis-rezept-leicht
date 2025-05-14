
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Import all role-specific dashboards
import AdminDashboard from "@/pages/dashboard/admin/AdminDashboard";
import DoctorDashboard from "@/pages/dashboard/doctor/DoctorDashboard";
import PatientDashboard from "@/pages/dashboard/patient/PatientDashboard";

const Dashboard = () => {
  const { user, userRole, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // Debug information
  useEffect(() => {
    console.log("Dashboard component - User:", user?.id);
    console.log("Dashboard component - Role:", userRole);
  }, [user, userRole]);

  // Display loading state
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-cannabis-green-500" />
        <span className="ml-2">Lade Benutzerdaten...</span>
      </div>
    );
  }

  // Handle no user
  if (!user) {
    return (
      <div className="text-center py-20">
        <p>Kein Benutzer angemeldet.</p>
      </div>
    );
  }
  
  // Handle no role detected
  if (!userRole) {
    // Try to determine role from email for testing purposes
    let detectedRole = null;
    
    if (user.email) {
      const email = user.email.toLowerCase();
      if (email.includes('admin')) {
        detectedRole = 'admin';
        toast({
          title: "Rolle erkannt",
          description: "Admin-Rolle basierend auf E-Mail erkannt."
        });
      } else if (email.includes('doctor') || email.includes('arzt')) {
        detectedRole = 'doctor';
        toast({
          title: "Rolle erkannt",
          description: "Arzt-Rolle basierend auf E-Mail erkannt."
        });
      } else if (email.includes('patient') || email.includes('patien')) {
        detectedRole = 'patient';
        toast({
          title: "Rolle erkannt",
          description: "Patienten-Rolle basierend auf E-Mail erkannt."
        });
      }
    }
    
    // If we detected a role, render the appropriate dashboard
    if (detectedRole === 'admin') {
      return <AdminDashboard />;
    } else if (detectedRole === 'doctor') {
      return <DoctorDashboard />;
    } else if (detectedRole === 'patient') {
      return <PatientDashboard />;
    }
    
    return (
      <div className="text-center py-20">
        <p>Benutzerrolle konnte nicht erkannt werden.</p>
        <div className="mt-8 flex flex-col items-center gap-4">
          <p className="font-bold">Zu Testzwecken:</p>
          <Button variant="default" onClick={() => navigate("/dashboard/admin")}>
            Als Administrator anzeigen
          </Button>
          <Button variant="default" onClick={() => navigate("/dashboard/doctor")}>
            Als Arzt anzeigen
          </Button>
          <Button variant="default" onClick={() => navigate("/dashboard/patient")}>
            Als Patient anzeigen
          </Button>
        </div>
      </div>
    );
  }

  // Display dashboard based on role
  switch (userRole) {
    case "admin":
      return <AdminDashboard />;
    case "doctor":
      return <DoctorDashboard />;
    case "patient":
      return <PatientDashboard />;
    default:
      return (
        <div className="text-center py-20">
          <p>Unbekannte Benutzerrolle: {userRole}</p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <p className="font-bold">Zu Testzwecken:</p>
            <Button variant="default" onClick={() => navigate("/dashboard/admin")}>
              Als Administrator anzeigen
            </Button>
            <Button variant="default" onClick={() => navigate("/dashboard/doctor")}>
              Als Arzt anzeigen
            </Button>
            <Button variant="default" onClick={() => navigate("/dashboard/patient")}>
              Als Patient anzeigen
            </Button>
          </div>
        </div>
      );
  }
};

// Add missing Button import
import { Button } from "@/components/ui/button";

export default Dashboard;
