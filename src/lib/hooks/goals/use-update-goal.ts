import { updateGoal } from "@/services/goal";
import { UpdateGoalDtoType } from "@erp/shared-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useUpdateGoal() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateGoalDtoType;
    }) => {
      const res = await updateGoal(id, data);
      return res;
    },
    onSuccess: (_data, variables) => {
      toast.success("Goal updated successfully!");
      // invalidate the list and the specific goal
      qc.invalidateQueries({ queryKey: ["goals"] });
      if (variables?.id) {
        qc.invalidateQueries({ queryKey: ["goals", variables.id] });
      }
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to update goal");
      console.error("Update Goal Error:", error);
    },
  });
}
