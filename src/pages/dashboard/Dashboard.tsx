
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Import all role-specific dashboards
import AdminDashboard from "@/pages/dashboard/admin/AdminDashboard";
import DoctorDashboard from "@/pages/dashboard/doctor/DoctorDashboard";
import PatientDashboard from "@/pages/dashboard/patient/PatientDashboard";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { user, userRole } = useAuth();
  const navigate = useNavigate();
  
  // For testing - always provide dashboard selector
  return (
    <div className="text-center py-20">
      <h1 className="text-2xl font-bold mb-6">Dashboard Testmodus</h1>
      <p className="mb-8">Wählen Sie einen Dashboard-Typ aus:</p>
      
      <div className="mt-8 flex flex-col items-center gap-4">
        <Button variant="default" onClick={() => navigate("/dashboard/admin")}>
          Administrator Dashboard
        </Button>
        <Button variant="default" onClick={() => navigate("/dashboard/doctor")}>
          Arzt Dashboard
        </Button>
        <Button variant="default" onClick={() => navigate("/dashboard/patient")}>
          Patienten Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
