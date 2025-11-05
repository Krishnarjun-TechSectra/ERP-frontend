import { apiClient } from "@/lib/api-client";

export interface LeaderboardEntry {
  userId: string;
  name: string;
  totalAssigned: number;
  totalCompleted: number;
  completionRate: number;
}

export async function fetchLeaderboard(): Promise<LeaderboardEntry[]> {
  return apiClient("/leaderboard", {
    method: "GET",
  });
}

export async function getOverdueTasks() {
  return apiClient("/task/overdue", {
    method: "GET",
  });
}
