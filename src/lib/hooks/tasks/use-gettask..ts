import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/services/tasks";
import { TaskFilterDTO } from "@erp/shared-schema";

export function useGetTasks(filters?: TaskFilterDTO) {
  return useQuery<any, Error>({
    queryKey: ["tasks", filters],
    queryFn: () => getTasks(filters),
    staleTime: 1000 * 60 * 2,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
