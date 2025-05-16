
import React, { useState, useEffect } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  ShoppingCart,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Users,
  ShoppingBag,
  Stethoscope,
  MessageSquare,
  PackageOpen,
  FileCheck,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-is-mobile";

// Define the dashboard routes for each role
const patientRoutes = [
  { name: "Dashboard", href: "/dashboard/patient", icon: LayoutDashboard },
  { name: "Meine Rezepte", href: "/dashboard/prescriptions", icon: FileText },
  { name: "Bestellungen", href: "/dashboard/orders", icon: ShoppingCart },
  { name: "Termine", href: "/dashboard/appointments", icon: Calendar },
  { name: "Medizinische Befunde", href: "/dashboard/medical-findings", icon: FileCheck },
  { name: "Profil", href: "/dashboard/profile", icon: User },
];

const doctorRoutes = [
  { name: "Dashboard", href: "/dashboard/doctor", icon: LayoutDashboard },
  { name: "Behandlungsanfragen", href: "/dashboard/requests", icon: MessageSquare },
  { name: "Patienten", href: "/dashboard/patients", icon: Users },
  { name: "Terminkalender", href: "/dashboard/calendar", icon: Calendar },
  { name: "Rezepte verwalten", href: "/dashboard/doctor-prescriptions", icon: FileCheck }
];

