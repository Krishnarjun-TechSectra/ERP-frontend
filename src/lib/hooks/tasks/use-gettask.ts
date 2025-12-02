import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/services/tasks";
import { TaskFilterDtoType } from "@erp/shared-schema";

export function useGetTasks(filters?: TaskFilterDtoType) {
  return useQuery<any, Error>({
    queryKey: ["tasks", filters],
    queryFn: () => getTasks(filters),
    staleTime: 1000 * 60 * 2,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
