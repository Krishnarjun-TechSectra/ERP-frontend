import { getTaskById } from "@/services/tasks";
import { useQuery } from "@tanstack/react-query";

export function useGetTaskById(id: string) {
  return useQuery({
    queryKey: ["task", id],
    queryFn: () => getTaskById(id),
    enabled: !!id,
  });
}
