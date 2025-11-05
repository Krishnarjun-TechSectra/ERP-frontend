"use client";

import React from "react";
import { Trophy } from "lucide-react";
import LeaderboardCard from "./cards/leader-board.card";
import { useLeaderboard } from "@/lib/hooks/leaderboard/use-leaderboard";
import { LeaderboardEntry } from "@/services/leaderboard";

const TeamLeaderBoard = () => {
  const { data, isLoading, error } = useLeaderboard();

  if (isLoading) {
    return (
      <div className="border border-gray-200 p-4 md:p-6 rounded-xl">
        <h3 className="mb-4 flex items-center">
          <Trophy className="mr-2" />
          <span className="text-lg md:text-xl font-bold">Team Leaderboard</span>
        </h3>
        <p className="text-gray-500 text-sm">Loading leaderboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-gray-200 p-4 md:p-6 rounded-xl">
        <h3 className="mb-4 flex items-center">
          <Trophy className="mr-2" />
          <span className="text-lg md:text-xl font-bold">Team Leaderboard</span>
        </h3>
        <p className="text-red-500 text-sm">Failed to load leaderboard.</p>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 p-4 md:p-6 rounded-xl">
      <h3 className="mb-4 flex items-center">
        <Trophy className="mr-2" />
        <span className="text-lg md:text-xl font-bold">Team Leaderboard</span>
      </h3>

      <div className="flex flex-col gap-3">
        {data?.map((user: LeaderboardEntry, index: number) => (
          <LeaderboardCard
            key={user.userId || index}
            name={user.name}
            tasksCompleted={user.totalCompleted}
            productivity={user.completionRate}
            rank={index + 1}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamLeaderBoard;
