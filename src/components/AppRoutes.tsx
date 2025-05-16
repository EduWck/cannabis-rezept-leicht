
import { Routes, Route } from "react-router-dom";
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
import TestUsers from "@/pages/auth/TestUsers";

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

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes with Navbar and Footer */}
      <Route path="/" element={<MainLayout><Index /></MainLayout>} />
      <Route path="/uber-uns" element={<MainLayout><UberUns /></MainLayout>} />
      <Route path="/kontakt" element={<MainLayout><Kontakt /></MainLayout>} />
      <Route path="/vor-ort" element={<MainLayout><VorOrt /></MainLayout>} />
      <Route path="/fragebogen" element={<MainLayout><Fragebogen /></MainLayout>} />
      <Route path="/therapiemoeglichkeiten" element={<MainLayout><Therapiemoeglichkeiten /></MainLayout>} />
      <Route path="/video-call" element={<MainLayout><VideoCall /></MainLayout>} />
      <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
      <Route path="/test-users" element={<MainLayout><TestUsers /></MainLayout>} />
      
      {/* Legal Pages */}
      <Route path="/agb" element={<MainLayout><AGB /></MainLayout>} />
      <Route path="/datenschutz" element={<MainLayout><Datenschutz /></MainLayout>} />
      <Route path="/impressum" element={<MainLayout><Impressum /></MainLayout>} />
      <Route path="/cookie-policy" element={<MainLayout><CookiePolicy /></MainLayout>} />
      <Route path="/faq" element={<MainLayout><FAQ /></MainLayout>} />

      {/* Dashboard Routes */}
      <Route element={<DashboardLayout />}>
        {/* Main dashboard route - handles role-based routing */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Direct access routes for specific dashboards */}
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
        <Route path="/dashboard/patient" element={<PatientDashboard />} />
        
        {/* Patient routes */}
        <Route path="/dashboard/profile" element={<PatientProfile />} />
        <Route path="/dashboard/prescriptions" element={<PrescriptionsPage />} />
        <Route path="/dashboard/orders" element={<OrdersPage />} />
        <Route path="/dashboard/appointments" element={<AppointmentsPage />} />
        <Route path="/dashboard/medical-findings" element={<MedicalFindingsPage />} />
        
        {/* Admin routes */}
        <Route path="/dashboard/users" element={<UsersManagementPage />} />
        <Route path="/dashboard/all-prescriptions" element={<AllPrescriptionsPage />} />
        <Route path="/dashboard/all-orders" element={<AllOrdersPage />} />
        <Route path="/dashboard/all-appointments" element={<AllAppointmentsPage />} />
        <Route path="/dashboard/products" element={<ProductsPage />} />
        <Route path="/dashboard/settings" element={<SettingsPage />} />
        
        {/* Doctor routes */}
        <Route path="/dashboard/patients" element={<PatientsPage />} />
        <Route path="/dashboard/calendar" element={<CalendarPage />} />
        <Route path="/dashboard/requests" element={<RequestsPage />} />
        <Route path="/dashboard/doctor-prescriptions" element={<DoctorPrescriptionsPage />} />
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
    </Routes>
  );
};

export default AppRoutes;
