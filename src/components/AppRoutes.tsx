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
import UsersManagementPage from "@/pages/dashboard/admin/UsersManagementPage";

// Create placeholder components for missing pages
const DummyPage = ({ title }: { title: string }) => (
  <div className="container mx-auto py-8">
    <h1 className="text-2xl font-bold mb-6">{title}</h1>
    <p>Diese Seite ist noch in Entwicklung.</p>
  </div>
);

// Admin pages
const AllPrescriptionsPage = () => <DummyPage title="Alle Rezepte" />;
const AllOrdersPage = () => <DummyPage title="Alle Bestellungen" />;
const ProductsPage = () => <DummyPage title="Produkte verwalten" />;
const SettingsPage = () => <DummyPage title="Einstellungen" />;

// Doctor pages
const PatientsPage = () => <DummyPage title="Patientenliste" />;
const CalendarPage = () => <DummyPage title="Terminkalender" />;
const RequestsPage = () => <DummyPage title="Behandlungsanfragen" />;

// Patient pages
const AppointmentsPage = () => <DummyPage title="Meine Termine" />;

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
        <Route path="/dashboard/products" element={<ProductsPage />} />
        <Route path="/dashboard/settings" element={<SettingsPage />} />
        
        {/* Doctor routes */}
        <Route path="/dashboard/patients" element={<PatientsPage />} />
        <Route path="/dashboard/calendar" element={<CalendarPage />} />
        <Route path="/dashboard/requests" element={<RequestsPage />} />
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
