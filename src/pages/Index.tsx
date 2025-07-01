
import { logger } from "@/lib/logger";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Hero from "@/components/Hero";
import ProcessSection from "@/components/ProcessSection";
import BenefitsSection from "@/components/BenefitsSection";
import FAQSection from "@/components/FAQSection";
import TrustSection from "@/components/TrustSection";
import OptionsSection from "@/components/OptionsSection";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { user, userRole, isLoading } = useAuth();
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  // Show content immediately for non-logged in users or after brief delay
  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // Not logged in - show content immediately
        setShowContent(true);
      } else {
        // Logged in - show content briefly then redirect
        setShowContent(true);
        
        const redirectTimer = setTimeout(() => {
          if (userRole === "patient") {
            logger.debug("Index: redirecting patient to dashboard/profile");
            toast({
              title: "Weiterleitung",
              description: "Sie werden zum Patienten-Dashboard weitergeleitet..."
            });
            navigate("/dashboard/profile", { replace: true });
          } else if (userRole === "doctor") {
            logger.debug("Index: redirecting doctor to dashboard");
            toast({
              title: "Arzt-Weiterleitung", 
              description: "Sie werden zum Arzt-Dashboard weitergeleitet..."
            });
            navigate("/dashboard", { replace: true });
          } else if (userRole === "admin") {
            logger.debug("Index: redirecting admin to dashboard");
            toast({
              title: "Admin-Weiterleitung",
              description: "Sie werden zum Admin-Dashboard weitergeleitet..."
            });
            navigate("/dashboard", { replace: true });
          }
        }, 2000); // 2 second delay

        return () => clearTimeout(redirectTimer);
      }
    }
  }, [user, userRole, isLoading, navigate]);

  // Show loading state only initially
  if (isLoading && !showContent) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-cannabis-green-500 mb-4" />
        <p className="text-muted-foreground">Wird geladen...</p>
      </div>
    );
  }

  // Show content with optional redirect notification
  return (
    <div className="bg-background text-foreground">
      {user && userRole && (
        <div className="fixed top-4 right-4 z-50 bg-cannabis-green-100 dark:bg-cannabis-green-900 border border-cannabis-green-300 dark:border-cannabis-green-700 rounded-lg p-4 shadow-lg">
          <div className="flex items-center space-x-3">
            <Loader2 className="h-5 w-5 animate-spin text-cannabis-green-600" />
            <div>
              <p className="text-sm font-medium text-cannabis-green-800 dark:text-cannabis-green-200">
                Willkommen zurück!
              </p>
              <p className="text-xs text-cannabis-green-600 dark:text-cannabis-green-400">
                Weiterleitung zum Dashboard...
              </p>
            </div>
            <button 
              onClick={() => navigate("/dashboard")}
              className="text-xs bg-cannabis-green-600 hover:bg-cannabis-green-700 text-white px-3 py-1 rounded"
            >
              Jetzt gehen
            </button>
          </div>
        </div>
      )}
      
      <Hero />
      <ProcessSection />
      <BenefitsSection />
      <OptionsSection />
      <TrustSection />
      <FAQSection />
      <ScrollToTopButton />
    </div>
  );
};

export default Index;
