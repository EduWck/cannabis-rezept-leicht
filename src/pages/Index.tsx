
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
  const [shouldRedirect, setShouldRedirect] = useState(false);

  // Redirect logged in users appropriately - but only after a delay
  useEffect(() => {
    if (!isLoading && user && userRole) {
      logger.debug("Index page: user is logged in with role", userRole);
      
      // Set a flag to show we should redirect, but don't redirect immediately
      setShouldRedirect(true);
      
      // Show the content for a moment, then redirect
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
      }, 1500); // 1.5 seconds delay to show content first

      return () => clearTimeout(redirectTimer);
    }
  }, [user, userRole, isLoading, navigate]);

  // Show loading state while auth is loading
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-cannabis-green-500 mb-4" />
        <p className="text-muted-foreground">Wird geladen...</p>
      </div>
    );
  }

  // Show content with redirect notification for logged in users
  if (shouldRedirect && user && userRole) {
    return (
      <div className="bg-background text-foreground">
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
          <Loader2 className="h-8 w-8 animate-spin text-cannabis-green-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Willkommen zurück!</h2>
          <p className="text-muted-foreground mb-4">
            Sie werden zu Ihrem Dashboard weitergeleitet...
          </p>
          <button 
            onClick={() => navigate("/dashboard")}
            className="btn-primary"
          >
            Jetzt zum Dashboard
          </button>
        </div>
        <Hero />
        <ProcessSection />
        <BenefitsSection />
        <OptionsSection />
        <TrustSection />
        <FAQSection />
        <ScrollToTopButton />
      </div>
    );
  }

  // Show full content for non-logged in users
  return (
    <div className="bg-background text-foreground">
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
