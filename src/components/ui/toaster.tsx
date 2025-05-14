
import { toast as sonnerToast, Toaster as SonnerToaster } from "sonner";
import { useTheme } from "@/components/ThemeProvider";

export function Toaster() {
  const { theme } = useTheme();
  
  return (
    <SonnerToaster 
      position="bottom-right" 
      closeButton 
      richColors 
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-white dark:group-[.toaster]:bg-gray-900 group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          title: "group-[.toast]:text-gray-800 dark:group-[.toast]:text-gray-100 text-base font-semibold",
          description: "group-[.toast]:text-gray-600 dark:group-[.toast]:text-gray-300 text-sm",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success: "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800",
          error: "bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800",
          info: "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800",
          warning: "bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800",
        },
      }}
    />
  );
}

export { sonnerToast as toast };
