
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export interface QueryOptions {
  errorTitle?: string;
  errorMessage?: string;
}

// Simplified mock version that doesn't use Supabase
export function useDbQuery<T>() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T[]>([]);

  // Mock function that simulates a database query
  const executeQuery = async (
    fetchDataFn: (() => Promise<any> | T[]) | T[],
    options?: QueryOptions
  ) => {
    setLoading(true);
    
    try {
      // Check if fetchDataFn is an array (mock data) or a function
      let result: T[];
      
      if (typeof fetchDataFn === 'function') {
        try {
          const response = await (fetchDataFn as () => Promise<any> | T[])();
          
          // Handle Supabase response format
          if (response && response.data !== undefined) {
            result = response.data;
          } else {
            // Handle case where response is already the data array
            result = response as T[];
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          const errorTitle = options?.errorTitle || "Fehler";
          const errorMessage = options?.errorMessage || "Daten konnten nicht geladen werden. Bitte versuchen Sie es später erneut.";
          
          toast({
            title: errorTitle,
            description: errorMessage,
            variant: "destructive",
          });
          
          setLoading(false);
          return [];
        }
      } else {
        // If fetchDataFn is the data itself (array)
        result = fetchDataFn as T[];
      }
      
      setData(result);
      setLoading(false);
      return result;
    } catch (error) {
      console.error('Error in executeQuery:', error);
      toast({
        title: options?.errorTitle || "Fehler",
        description: options?.errorMessage || "Daten konnten nicht geladen werden. Bitte versuchen Sie es später erneut.",
        variant: "destructive",
      });
      setLoading(false);
      return [];
    }
  };

  return { loading, data, executeQuery };
}
