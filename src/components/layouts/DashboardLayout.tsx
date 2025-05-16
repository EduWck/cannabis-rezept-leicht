
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 sm:px-6 pt-20 pb-6 sm:pt-24 sm:pb-10">
        <Outlet />
      </div>
      <Toaster />
    </div>
  );
};

export default DashboardLayout;
