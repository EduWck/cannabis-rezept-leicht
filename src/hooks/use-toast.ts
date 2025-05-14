
import { useToast as useShadcnToast, type ToastActionElement, type ToastProps } from "@/components/ui/toast";

type ToastOptions = Omit<ToastProps, "id"> & {
  action?: ToastActionElement;
};

export const useToast = () => {
  const { toast } = useShadcnToast();
  return { toast };
};

export const toast = (props: ToastOptions) => {
  const { toast } = useShadcnToast();
  return toast(props);
};

