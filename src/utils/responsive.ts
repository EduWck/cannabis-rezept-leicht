
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
  if (typeof window === 'undefined') return text;
  
  const isMobile = window.innerWidth < 640;
  if (!isMobile || text.length <= maxLength) return text;
  
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

// Get responsive padding values based on device type
export const getResponsivePadding = (): {
  x: string;
  y: string;
} => {
  const deviceType = getDeviceType();
  
  switch (deviceType) {
    case 'mobile':
      return { x: 'px-4', y: 'py-4' };
    case 'tablet':
      return { x: 'px-6', y: 'py-6' };
    default:
      return { x: 'px-8', y: 'py-8' };
  }
};

// Get responsive font size classes based on device type
export const getResponsiveFontSize = (
  base: string,
  mobile: string,
  tablet: string
): string => {
  const deviceType = getDeviceType();
  
  switch (deviceType) {
    case 'mobile':
      return mobile;
    case 'tablet':
      return tablet;
    default:
      return base;
  }
};

// Check if element is overflowing its container
export const isElementOverflowing = (element: HTMLElement): boolean => {
  if (!element) return false;
  
  return element.scrollHeight > element.clientHeight || 
         element.scrollWidth > element.clientWidth;
};

// Calculate optimal font size to prevent overflow (for dynamic text sizing)
export const calculateOptimalFontSize = (
  element: HTMLElement,
  text: string,
  maxSize: number,
  minSize: number,
  step: number = 1
): number => {
  if (!element) return minSize;
  
  const testElement = document.createElement('span');
  testElement.style.visibility = 'hidden';
  testElement.style.position = 'absolute';
  testElement.style.whiteSpace = 'nowrap';
  testElement.innerText = text;
  
  document.body.appendChild(testElement);
  
  let fontSize = maxSize;
  const containerWidth = element.offsetWidth;
  
  while (fontSize > minSize) {
    testElement.style.fontSize = `${fontSize}px`;
    if (testElement.offsetWidth <= containerWidth) {
      break;
    }
    fontSize -= step;
  }
  
  document.body.removeChild(testElement);
  return fontSize;
};
