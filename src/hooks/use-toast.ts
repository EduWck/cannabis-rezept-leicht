
import * as React from "react";
import { toast as sonnerToast } from "sonner";

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
  return sonnerToast({
    title,
    description,
    className: variant === "destructive" ? "bg-destructive text-destructive-foreground" : undefined,
    action,
    ...props,
  });
};
