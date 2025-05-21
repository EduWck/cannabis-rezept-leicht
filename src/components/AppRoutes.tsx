
import { Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Pages
import Index from "@/pages/Index";
import UberUns from "@/pages/UberUns";
import Kontakt from "@/pages/Kontakt";
import VorOrt from "@/pages/VorOrt";
import Fragebogen from "@/pages/Fragebogen";
import Therapiemoeglichkeiten from "@/pages/Therapiemoeglichkeiten";
import NotFound from "@/pages/NotFound";
import VideoCall from "@/pages/VideoCall";
import Login from "@/pages/auth/Login";

// Legal pages
import AGB from "@/pages/legal/AGB";
import Datenschutz from "@/pages/legal/Datenschutz";
import Impressum from "@/pages/legal/Impressum";
import CookiePolicy from "@/pages/legal/CookiePolicy";
import FAQ from "@/pages/FAQ";

// Dashboard
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/pages/dashboard/Dashboard";
import AdminDashboard from "@/pages/dashboard/admin/AdminDashboard";
import DoctorDashboard from "@/pages/dashboard/doctor/DoctorDashboard";
import PatientDashboard from "@/pages/dashboard/patient/PatientDashboard";
import PatientProfile from "@/pages/dashboard/patient/PatientProfile";
import PrescriptionsPage from "@/pages/dashboard/patient/PrescriptionsPage";
import OrdersPage from "@/pages/dashboard/patient/OrdersPage";
import AppointmentsPage from "@/pages/dashboard/patient/AppointmentsPage";
import MedicalFindingsPage from "@/pages/dashboard/patient/MedicalFindingsPage";

// Admin pages
import UsersManagementPage from "@/pages/dashboard/admin/UsersManagementPage";
import AllPrescriptionsPage from "@/pages/dashboard/admin/AllPrescriptionsPage";
import AllOrdersPage from "@/pages/dashboard/admin/AllOrdersPage";
import AllAppointmentsPage from "@/pages/dashboard/admin/AllAppointmentsPage";
import ProductsPage from "@/pages/dashboard/admin/ProductsPage";
import SettingsPage from "@/pages/dashboard/admin/SettingsPage";

// Doctor pages
import PatientsPage from "@/pages/dashboard/doctor/PatientsPage";
import CalendarPage from "@/pages/dashboard/doctor/CalendarPage";
import RequestsPage from "@/pages/dashboard/doctor/RequestsPage";
import DoctorPrescriptionsPage from "@/pages/dashboard/doctor/DoctorPrescriptionsPage";

// Pharmacy pages
import PharmacyDashboard from "@/pages/dashboard/pharmacy/PharmacyDashboard";
import PharmacyOrdersPage from "@/pages/dashboard/pharmacy/PharmacyOrdersPage";
import PharmacyInventoryPage from "@/pages/dashboard/pharmacy/PharmacyInventoryPage";
import PharmacyPrescriptionsPage from "@/pages/dashboard/pharmacy/PharmacyPrescriptionsPage";

// Create a layout component to avoid repetition
const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    <main className="pt-16">
      {children}
    </main>
    <Footer />
  </>
);

// Export the routes as an array of Route elements
const AppRoutes = [
  // Public routes with Navbar and Footer
  <Route key="home" path="/" element={<MainLayout><Index /></MainLayout>} />,
  <Route key="uber-uns" path="/uber-uns" element={<MainLayout><UberUns /></MainLayout>} />,
  <Route key="kontakt" path="/kontakt" element={<MainLayout><Kontakt /></MainLayout>} />,
  <Route key="vor-ort" path="/vor-ort" element={<MainLayout><VorOrt /></MainLayout>} />,
  <Route key="fragebogen" path="/fragebogen" element={<MainLayout><Fragebogen /></MainLayout>} />,
  <Route key="therapiemoeglichkeiten" path="/therapiemoeglichkeiten" element={<MainLayout><Therapiemoeglichkeiten /></MainLayout>} />,
  <Route key="video-call" path="/video-call" element={<MainLayout><VideoCall /></MainLayout>} />,
  <Route key="login" path="/login" element={<MainLayout><Login /></MainLayout>} />,
  
  // Legal Pages
  <Route key="agb" path="/agb" element={<MainLayout><AGB /></MainLayout>} />,
  <Route key="datenschutz" path="/datenschutz" element={<MainLayout><Datenschutz /></MainLayout>} />,
  <Route key="impressum" path="/impressum" element={<MainLayout><Impressum /></MainLayout>} />,
  <Route key="cookie-policy" path="/cookie-policy" element={<MainLayout><CookiePolicy /></MainLayout>} />,
  <Route key="faq" path="/faq" element={<MainLayout><FAQ /></MainLayout>} />,

  // Dashboard Routes
  <Route key="dashboard-layout" element={<DashboardLayout />}>
    {/* Main dashboard route - handles role-based routing */}
    <Route key="dashboard" path="/dashboard" element={<Dashboard />} />
    
    {/* Direct access routes for specific dashboards */}
    <Route key="admin-dashboard" path="/dashboard/admin" element={<AdminDashboard />} />
    <Route key="doctor-dashboard" path="/dashboard/doctor" element={<DoctorDashboard />} />
    <Route key="patient-dashboard" path="/dashboard/patient" element={<PatientDashboard />} />
    <Route key="pharmacy-dashboard" path="/dashboard/pharmacy" element={<PharmacyDashboard />} />
    
    {/* Patient routes */}
    <Route key="profile" path="/dashboard/profile" element={<PatientProfile />} />
    <Route key="prescriptions" path="/dashboard/prescriptions" element={<PrescriptionsPage />} />
    <Route key="orders" path="/dashboard/orders" element={<OrdersPage />} />
    <Route key="appointments" path="/dashboard/appointments" element={<AppointmentsPage />} />
    <Route key="medical-findings" path="/dashboard/medical-findings" element={<MedicalFindingsPage />} />
    
    {/* Admin routes */}
    <Route key="users" path="/dashboard/users" element={<UsersManagementPage />} />
    <Route key="all-prescriptions" path="/dashboard/all-prescriptions" element={<AllPrescriptionsPage />} />
    <Route key="all-orders" path="/dashboard/all-orders" element={<AllOrdersPage />} />
    <Route key="all-appointments" path="/dashboard/all-appointments" element={<AllAppointmentsPage />} />
    <Route key="products" path="/dashboard/products" element={<ProductsPage />} />
    <Route key="settings" path="/dashboard/settings" element={<SettingsPage />} />
    
    {/* Doctor routes */}
    <Route key="patients" path="/dashboard/patients" element={<PatientsPage />} />
    <Route key="calendar" path="/dashboard/calendar" element={<CalendarPage />} />
    <Route key="requests" path="/dashboard/requests" element={<RequestsPage />} />
    <Route key="doctor-prescriptions" path="/dashboard/doctor-prescriptions" element={<DoctorPrescriptionsPage />} />

    {/* Pharmacy routes */}
    <Route key="pharmacy-orders" path="/dashboard/pharmacy-orders" element={<PharmacyOrdersPage />} />
    <Route key="pharmacy-inventory" path="/dashboard/pharmacy-inventory" element={<PharmacyInventoryPage />} />
    <Route key="pharmacy-prescriptions" path="/dashboard/pharmacy-prescriptions" element={<PharmacyPrescriptionsPage />} />
  </Route>,

  // Catch-all route
  <Route key="not-found" path="*" element={<MainLayout><NotFound /></MainLayout>} />
];

export default AppRoutes;
