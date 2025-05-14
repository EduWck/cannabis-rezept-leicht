
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
        navigate("/dashboard/profile", { replace: true });
      } else if (userRole === "doctor") {
        console.log("Index: redirecting doctor to dashboard");
        navigate("/dashboard", { replace: true });
      } else if (userRole === "admin") {
        console.log("Index: redirecting admin to dashboard");
        navigate("/dashboard", { replace: true });
      }
    }
  }, [user, userRole, isLoading, navigate]);

  return (
    <div>
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
