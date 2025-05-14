
import * as React from "react";
import { toast as sonnerToast } from "sonner";

export type ToastActionElement = React.ReactElement<unknown>;

export type ToastProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: "default" | "destructive";
};

export const useToast = () => {
  return {
    toast: (props: ToastProps) => {
      const { title, description, variant, action } = props;
      
      return sonnerToast(title as string, {
        description,
        action,
        className: variant === "destructive" ? "destructive" : undefined,
      });
    },
    dismiss: sonnerToast.dismiss,
  };
};

export const toast = (props: ToastProps) => {
  const { title, description, variant, action } = props;
  
  return sonnerToast(title as string, {
    description,
    action,
    className: variant === "destructive" ? "destructive" : undefined,
  });
};
