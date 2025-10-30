import { createTask } from "@/services/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      toast.success("Task created successfully!");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create task");
      console.error("Create Task Error:", error);
    },
  });
}