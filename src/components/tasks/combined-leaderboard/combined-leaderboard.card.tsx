// components/CombinedLeaderboardCard.tsx
import React from "react";
import { Trophy, Medal, Award } from "lucide-react";

export interface CombinedLeaderboardItem {
  userId: string;
  name: string;
  goalScore: number; // KPI score 0-100
  taskScore: number; // productivity 0-100
  combinedScore: number;
  completedTasks: number;
  totalTasks: number;
  totalGoals: number;
}

interface CombinedLeaderboardCardProps {
  item: CombinedLeaderboardItem;
  rank: number;
  isNew?: boolean;
}

function getInitials(name?: string) {
  if (!name) return "??";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export default function CombinedLeaderboardCard({
  item,
  rank,
  isNew = false,
}: CombinedLeaderboardCardProps) {
  const getRankIcon = () => {
    switch (rank) {
      case 1:
        return <Trophy className="text-yellow-500 w-6 h-6" />;
      case 2:
        return <Medal className="text-gray-400 w-6 h-6" />;
      case 3:
        return <Award className="text-amber-600 w-6 h-6" />;
      default:
        return (
          <div className="w-8 h-8 flex items-center justify-center font-semibold bg-gray-100 rounded-full text-sm">
            #{rank}
          </div>
        );
    }
  };

  const getCardColor = () => {
    switch (rank) {
      case 1:
        return "bg-yellow-50 border-yellow-200";
      case 2:
        return "bg-gray-50 border-gray-200";
      case 3:
        return "bg-amber-50 border-amber-200";
      default:
        return "bg-white border-gray-100";
    }
  };

  return (
    <div
      className={`flex gap-4 justify-between items-center border rounded-xl p-4 ${getCardColor()}`}
    >
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center gap-2">
          {getRankIcon()}
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-lg font-semibold text-gray-700">
            {getInitials(item.name)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-lg">{item.name}</p>
              {isNew && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                  NEW
                </span>
              )}
            </div>
            <p className="text-gray-500 text-sm">
              {item.completedTasks} tasks completed
            </p>
            <p className="text-gray-400 text-xs mt-1">
              {item.totalGoals} goals • {item.totalTasks} total tasks
            </p>
          </div>
        </div>
      </div>

      {/* Right side: KPI, Productivity, Combined */}
      <div className="flex items-center gap-8">
        <div className="text-right min-w-[90px]">
          <p className="text-sm text-gray-500">Productivity</p>
          <p className="font-bold text-lg">{item.taskScore.toFixed(0)}%</p>
        </div>

        <div className="text-right min-w-[90px]">
          <p className="text-sm text-gray-500">KPI Score</p>
          <p className="font-bold text-lg">{item.goalScore.toFixed(0)}%</p>
        </div>

        <div className="text-right min-w-[100px]">
          <p className="text-sm text-gray-500">Combined</p>
          <p className="font-bold text-2xl">{item.combinedScore.toFixed(0)}%</p>
        </div>
      </div>
    </div>
  );
}
