// use_update_kpi.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateKpi } from "@/services/kpi";

export function useUpdateKpi() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateKpi(id, data),
    onSuccess: () => {
      toast.success("KPI updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["kpis"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update KPI");
      console.error("Update KPI Error:", error);
    },
  });
}
