
import { useState, useEffect } from "react";

type BreakpointType = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export const useIsMobile = (breakpoint: BreakpointType = "md") => {
  // Set the appropriate max width based on the breakpoint
  const getBreakpointWidth = (bp: BreakpointType): number => {
    switch (bp) {
      case "xs": return 480;
      case "sm": return 640;
      case "md": return 768;
      case "lg": return 1024;
      case "xl": return 1280;
      case "2xl": return 1536;
      default: return 768;
    }
  };

  const breakpointWidth = getBreakpointWidth(breakpoint);
  const [isMobile, setIsMobile] = useState(() => {
    // Safe check for window object - for SSR
    if (typeof window === 'undefined') return false;
    return window.innerWidth < breakpointWidth;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Function to check if the screen width is mobile-sized
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpointWidth);
    };

    // Set the initial value
    checkIsMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIsMobile);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, [breakpointWidth]);

  return isMobile;
};

export default useIsMobile;
