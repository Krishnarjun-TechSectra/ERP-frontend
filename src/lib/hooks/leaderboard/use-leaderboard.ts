import { useQuery } from "@tanstack/react-query";
import { fetchLeaderboard, LeaderboardEntry } from "@/services/leaderboard";

export function useLeaderboard() {
  return useQuery<LeaderboardEntry[]>({
    queryKey: ["leaderboard"],
    queryFn: fetchLeaderboard,
    staleTime: 1000 * 60, // 1 minute caching
  });
}
