
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

// Simplified mock version that doesn't use Supabase
export function useDbQuery<T>() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T[]>([]);

  // Mock function that simulates a database query
  const executeQuery = async (
    mockData: T[] = [],
    delay: number = 500,
    shouldSucceed: boolean = true
  ) => {
    setLoading(true);
    
    return new Promise<T[]>((resolve) => {
      setTimeout(() => {
        if (shouldSucceed) {
          setData(mockData);
          setLoading(false);
          resolve(mockData);
        } else {
          toast({
            title: "Fehler",
            description: "Daten konnten nicht geladen werden. Bitte versuchen Sie es später erneut.",
            variant: "destructive",
          });
          setLoading(false);
          resolve([]);
        }
      }, delay);
    });
  };

  return { loading, data, executeQuery };
}
