
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import OptionsSection from '../components/OptionsSection';
import BenefitsSection from '../components/BenefitsSection';
import ProcessSection from '../components/ProcessSection';
import TrustSection from '../components/TrustSection';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { setupScrollAnimations } from '../utils/scrollAnimation';

const Index = () => {
  useEffect(() => {
    const cleanupAnimations = setupScrollAnimations();
    
    // Update page title
    document.title = 'MediCannabis - Dein Weg zum medizinischen Cannabis-Rezept';
    
    return () => {
      cleanupAnimations();
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <Hero />
        <OptionsSection />
        <BenefitsSection />
        <ProcessSection />
        <TrustSection />
        <FAQSection />
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Index;
