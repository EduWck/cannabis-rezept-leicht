
import { useEffect, useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types";
import { Loader2 } from "lucide-react";

interface RouteGuardProps {
  allowedRoles?: UserRole[];
}

const RouteGuard = ({ allowedRoles }: RouteGuardProps) => {
  const { user, userRole, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuthorization = async () => {
      if (isLoading) return;

      if (!user) {
        // Not logged in - redirect to login
        navigate("/login", { state: { from: location.pathname } });
        return;
      }

      if (!allowedRoles || allowedRoles.length === 0 || (userRole && allowedRoles.includes(userRole))) {
        setIsAuthorized(true);
      } else {
        // User doesn't have the required role - redirect to dashboard
        navigate("/dashboard");
      }
    };

    checkAuthorization();
  }, [user, userRole, isLoading, allowedRoles, navigate, location]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-cannabis-green-500" />
      </div>
    );
  }

  return isAuthorized ? <Outlet /> : null;
};

export default RouteGuard;
