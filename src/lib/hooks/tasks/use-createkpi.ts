import { createKPI } from "@/services/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useCreateKPI() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createKPI,
    onSuccess: (data) => {
      toast.success("KPI created successfully");
      queryClient.invalidateQueries({ queryKey: ["kpis"] });
    },
    onError: (error: any) => {
      toast.error("Failed to create KPI");
      console.error("Create KPI Error:", error);
    },
  });
}
