
import { Link } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { Leaf, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  navItems: NavItem[];
  user: User | null;
  userRole: string | null;
  signOut: () => Promise<void>;
  onClose: () => void;
  onStartConsultation: () => void;
}

const userLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: null,
  },
];

const MobileMenu = ({ 
  navItems, 
  user, 
  userRole, 
  signOut, 
  onClose,
  onStartConsultation 
}: MobileMenuProps) => {
  return (
    <>
      <Link to="/" className="flex items-center gap-2" onClick={onClose}>
        <Leaf className="h-6 w-6 text-cannabis-green-500" />
        <span className="font-semibold">
          Cannabis<span className="text-cannabis-green-500">Med</span>
        </span>
      </Link>
      <div className="mt-8 flex flex-col gap-4">
        {navItems.map((item) => (
          <Link 
            key={item.href} 
            to={item.href} 
            onClick={onClose}
          >
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
                onClick={onClose}
              >
                {link.icon && <link.icon className="mr-2 h-4 w-4" />}
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                signOut();
                onClose();
              }}
              className="flex items-center"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Abmelden
            </button>
          </>
        ) : (
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => {
              onStartConsultation();
              onClose();
            }}
          >
            Starte Konsultation
          </Button>
        )}
      </div>
    </>
  );
};

export default MobileMenu;
