
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { AuthProvider } from "./contexts/AuthContext";
import RouteGuard from "./components/RouteGuard";

// Public pages
import Index from "./pages/Index";
import Fragebogen from "./pages/Fragebogen";
import VideoCall from "./pages/VideoCall";
import VorOrt from "./pages/VorOrt";
import UberUns from "./pages/UberUns";
import Kontakt from "./pages/Kontakt";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";

// Dashboard
import DashboardLayout from "./components/layouts/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";

// Patient pages
import PatientProfile from "./pages/dashboard/patient/PatientProfile";
import PrescriptionsPage from "./pages/dashboard/patient/PrescriptionsPage";

// Placeholder pages for now
const OrdersPage = () => <div>Orders Page</div>;
const AppointmentsPage = () => <div>Appointments Page</div>;
const DoctorRequestsPage = () => <div>Doctor Requests Page</div>;
const DoctorPatientsPage = () => <div>Doctor Patients Page</div>;
const DoctorCalendarPage = () => <div>Doctor Calendar Page</div>;
const AdminUsersPage = () => <div>Admin Users Page</div>;
const AdminPrescriptionsPage = () => <div>Admin Prescriptions Page</div>;
const AdminOrdersPage = () => <div>Admin Orders Page</div>;
const AdminAppointmentsPage = () => <div>Admin Appointments Page</div>;
const AdminProductsPage = () => <div>Admin Products Page</div>;
const AdminSettingsPage = () => <div>Admin Settings Page</div>;

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/fragebogen" element={<Fragebogen />} />
              <Route path="/video-call" element={<VideoCall />} />
              <Route path="/vor-ort" element={<VorOrt />} />
              <Route path="/uber-uns" element={<UberUns />} />
              <Route path="/kontakt" element={<Kontakt />} />
              <Route path="/login" element={<Login />} />

              {/* Protected routes - Dashboard */}
              <Route element={<RouteGuard />}>
                <Route element={<DashboardLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />

                  {/* Patient routes */}
                  <Route path="/dashboard/profile" element={<PatientProfile />} />
                  <Route path="/dashboard/prescriptions" element={<PrescriptionsPage />} />
                  <Route path="/dashboard/orders" element={<OrdersPage />} />
                  <Route path="/dashboard/appointments" element={<AppointmentsPage />} />

                  {/* Doctor routes */}
                  <Route element={<RouteGuard allowedRoles={["doctor", "admin"]} />}>
                    <Route path="/dashboard/requests" element={<DoctorRequestsPage />} />
                    <Route path="/dashboard/patients" element={<DoctorPatientsPage />} />
                    <Route path="/dashboard/calendar" element={<DoctorCalendarPage />} />
                  </Route>

                  {/* Admin routes */}
                  <Route element={<RouteGuard allowedRoles={["admin"]} />}>
                    <Route path="/dashboard/users" element={<AdminUsersPage />} />
                    <Route path="/dashboard/all-prescriptions" element={<AdminPrescriptionsPage />} />
                    <Route path="/dashboard/all-orders" element={<AdminOrdersPage />} />
                    <Route path="/dashboard/all-appointments" element={<AdminAppointmentsPage />} />
                    <Route path="/dashboard/products" element={<AdminProductsPage />} />
                    <Route path="/dashboard/settings" element={<AdminSettingsPage />} />
                  </Route>
                </Route>
              </Route>

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
