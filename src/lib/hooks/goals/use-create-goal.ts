import { createGoal } from "@/services/goal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useCreateGoal() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createGoal  ,
    onSuccess: () => {
      toast.success('Goal created successfully!');
      qc.invalidateQueries({ queryKey: ['goals'] });
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to create goal');
      console.error('Create Goal Error:', error);
    },
  });
}
