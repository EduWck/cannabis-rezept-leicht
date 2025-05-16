
import { Link } from "react-router-dom";
import { Leaf, LogOut, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  navItems: NavItem[];
  user: any | null;
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
    <div className="flex flex-col h-full py-4">
      <Link to="/" className="flex items-center gap-2 mb-6" onClick={onClose}>
        <Leaf className="h-6 w-6 text-cannabis-green-500" />
        <span className="font-semibold">
          Cannabis<span className="text-cannabis-green-500">Med</span>
        </span>
      </Link>
      <nav className="mb-8">
        <div className="space-y-3">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              to={item.href} 
              onClick={onClose}
              className="block py-2 text-base font-medium hover:text-cannabis-green-500 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
      <div className="mt-auto space-y-3">
        {user ? (
          <>
            <div className="px-3 py-2 mb-4 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium">{user.email}</p>
              <p className="text-xs text-muted-foreground">
                {userRole === 'admin' ? 'Administrator' : userRole === 'doctor' ? 'Arzt' : 'Patient'}
              </p>
            </div>
            {userLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="flex items-center py-2 text-base font-medium hover:text-cannabis-green-500 transition-colors"
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
              className="flex items-center w-full py-2 text-base font-medium hover:text-cannabis-green-500 transition-colors"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Abmelden
            </button>
          </>
        ) : (
          <Button 
            className="w-full"
            onClick={() => {
              onStartConsultation();
              onClose();
            }}
          >
            Starte Konsultation
          </Button>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
