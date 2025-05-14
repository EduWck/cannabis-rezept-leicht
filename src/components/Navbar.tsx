
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, X, LogOut, User } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeProvider";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Fragebogen", href: "/fragebogen" },
    { name: "Video-Call", href: "/video-call" },
    { name: "Vor Ort", href: "/vor-ort" },
    { name: "Über uns", href: "/uber-uns" },
    { name: "Kontakt", href: "/kontakt" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 shadow-md backdrop-blur-sm dark:bg-gray-900/90"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-cannabis-green-600 dark:text-cannabis-green-400">
            MediCannabis
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-cannabis-green-100 text-cannabis-green-700 dark:bg-cannabis-green-900/30 dark:text-cannabis-green-400"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <Link to="/fragebogen">
            <Button variant="default" className="ml-4">
              Rezept anfordern
            </Button>
          </Link>
          
          {user ? (
            <>
              <Link to="/dashboard/profile">
                <Button variant="outline" className="ml-2">
                  <User className="mr-2 h-4 w-4" /> Mein Profil
                </Button>
              </Link>
              <Button variant="outline" className="ml-2" onClick={() => signOut()}>
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button variant="outline" className="ml-2">
                Login
              </Button>
            </Link>
          )}
          
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center md:hidden">
          <div className="mr-2">
            <ThemeToggle />
          </div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <nav className="flex flex-col space-y-4 pt-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? "bg-cannabis-green-100 text-cannabis-green-700 dark:bg-cannabis-green-900/30 dark:text-cannabis-green-400"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                
                <Link to="/fragebogen" onClick={() => setIsOpen(false)}>
                  <Button variant="default" className="w-full">
                    Rezept anfordern
                  </Button>
                </Link>
                
                {user ? (
                  <>
                    <Link to="/dashboard/profile" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full">
                        <User className="mr-2 h-4 w-4" /> Mein Profil
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full" onClick={() => {
                      signOut();
                      setIsOpen(false);
                    }}>
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </Button>
                  </>
                ) : (
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
