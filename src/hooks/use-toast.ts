
import { toast as sonnerToast } from "sonner";

type ToastVariant = "default" | "destructive" | "success";

// Map our variant names to Sonner style properties
const variantToSonnerProps = {
  default: {},
  destructive: { style: { backgroundColor: "rgb(239, 68, 68)", color: "white" } },
  success: { style: { backgroundColor: "rgb(34, 197, 94)", color: "white" } }
};

// Define toast function types
interface ToastProps {
  title?: string;
  description?: string;
  variant?: ToastVariant;
}

// Create a wrapper for the toast function
const toast = ({ title, description, variant = "default" }: ToastProps) => {
  const variantProps = variantToSonnerProps[variant];
  
  if (title) {
    return sonnerToast(title, {
      description,
      ...variantProps
    });
  } else {
    return sonnerToast(description || "", variantProps);
  }
};

// Create a hook to use the toast function
export const useToast = () => {
  return { toast };
};

// Also export the toast function directly
export { toast };
