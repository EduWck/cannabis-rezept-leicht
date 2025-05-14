
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
import PatientProfile from "@/pages/dashboard/patient/PatientProfile";
import PrescriptionsPage from "@/pages/dashboard/patient/PrescriptionsPage";
import OrdersPage from "@/pages/dashboard/patient/OrdersPage";

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

      {/* Protected Dashboard Routes */}
      <Route element={<RouteGuard />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/profile" element={<PatientProfile />} />
          <Route path="/dashboard/prescriptions" element={<PrescriptionsPage />} />
          <Route path="/dashboard/orders" element={<OrdersPage />} />
        </Route>
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
