
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Leaf, Menu, LogOut, User, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { toast } from "@/hooks/use-toast";
import UserMenu from "@/components/navigation/UserMenu";
import MobileMenu from "@/components/navigation/MobileMenu";

const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Über Uns",
    href: "/uber-uns",
  },
  {
    label: "Therapiemöglichkeiten",
    href: "/therapiemoeglichkeiten",
  },
  {
    label: "Kontakt",
    href: "/kontakt",
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Benutze ein try-catch, um Fehler beim Zugriff auf den Auth-Kontext sicher zu handhaben
  let user = null;
  let userRole = null;
  let signOut = async () => {
    console.error("Sign out not available - AuthContext not found");
  };
  let isLoading = false;
  
  try {
    // Versuche sicher, den Auth-Kontext zu verwenden
    const auth = useAuth();
    user = auth.user;
    userRole = auth.userRole;
    signOut = auth.signOut;
    isLoading = auth.isLoading;
  } catch (error) {
    console.error("AuthContext nicht verfügbar in NavBar:", error);
    // Fallback-Werte werden oben bereits definiert
  }

  // Weiterleitung zur Fragebogen-Seite
  const handleStartConsultation = () => {
    navigate("/fragebogen");
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-1 sm:gap-2">
          <Leaf className="h-5 w-5 sm:h-6 sm:w-6 text-cannabis-green-500" />
          <span className="text-sm sm:text-base font-semibold">
            Cannabis<span className="text-cannabis-green-500">Med</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          {navItems.map((item) => (
            <NavLink key={item.href} to={item.href}>
              {({ isActive }) => (
                <span
                  className={`text-sm font-medium transition-colors hover:text-foreground/80 ${
                    isActive ? "text-foreground" : "text-foreground/60"
                  }`}
                >
                  {item.label}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
        
        <div className="flex items-center gap-2 sm:gap-4">
          {isLoading ? (
            // Zeige Lade-Indikator während Auth-Status geladen wird
            <Button variant="ghost" size="sm" disabled className="hidden sm:flex">
              Lädt...
            </Button>
          ) : user ? (
            // Benutzerprofil-Dropdown für eingeloggte Benutzer
            <UserMenu 
              user={user} 
              userRole={userRole} 
              signOut={signOut}
            />
          ) : (
            // Button für nicht eingeloggte Benutzer
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleStartConsultation}
              className="hidden sm:flex items-center gap-1"
            >
              <User size={16} />
              <span className="hidden sm:inline">Starte Konsultation</span>
            </Button>
          )}
          
          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px] pr-0">
              <MobileMenu 
                navItems={navItems} 
                user={user} 
                userRole={userRole}
                signOut={signOut}
                onClose={() => setIsOpen(false)}
                onStartConsultation={handleStartConsultation}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