const adminRoutes = [
  { name: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
  { name: "Benutzer verwalten", href: "/dashboard/users", icon: Users },
  { name: "Rezepte", href: "/dashboard/all-prescriptions", icon: FileText },
  { name: "Bestellungen", href: "/dashboard/all-orders", icon: ShoppingCart },
  { name: "Termine", href: "/dashboard/all-appointments", icon: Calendar },
  { name: "Produkte", href: "/dashboard/products", icon: PackageOpen },
  { name: "Einstellungen", href: "/dashboard/settings", icon: Settings },
];

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const [expandedRoleSwitcher, setExpandedRoleSwitcher] = useState(false);

  // Determine which role's navigation to show based on current path
  const [currentRole, setCurrentRole] = useState<"admin" | "doctor" | "patient" | null>(null);

  // Update current role based on path
  useEffect(() => {
    if (pathname.includes('/dashboard/admin')) {
      setCurrentRole("admin");
    } else if (pathname.includes('/dashboard/doctor')) {
      setCurrentRole("doctor");
    } else if (pathname.includes('/dashboard/patient') || 
               pathname.includes('/dashboard/profile') || 
               pathname.includes('/dashboard/prescriptions') || 
               pathname.includes('/dashboard/orders') || 
               pathname.includes('/dashboard/medical-findings') ||
               pathname.includes('/dashboard/appointments')) {
      setCurrentRole("patient");
    }
  }, [pathname]);

  // Select navigation items based on current role
  let navigation = [];
  
  if (currentRole === "admin") {
    navigation = adminRoutes;
  } else if (currentRole === "doctor") {
    navigation = doctorRoutes;
  } else if (currentRole === "patient") {
    navigation = patientRoutes;
  }

  // Always add Dashboard Selector to navigation
  if (navigation.length > 0 && navigation[0].href !== "/dashboard") {
    navigation = [
      { name: "Dashboard Auswahl", href: "/dashboard", icon: LayoutDashboard },
      ...navigation
    ];
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile menu */}
      <div className="lg:hidden">
        <Button
          variant="ghost"
          className="fixed left-4 top-4 z-40"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
        
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-30 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
        )}
        
        <div
          className={cn(
            "fixed bottom-0 left-0 top-0 z-30 w-64 transform bg-white p-4 shadow-lg transition-transform dark:bg-gray-800",
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex h-full flex-col">
            <div className="mb-8 mt-6 flex items-center">
              <h2 className="text-xl font-bold text-cannabis-green-600">MediCannabis</h2>
            </div>
            
            <nav className="flex-1 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center rounded-md px-3 py-2 text-sm font-medium",
                      isActive
                        ? "bg-cannabis-green-100 text-cannabis-green-600 dark:bg-cannabis-green-800/30 dark:text-cannabis-green-400"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            
            {/* Role switcher in mobile menu - expanded */}
            <div className="my-4 border-t pt-4 dark:border-gray-700">
              <div 
                className="flex items-center justify-between cursor-pointer mb-2"
                onClick={() => setExpandedRoleSwitcher(!expandedRoleSwitcher)}
              >
                <h3 className="text-sm font-medium text-muted-foreground">Wechseln zu</h3>
                {expandedRoleSwitcher ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              
              {expandedRoleSwitcher && (
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate("/dashboard/patient")}
                    className="w-full justify-start"
                  >
                    <User className="mr-2 h-4 w-4" /> Patient Dashboard
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate("/dashboard/doctor")}
                    className="w-full justify-start"
                  >
                    <Stethoscope className="mr-2 h-4 w-4" /> Arzt Dashboard
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate("/dashboard/admin")}
                    className="w-full justify-start"
                  >
                    <Users className="mr-2 h-4 w-4" /> Admin Dashboard
                  </Button>
                </div>
              )}
              {!expandedRoleSwitcher && (
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant={currentRole === "patient" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => navigate("/dashboard/patient")}
                    className="justify-start"
                  >
                    <User className="mr-1 h-4 w-4" /> Patient
                  </Button>
                  <Button 
                    variant={currentRole === "doctor" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => navigate("/dashboard/doctor")}
                    className="justify-start"
                  >
                    <Stethoscope className="mr-1 h-4 w-4" /> Arzt
                  </Button>
                  <Button 
                    variant={currentRole === "admin" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => navigate("/dashboard/admin")}
                    className="justify-start"
                  >
                    <Users className="mr-1 h-4 w-4" /> Admin
                  </Button>
                </div>
              )}
            </div>
            
            <div className="mt-auto border-t pt-4 dark:border-gray-700">
              <div className="mb-2 flex items-center">
                <div className="h-8 w-8 rounded-full bg-cannabis-green-200 p-1 text-center font-semibold text-cannabis-green-800">
                  T
                </div>
                <div className="ml-2">
                  <p className="text-sm font-medium">Testmodus</p>
                  <p className="text-xs text-gray-500 capitalize">
                    {currentRole || "Benutzer"}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                className="flex w-full items-center justify-start"
                onClick={() => navigate('/login')}
              >
                <LogOut className="mr-2 h-5 w-5" />
                Zum Login
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Desktop sidebar */}
      <div className="hidden w-64 flex-shrink-0 bg-white shadow-md lg:block dark:bg-gray-800">
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-center border-b dark:border-gray-700">
            <h2 className="text-xl font-bold text-cannabis-green-600">MediCannabis</h2>
          </div>
          
          <div className="flex flex-1 flex-col overflow-y-auto pt-5">
            <nav className="flex-1 space-y-1 px-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "group flex items-center rounded-md px-2 py-2 text-sm font-medium",
                      isActive
                        ? "bg-cannabis-green-100 text-cannabis-green-600 dark:bg-cannabis-green-800/30 dark:text-cannabis-green-400"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          
          {/* Role switcher in desktop sidebar - expanded with better descriptions */}
          <div className="mx-2 my-4 border-t pt-4 dark:border-gray-700">
            <div 
              className="flex items-center justify-between cursor-pointer px-2 mb-2"
              onClick={() => setExpandedRoleSwitcher(!expandedRoleSwitcher)}
            >
              <h3 className="text-sm font-medium text-muted-foreground">Dashboard wechseln</h3>
              {expandedRoleSwitcher ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
            
            {expandedRoleSwitcher ? (
              <div className="space-y-2 px-2">
                <Button 
                  variant={currentRole === "patient" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => navigate("/dashboard/patient")}
                  className="w-full justify-start"
                >
                  <User className="mr-2 h-4 w-4" /> Patient Dashboard
                </Button>
                <Button 
                  variant={currentRole === "doctor" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => navigate("/dashboard/doctor")}
                  className="w-full justify-start"
                >
                  <Stethoscope className="mr-2 h-4 w-4" /> Arzt Dashboard
                </Button>
                <Button 
                  variant={currentRole === "admin" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => navigate("/dashboard/admin")}
                  className="w-full justify-start"
                >
                  <Users className="mr-2 h-4 w-4" /> Admin Dashboard
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                <Button 
                  variant={currentRole === "patient" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => navigate("/dashboard/patient")}
                >
                  <User className="h-4 w-4" />
                </Button>
                <Button 
                  variant={currentRole === "doctor" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => navigate("/dashboard/doctor")}
                >
                  <Stethoscope className="h-4 w-4" />
                </Button>
                <Button 
                  variant={currentRole === "admin" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => navigate("/dashboard/admin")}
                >
                  <Users className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            {!expandedRoleSwitcher && (
              <div className="mt-1 grid grid-cols-3 gap-2 text-center text-xs">
                <div>Patient</div>
                <div>Arzt</div>
                <div>Admin</div>
              </div>
            )}
          </div>
          
          <div className="border-t p-4 dark:border-gray-700">
            <div className="mb-4 flex items-center">
              <div className="h-10 w-10 rounded-full bg-cannabis-green-200 p-1 text-center font-semibold leading-8 text-cannabis-green-800">
                T
              </div>
              <div className="ml-2">
                <p className="font-medium">Testmodus</p>
                <p className="text-sm text-gray-500 capitalize">
                  {currentRole || "Benutzer"}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="flex w-full items-center justify-center"
              onClick={() => navigate('/login')}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Zum Login
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
