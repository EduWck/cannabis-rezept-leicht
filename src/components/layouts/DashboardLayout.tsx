
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

const DashboardLayout = () => {
  const { signOut, userRole, profile, user } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Determine navigation items based on current path
  let navigation = [
    { name: "Dashboard Auswahl", href: "/dashboard", icon: LayoutDashboard },
  ];

  // Determine which navigation items to show based on current path
  if (pathname.includes('/dashboard/patient')) {
    navigation = [
      ...navigation,
      { name: "Meine Rezepte", href: "/dashboard/prescriptions", icon: FileText },
      { name: "Bestellungen", href: "/dashboard/orders", icon: ShoppingCart },
      { name: "Termine", href: "/dashboard/appointments", icon: Calendar },
      { name: "Profil", href: "/dashboard/profile", icon: User },
    ];
  }

  if (pathname.includes('/dashboard/doctor')) {
    navigation = [
      ...navigation,
      { name: "Behandlungsanfragen", href: "/dashboard/requests", icon: FileText },
      { name: "Patienten", href: "/dashboard/patients", icon: User },
      { name: "Terminkalender", href: "/dashboard/calendar", icon: Calendar },
    ];
  }

  if (pathname.includes('/dashboard/admin')) {
    navigation = [
      ...navigation,
      { name: "Benutzer verwalten", href: "/dashboard/users", icon: User },
      { name: "Rezepte", href: "/dashboard/all-prescriptions", icon: FileText },
      { name: "Bestellungen", href: "/dashboard/all-orders", icon: ShoppingCart },
      { name: "Termine", href: "/dashboard/all-appointments", icon: Calendar },
      { name: "Produkte", href: "/dashboard/products", icon: ShoppingCart },
      { name: "Einstellungen", href: "/dashboard/settings", icon: Settings },
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
            
            <div className="mt-auto border-t pt-4 dark:border-gray-700">
              <div className="mb-2 flex items-center">
                <div className="h-8 w-8 rounded-full bg-cannabis-green-200 p-1 text-center font-semibold text-cannabis-green-800">
                  T
                </div>
                <div className="ml-2">
                  <p className="text-sm font-medium">Testmodus</p>
                  <p className="text-xs text-gray-500 capitalize">
                    {pathname.includes('/admin') ? 'Administrator' : 
                     pathname.includes('/doctor') ? 'Arzt' : 
                     pathname.includes('/patient') ? 'Patient' : 'Benutzer'}
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
          
          <div className="border-t p-4 dark:border-gray-700">
            <div className="mb-4 flex items-center">
              <div className="h-10 w-10 rounded-full bg-cannabis-green-200 p-1 text-center font-semibold leading-8 text-cannabis-green-800">
                T
              </div>
              <div className="ml-2">
                <p className="font-medium">Testmodus</p>
                <p className="text-sm text-gray-500 capitalize">
                  {pathname.includes('/admin') ? 'Administrator' : 
                   pathname.includes('/doctor') ? 'Arzt' : 
                   pathname.includes('/patient') ? 'Patient' : 'Benutzer'}
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
