
import { Toast, toast as sonnerToast, ToastActionElement } from "sonner";

type ToastProps = React.ComponentProps<typeof Toast>;

type ToastActionProps = {
  altText: string;
  onClick: () => void;
  children: React.ReactNode;
};

export type ToastOptions = {
  title?: string;
  description?: React.ReactNode;
  variant?: "default" | "destructive";
  action?: ToastActionElement;
  duration?: number;
};

export const toast = ({
  title,
  description,
  variant = "default",
  action,
  ...props
}: ToastOptions) => {
  return sonnerToast[variant === "destructive" ? "error" : "success"](
    title,
    {
      description,
      action,
      ...props,
    }
  );
};

export const useToast = () => {
  return {
    toast,
  };
};
