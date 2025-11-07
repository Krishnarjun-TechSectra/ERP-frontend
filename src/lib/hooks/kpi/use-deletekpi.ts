// use_delete_kpi.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteKpi } from "@/services/kpi";

export function useDeleteKpi() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteKpi,
    onSuccess: () => {
      toast.success("KPI deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["kpis"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete KPI");
      console.error("Delete KPI Error:", error);
    },
  });
}
