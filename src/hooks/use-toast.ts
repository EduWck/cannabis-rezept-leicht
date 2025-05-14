
// Re-export from sonner
import { toast } from "sonner";

export { toast };

// Toast hook implementation
import { useToast as useToastDefault } from "@/components/ui/use-toast";
export { useToastDefault as useToast };
