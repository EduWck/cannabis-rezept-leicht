
import * as React from "react";
import { toast as sonnerToast, type Toast } from "sonner";

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
      sonnerToast(title as string, {
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

// Re-export a wrapper around sonner's toast function to match our expected API
export const toast = (props: ToastProps) => {
  sonnerToast(props.title as string, {
    description: props.description as string,
    action: props.action,
    className: props.variant === "destructive" ? "bg-destructive text-destructive-foreground" : ""
  });
};
