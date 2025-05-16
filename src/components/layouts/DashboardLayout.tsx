
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 pt-16 md:pt-16 pb-6 md:pb-10">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8">
          <Outlet />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default DashboardLayout;
