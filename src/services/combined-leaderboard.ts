import { apiClient } from "@/lib/api-client";

export interface CombinedLeaderboardEntry {
  userId: string;
  name: string;
  goalScore: number;
  taskScore: number;
  combinedScore: number;
  completedTasks: number;
  totalTasks: number;
  totalGoals: number;
}

export async function fetchCombinedLeaderboard(): Promise<
  CombinedLeaderboardEntry[]
> {
  return apiClient("/combined-leaderboard", {
    method: "GET",
  });
}
