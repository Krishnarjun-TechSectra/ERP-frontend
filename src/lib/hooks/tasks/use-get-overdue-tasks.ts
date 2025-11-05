import { getOverdueTasks } from "@/services/leaderboard";
import { useQuery } from "@tanstack/react-query";

export function useGetOverdueTasks() {
  return useQuery<any, Error>({
    queryKey: ["tasks"],
    queryFn: () => getOverdueTasks(),
    staleTime: 1000 * 60 * 2,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
