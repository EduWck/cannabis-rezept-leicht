
import * as React from "react";
import { toast as sonnerToast } from "sonner";

export type ToastActionElement = React.ReactElement<unknown>;

export interface ToastProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: "default" | "destructive";
  duration?: number;
}

export function useToast() {
  return {
    toast,
    dismiss: sonnerToast.dismiss,
  };
}

export const toast = ({ title, description, variant, action, ...props }: ToastProps) => {
  // Correctly use sonner toast API
  return sonnerToast(title as string, {
    description,
    action,
    duration: props.duration,
    className: variant === "destructive" ? "bg-destructive text-destructive-foreground" : undefined,
  });
};
