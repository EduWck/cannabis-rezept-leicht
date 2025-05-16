
import { User } from "@supabase/supabase-js";
import { LogOut, User as UserIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface UserMenuProps {
  user: User | null;
  userRole: string | null;
  signOut: () => Promise<void>;
}

const userLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: null,
  },
];

const UserMenu = ({ user, userRole, signOut }: UserMenuProps) => {
  // User-Anzeigename für Avatar
  const getUserInitial = () => {
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U";
  };
  
  // Benutzerrolle für Anzeige
  const displayRole = () => {
    if (!userRole) return "Lädt...";
    
    switch(userRole) {
      case 'patient': return "Patient";
      case 'doctor': return "Arzt";
      case 'admin': return "Administrator";
      default: return userRole;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-7 w-7 sm:h-8 sm:w-8 rounded-full">
          <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
            <AvatarFallback className="text-xs sm:text-sm">
              {getUserInitial()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.email}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {displayRole()}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {userLinks.map((link) => (
          <DropdownMenuItem key={link.href} asChild>
            <Link to={link.href} className="cursor-pointer">
              {link.icon && <link.icon className="mr-2 h-4 w-4" />}
              <span>{link.label}</span>
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={signOut}
          className="cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Abmelden</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
