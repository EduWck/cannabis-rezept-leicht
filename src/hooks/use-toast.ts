
import * as React from "react";
import { toast as sonnerToast } from "sonner";

// Define ToasterToast type
export type ToastProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
};

// Create a function for showing toasts
export const toast = ({ title, description, action, variant }: ToastProps) => {
  return sonnerToast[variant === "destructive" ? "error" : "success"](title, {
    description,
    action,
  });
};

// Export useToast hook as an API wrapper around the toast function
export const useToast = () => {
  return {
    toast,
  };
};

// Re-export Toast type
export type Toast = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
};

// Export ToastActionElement type
export type ToastActionElement = React.ReactElement;
