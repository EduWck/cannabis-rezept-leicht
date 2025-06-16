
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

// Static sidebar configurations for each role
const ADMIN_MENU_ITEMS = [
  { icon: Home, title: "Dashboard", path: "/dashboard" },
  { icon: Users, title: "Benutzer", path: "/dashboard/users" },
  { icon: ShoppingBag, title: "Bestellungen", path: "/dashboard/all-orders" },
  { icon: Package, title: "Produkte", path: "/dashboard/products" },
  { icon: Settings, title: "Einstellungen", path: "/dashboard/settings" },
];

const DOCTOR_MENU_ITEMS = [
  { icon: Home, title: "Dashboard", path: "/dashboard" },
  { icon: Users, title: "Patienten", path: "/dashboard/patients" },
  { icon: Calendar, title: "Termine", path: "/dashboard/calendar" },
  { icon: Clipboard, title: "Anfragen", path: "/dashboard/requests" },
  { icon: FileText, title: "Rezepte", path: "/dashboard/prescriptions" },
];

const PHARMACY_MENU_ITEMS = [
  { icon: Home, title: "Dashboard", path: "/dashboard" },
  { icon: ShoppingBag, title: "Bestellungen", path: "/dashboard/pharmacy-orders" },
  { icon: FileText, title: "Rezepte", path: "/dashboard/pharmacy-prescriptions" },
  { icon: Package, title: "Bestand", path: "/dashboard/pharmacy-inventory" },
];

const PATIENT_MENU_ITEMS = [
  { icon: Home, title: "Dashboard", path: "/dashboard" },
  { icon: User, title: "Profil", path: "/dashboard/profile" },
  { icon: Clipboard, title: "Befunde", path: "/dashboard/medical-findings" },
  { icon: FileText, title: "Rezepte", path: "/dashboard/prescriptions" },
  { icon: ShoppingBag, title: "Bestellungen", path: "/dashboard/orders" },
  { icon: Calendar, title: "Termine", path: "/dashboard/appointments" },
];

const DashboardLayout = () => {
  const { user, userRole, signOut } = useAuth();

  // Get menu items based on current URL for demonstration
  const getCurrentMenuItems = () => {
    const currentPath = window.location.pathname;
    console.log("Current path:", currentPath);
    console.log("Current userRole:", userRole);

    // For demonstration: determine role based on URL or userRole
    if (currentPath.includes('/admin') || userRole === 'admin') {
      console.log("Using ADMIN sidebar");
      return ADMIN_MENU_ITEMS;
    }
    
    if (currentPath.includes('/doctor') || userRole === 'doctor') {
      console.log("Using DOCTOR sidebar");
      return DOCTOR_MENU_ITEMS;
    }
    
    if (currentPath.includes('/pharmacy') || userRole === 'pharmacy') {
      console.log("Using PHARMACY sidebar");
      return PHARMACY_MENU_ITEMS;
    }
    
    console.log("Using PATIENT sidebar (default)");
    return PATIENT_MENU_ITEMS;
  };

  const menuItems = getCurrentMenuItems();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col bg-background w-full">
        <Navbar />
        <div className="flex-1 flex">
          {/* Added pt-16 to create space between navbar and sidebar content */}
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
