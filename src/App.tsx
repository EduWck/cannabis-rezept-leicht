
import { Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./components/AppRoutes";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";

// Create a client
const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    // Initialize scroll animation
    const onScroll = () => {
      const scrollElements = document.querySelectorAll(".scroll-animation");
      scrollElements.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
          el.classList.add("animate");
        }
      });
    };

    window.addEventListener("scroll", onScroll);
    // Trigger initial check
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="relative min-h-screen w-full overflow-x-hidden">
          {/* Background accents */}
          <div className="bg-accent bg-accent-1"></div>
          <div className="bg-accent bg-accent-2"></div>
          <div className="bg-accent bg-accent-3"></div>
          
          <BrowserRouter>
            <Suspense fallback={<div className="flex h-screen w-full items-center justify-center">Wird geladen...</div>}>
              <Routes>
                {AppRoutes}
              </Routes>
            </Suspense>
            <ScrollToTopButton />
          </BrowserRouter>
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
