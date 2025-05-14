
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Animation delay utility to stagger animations
export const staggeredDelay = (index: number, baseDelay = 100): string => {
  return `${baseDelay * index}ms`;
}

// Format date helper
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

// Currency formatter
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}

// Generate gradient classes
export const getGradientClass = (variant: number): string => {
  const gradients = [
    'bg-gradient-to-br from-cannabis-green-100 to-cannabis-green-300',
    'bg-gradient-to-br from-blue-100 to-blue-300 dark:from-blue-900 dark:to-blue-700',
    'bg-gradient-to-br from-purple-100 to-purple-300 dark:from-purple-900 dark:to-purple-700',
    'bg-gradient-to-br from-amber-100 to-amber-300 dark:from-amber-900 dark:to-amber-700'
  ];
  
  return gradients[variant % gradients.length];
}

// Generate subtle patterns
export const getPatternClass = (variant: number): string => {
  const patterns = [
    'bg-[url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%2399f6e4\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M0 0h10v10H0V0zm10 10h10v10H10V10z\'/%3E%3C/g%3E%3C/svg%3E")]',
    'bg-[url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M10 0l10 20H0L10 0z\' fill=\'%2390cdf4\' fill-opacity=\'0.2\'/%3E%3C/svg%3E")]',
    'bg-[url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h20v20H0V0zm2 2h16v16H2V2z\' fill=\'%23d8b4fe\' fill-opacity=\'0.2\'/%3E%3C/svg%3E")]',
  ];
  
  return patterns[variant % patterns.length];
}
