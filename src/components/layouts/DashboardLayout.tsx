
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarHeader, 
  SidebarFooter,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel
} from "@/components/ui/sidebar";
import { FileText, Home, LogOut, Settings, ShoppingBag, User, Calendar, Users, Package, Clipboard } from "lucide-react";
import { Button } from "@/components/ui/button";

// Role-specific sidebar configurations
const ADMIN_MENU_ITEMS = [
  { icon: Home, title: "Dashboard", path: "/dashboard/admin" },
  { icon: Users, title: "Benutzer", path: "/dashboard/users" },
  { icon: ShoppingBag, title: "Bestellungen", path: "/dashboard/all-orders" },
  { icon: Package, title: "Produkte", path: "/dashboard/products" },
  { icon: Settings, title: "Einstellungen", path: "/dashboard/settings" },
];

const DOCTOR_MENU_ITEMS = [
  { icon: Home, title: "Dashboard", path: "/dashboard/doctor" },
  { icon: Users, title: "Patienten", path: "/dashboard/patients" },
  { icon: Calendar, title: "Termine", path: "/dashboard/calendar" },
  { icon: Clipboard, title: "Anfragen", path: "/dashboard/requests" },
  { icon: FileText, title: "Rezepte", path: "/dashboard/doctor-prescriptions" },
];

const PHARMACY_MENU_ITEMS = [
  { icon: Home, title: "Dashboard", path: "/dashboard/pharmacy" },
  { icon: ShoppingBag, title: "Bestellungen", path: "/dashboard/pharmacy-orders" },
  { icon: FileText, title: "Rezepte", path: "/dashboard/pharmacy-prescriptions" },
  { icon: Package, title: "Bestand", path: "/dashboard/pharmacy-inventory" },
];

const PATIENT_MENU_ITEMS = [
  { icon: Home, title: "Dashboard", path: "/dashboard/patient" },
  { icon: User, title: "Profil", path: "/dashboard/profile" },
  { icon: Clipboard, title: "Befunde", path: "/dashboard/medical-findings" },
  { icon: FileText, title: "Rezepte", path: "/dashboard/prescriptions" },
  { icon: ShoppingBag, title: "Bestellungen", path: "/dashboard/orders" },
  { icon: Calendar, title: "Termine", path: "/dashboard/appointments" },
];

const DashboardLayout = () => {
  const { user, signOut } = useAuth();

  // Get menu items based on current URL path
  const getCurrentMenuItems = () => {
    const currentPath = window.location.pathname;
    console.log("Current path:", currentPath);

    // URL-based role detection
    if (currentPath.includes('/admin') || currentPath.includes('/users') || currentPath.includes('/all-orders') || currentPath.includes('/products') || currentPath.includes('/settings')) {
      console.log("Using ADMIN sidebar");
      return ADMIN_MENU_ITEMS;
    }
    
    if (currentPath.includes('/doctor') || currentPath.includes('/patients') || currentPath.includes('/calendar') || currentPath.includes('/requests')) {
      console.log("Using DOCTOR sidebar");
      return DOCTOR_MENU_ITEMS;
    }
    
    if (currentPath.includes('/pharmacy')) {
      console.log("Using PHARMACY sidebar");
      return PHARMACY_MENU_ITEMS;
    }
    
    if (currentPath.includes('/patient') || currentPath.includes('/profile') || currentPath.includes('/medical-findings') || currentPath.includes('/orders') || currentPath.includes('/appointments')) {
      console.log("Using PATIENT sidebar");
      return PATIENT_MENU_ITEMS;
    }
    
    // Default fallback
    console.log("Using PATIENT sidebar (default)");
    return PATIENT_MENU_ITEMS;
  };

  const menuItems = getCurrentMenuItems();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col bg-background w-full">
        <Navbar />
        <div className="flex-1 flex">
          <Sidebar variant="sidebar" collapsible="icon" className="pt-16">
            <SidebarHeader className="p-2">
              <SidebarTrigger />
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {menuItems.map((item, index) => (
                      <SidebarMenuItem key={index}>
                        <SidebarMenuButton asChild tooltip={item.title}>
                          <a href={item.path} className="flex items-center gap-2">
                            <item.icon className="size-4" />
                            <span className="truncate">{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-4">
              {user && (
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={signOut}
                >
                  <LogOut className="mr-2 size-4" />
                  <span>Abmelden</span>
                </Button>
              )}
            </SidebarFooter>
          </Sidebar>
          
          <div className="flex-1 pt-16">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8">
              <Outlet />
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
