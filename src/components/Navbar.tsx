
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Leaf, Menu, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ThemeProvider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Über Uns",
    href: "/uber-uns",
  },
  {
    label: "Kontakt",
    href: "/kontakt",
  },
  {
    label: "Vor Ort",
    href: "/vor-ort",
  },
  {
    label: "Fragebogen",
    href: "/fragebogen",
  },
];

const userLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: null,
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, userRole } = useAuth();
  const isMobile = useIsMobile();

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-cannabis-green-500" />
          <span className="hidden font-semibold md:inline-block">
            Cannabis<span className="text-cannabis-green-500">Med</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink key={item.href} to={item.href}>
              {({ isActive }) => (
                <span
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-foreground/80",
                    isActive ? "text-foreground" : "text-foreground/60"
                  )}
                >
                  {item.label}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar>
                    <AvatarFallback>
                      {user.email ? user.email.charAt(0).toUpperCase() : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.email}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {userRole}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {userLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link to={link.href}>
                      {link.icon && <link.icon className="mr-2 h-4 w-4" />}
                      <span>{link.label}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => useAuth().signOut()}
                  className="cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Abmelden</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button variant="outline" size="sm">
                Anmelden
              </Button>
            </Link>
          )}
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <Link to="/" className="flex items-center gap-2">
                <Leaf className="h-6 w-6 text-cannabis-green-500" />
                <span className="font-semibold">
                  Cannabis<span className="text-cannabis-green-500">Med</span>
                </span>
              </Link>
              <div className="mt-8 flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link key={item.href} to={item.href} onClick={() => setIsOpen(false)}>
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-4">
                {user ? (
                  <>
                    {userLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        className="flex items-center"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.icon && <link.icon className="mr-2 h-4 w-4" />}
                        {link.label}
                      </Link>
                    ))}
                    <button
                      onClick={() => {
                        useAuth().signOut();
                        setIsOpen(false);
                      }}
                      className="flex items-center"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Abmelden
                    </button>
                  </>
                ) : (
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    Anmelden
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
