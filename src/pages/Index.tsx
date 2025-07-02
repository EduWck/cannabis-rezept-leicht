
import { useEffect } from "react";
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

const Index = () => {
  const { user, userRole, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect logged in users appropriately
  useEffect(() => {
    if (!isLoading && user && userRole) {
      console.log("Index page: user is logged in with role", userRole);
      
      // Add redirect based on role
      if (userRole === "patient") {
        console.log("Index: redirecting patient to dashboard/profile");
        toast({
          title: "Weiterleitung",
          description: "Sie werden zum Patienten-Dashboard weitergeleitet..."
        });
        navigate("/dashboard/profile", { replace: true });
      } else if (userRole === "doctor") {
        console.log("Index: redirecting doctor to dashboard");
        toast({
          title: "Arzt-Weiterleitung",
          description: "Sie werden zum Arzt-Dashboard weitergeleitet..."
        });
        
        // Direct navigation for doctors - consistent with other redirects
        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 100);
      } else if (userRole === "admin") {
        console.log("Index: redirecting admin to dashboard");
        toast({
          title: "Admin-Weiterleitung",
          description: "Sie werden zum Admin-Dashboard weitergeleitet..."
        });
        navigate("/dashboard", { replace: true });
      }
    }
  }, [user, userRole, isLoading, navigate]);

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
