
/**
 * Responsive utility functions
 */

// Determines if the current viewport matches a media query
export const useMediaQuery = (query: string): boolean => {
  if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
    return false;
  }
  
  return window.matchMedia(query).matches;
};

// Get device type based on current viewport
export const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  if (typeof window === 'undefined') {
    return 'desktop'; // Default for SSR
  }
  
  const width = window.innerWidth;
  
  if (width < 640) {
    return 'mobile';
  } else if (width < 1024) {
    return 'tablet';
  } else {
    return 'desktop';
  }
};

// Truncate text to a specific length for mobile devices
export const truncateForMobile = (text: string, maxLength = 100): string => {
  if (typeof window === 'undefined' || window.innerWidth >= 640) {
    return text;
  }
  
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength) + '...';
};

// Responsive image sizing helper
export const getResponsiveImageSize = (
  defaultSize: number,
  mobileReduction = 0.6,
  tabletReduction = 0.8
): number => {
  const deviceType = getDeviceType();
  
  switch (deviceType) {
    case 'mobile':
      return Math.round(defaultSize * mobileReduction);
    case 'tablet':
      return Math.round(defaultSize * tabletReduction);
    default:
      return defaultSize;
  }
};

// Get responsive padding values
export const getResponsivePadding = (): {
  x: string;
  y: string;
} => {
  const deviceType = getDeviceType();
  
  switch (deviceType) {
    case 'mobile':
      return { x: 'px-4', y: 'py-6' };
    case 'tablet':
      return { x: 'px-6', y: 'py-8' };
    default:
      return { x: 'px-8', y: 'py-10' };
  }
};
