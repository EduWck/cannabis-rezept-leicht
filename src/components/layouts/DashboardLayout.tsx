
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-20">
        <Outlet />
      </div>
      <Toaster />
    </div>
  );
};

export default DashboardLayout;
