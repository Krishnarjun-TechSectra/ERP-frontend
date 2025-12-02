"use client";

import React from "react";
import { Trophy } from "lucide-react";
import { useLeaderboard } from "@/lib/hooks/leaderboard/use-leaderboard";
import { LeaderboardEntry } from "@/services/leaderboard";
import { Loading } from "@/components/ui/loading-card";
import Error from "@/components/ui/error-card";
import { useCombinedLeaderboard } from "@/lib/hooks/combined-leaderboard/use-get-combined-leaderboard";
import { CombinedLeaderboardEntry } from "@/services/combined-leaderboard";
import CombinedLeaderboardCard from "./combined-leaderboard.card";

const CombinedLeaderBoard = () => {
  const { data, isLoading, isError } = useCombinedLeaderboard();

  return (
    <div className="border border-gray-200 p-4 md:p-6 rounded-xl">
      <h3 className="mb-4 flex items-center">
        <Trophy className="mr-2" />
        <span className="text-lg md:text-xl font-bold">
          Combined Leaderboard
        </span>
      </h3>

      {isLoading ? (
        <Loading />
      ) : isError ? (
        <Error />
      ) : (
        <div className="flex flex-col gap-3">
          {data?.map((user: CombinedLeaderboardEntry, index: number) => (
            <CombinedLeaderboardCard
              key={user.userId || index}
              item={user}
              rank={index + 1}
              isNew={
                index >= 3 && user.totalTasks === 0 && user.totalGoals === 0
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CombinedLeaderBoard;
