import { deleteGoal } from "@/services/goal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useDeleteGoal() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteGoal(id);
      return res;
    },
    onSuccess: (_data, id) => {
      toast.success("Goal deleted successfully!");
      qc.invalidateQueries({ queryKey: ["goals"] });
      if (id) qc.invalidateQueries({ queryKey: ["goals", id] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to delete goal");
      console.error("Delete Goal Error:", error);
    },
  });
}
