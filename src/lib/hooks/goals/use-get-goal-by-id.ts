import { getGoalById } from "@/services/goal";
import { useQuery } from "@tanstack/react-query";

export function useGetGoalById(id?: string, enabled = true) {
  return useQuery({
    queryKey: ["goals", id] as const,
    queryFn: async () => {
      if (!id) throw new Error("Goal id is required");
      const res = await getGoalById(id);
      return res;
    },
    enabled: Boolean(id) && enabled,
  });
}
