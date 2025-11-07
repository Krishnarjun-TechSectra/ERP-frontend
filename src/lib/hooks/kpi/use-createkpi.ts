// use_create_kpi.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createKpi } from "@/services/kpi";

export function useCreateKpi() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createKpi,
    onSuccess: () => {
      toast.success("KPI created successfully!");
      queryClient.invalidateQueries({ queryKey: ["kpis"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create KPI");
      console.error("Create KPI Error:", error);
    },
  });
}
