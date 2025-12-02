import { useQuery } from "@tanstack/react-query";
import { CombinedLeaderboardEntry, fetchCombinedLeaderboard } from "@/services/combined-leaderboard";

export function useCombinedLeaderboard() {
  return useQuery<CombinedLeaderboardEntry[]>({
    queryKey: ["combined-leaderboard"],
    queryFn: fetchCombinedLeaderboard,
    staleTime: 1000 * 60, 
  });
}
