import { getGoals } from "@/services/goal";
import { GoalFilterDtoType } from "@erp/shared-schema";
import { useQuery } from "@tanstack/react-query";

export function useGetGoals(filters?: GoalFilterDtoType, enabled = true) {
  return useQuery({
    queryKey: ["goals", filters] as const,
    queryFn: async () => {
      const res = await getGoals(filters);
      return res;
    },
    staleTime: 1000 * 60 * 2,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
