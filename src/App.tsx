
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import Index from "@/pages/Index";
import UberUns from "@/pages/UberUns";
import Kontakt from "@/pages/Kontakt";
import VorOrt from "@/pages/VorOrt";
import Fragebogen from "@/pages/Fragebogen";
import NotFound from "@/pages/NotFound";
import VideoCall from "@/pages/VideoCall";
import Login from "@/pages/auth/Login";
import TestUsers from "@/pages/auth/TestUsers";

// Dashboard
import RouteGuard from "@/components/RouteGuard";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/pages/dashboard/Dashboard";
import PatientProfile from "@/pages/dashboard/patient/PatientProfile";
import PrescriptionsPage from "@/pages/dashboard/patient/PrescriptionsPage";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/uber-uns" element={<UberUns />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/vor-ort" element={<VorOrt />} />
            <Route path="/fragebogen" element={<Fragebogen />} />
            <Route path="/video-call" element={<VideoCall />} />
            <Route path="/login" element={<Login />} />
            <Route path="/test-users" element={<TestUsers />} />

            {/* Protected Dashboard Routes */}
            <Route element={<RouteGuard />}>
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/profile" element={<PatientProfile />} />
                <Route path="/dashboard/prescriptions" element={<PrescriptionsPage />} />
              </Route>
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
