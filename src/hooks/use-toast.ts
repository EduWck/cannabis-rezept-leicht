
import * as React from "react";
import { useToast as useToastPrimitive } from "@/components/ui/use-toast";

export type ToastActionElement = React.ReactElement<unknown>;

export type ToastProps = {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: "default" | "destructive";
};

export function useToast() {
  return useToastPrimitive();
}

export const toast = ({ title, description, variant, action, ...props }: ToastProps) => {
  const { toast } = useToastPrimitive();
  
  return toast({
    title,
    description,
    variant,
    action,
    ...props,
  });
};
