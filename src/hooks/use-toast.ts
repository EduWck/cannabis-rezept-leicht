
import {
  Toast,
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast";

import {
  useToast as useToastBase,
} from "@/components/ui/use-toast";

export type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

// Export the base hook
export const useToast = useToastBase;

// Export the toast function directly
export const { toast } = useToastBase();

// Re-export types
export type { Toast, ToastProps };
