
import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
import AdminDashboard from "@/pages/dashboard/admin/AdminDashboard";
import DoctorDashboard from "@/pages/dashboard/doctor/DoctorDashboard";
import PatientDashboard from "@/pages/dashboard/patient/PatientDashboard";
import PatientProfile from "@/pages/dashboard/patient/PatientProfile";
import PrescriptionsPage from "@/pages/dashboard/patient/PrescriptionsPage";
import OrdersPage from "@/pages/dashboard/patient/OrdersPage";
import AppointmentsPage from "@/pages/dashboard/patient/AppointmentsPage";

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

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes with Navbar and Footer */}
      <Route path="/" element={
        <>
          <Navbar />
          <main className="pt-16">
            <Index />
          </main>
          <Footer />
        </>
      } />
      <Route path="/uber-uns" element={
        <>
          <Navbar />
          <main className="pt-16">
            <UberUns />
          </main>
          <Footer />
        </>
      } />
      <Route path="/kontakt" element={
        <>
          <Navbar />
          <main className="pt-16">
            <Kontakt />
          </main>
          <Footer />
        </>
      } />
      <Route path="/vor-ort" element={
        <>
          <Navbar />
          <main className="pt-16">
            <VorOrt />
          </main>
          <Footer />
        </>
      } />
      <Route path="/fragebogen" element={
        <>
          <Navbar />
          <main className="pt-16">
            <Fragebogen />
          </main>
          <Footer />
        </>
      } />
      <Route path="/video-call" element={
        <>
          <Navbar />
          <main className="pt-16">
            <VideoCall />
          </main>
          <Footer />
        </>
      } />
      <Route path="/login" element={
        <>
          <Navbar />
          <main className="pt-16">
            <Login />
          </main>
          <Footer />
        </>
      } />
      <Route path="/test-users" element={
        <>
          <Navbar />
          <main className="pt-16">
            <TestUsers />
          </main>
          <Footer />
        </>
      } />

      {/* Dashboard Routes - Now directly accessible without authentication */}
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
      <Route path="*" element={
        <>
          <Navbar />
          <main className="pt-16">
            <NotFound />
          </main>
          <Footer />
        </>
      } />
    </Routes>
  );
};

export default AppRoutes;
