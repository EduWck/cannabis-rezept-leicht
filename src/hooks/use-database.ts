
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { PostgrestResponse } from "@supabase/supabase-js";

interface UseDbQueryOptions<T> {
  errorTitle?: string;
  errorMessage?: string;
  onSuccess?: (data: T[]) => void;
}

export function useDbQuery<T>() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T[]>([]);
  const { toast } = useToast();

  const executeQuery = async (
    queryFn: () => Promise<PostgrestResponse<T>> | any,
    options: UseDbQueryOptions<T> = {}
  ) => {
    const { 
      errorTitle = "Fehler", 
      errorMessage = "Daten konnten nicht geladen werden. Bitte versuchen Sie es später erneut.", 
      onSuccess 
    } = options;
    
    setLoading(true);
    
    try {
      const { data: queryData, error } = await queryFn();
      
      if (error) {
        console.error(`Database query error:`, error);
        throw error;
      }
      
      const resultData = queryData || [];
      setData(resultData);
      
      if (onSuccess) {
        onSuccess(resultData);
      }
      
      return resultData;
    } catch (error: any) {
      console.error("Error executing query:", error);
      
      toast({
        title: errorTitle,
        description: errorMessage,
        variant: "destructive",
      });
      
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, executeQuery };
}
