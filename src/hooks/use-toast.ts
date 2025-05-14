
import * as React from "react";
import { toast as sonnerToast, type ToastT } from "sonner";

export type ToastActionElement = React.ReactElement<unknown>;

export type ToastProps = {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: "default" | "destructive";
};

export function useToast() {
  return {
    toast: (props: ToastProps) => toast(props),
    dismiss: sonnerToast.dismiss,
  };
}

export const toast = ({ title, description, variant, action, ...props }: ToastProps) => {
  // Sonner expects options differently structured than our ToastProps
  // We need to pass title as first arg, and other properties as second arg (options)
  return sonnerToast(title as string, {
    description,
    action,
    className: variant === "destructive" ? "bg-destructive text-destructive-foreground" : undefined,
    ...props,
  });
};
