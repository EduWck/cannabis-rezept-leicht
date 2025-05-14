
import * as React from "react";
import { toast } from "sonner";

export type ToastActionElement = React.ReactElement<unknown>;

export type ToastProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: "default" | "destructive";
};

export const useToast = () => {
  const showToast = React.useCallback(
    ({ title, description, action, variant = "default" }: ToastProps) => {
      toast(title as string, {
        description: description as string,
        action: action,
        className: variant === "destructive" ? "bg-destructive text-destructive-foreground" : ""
      });
    },
    []
  );

  return {
    toast: showToast,
  };
};

// Re-export the toast function for direct usage
export { toast };
