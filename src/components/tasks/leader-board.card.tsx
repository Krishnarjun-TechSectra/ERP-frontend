import { Trophy, Medal, Award } from "lucide-react";

interface LeaderboardCardProps {
  name: string;
  tasksCompleted: number;
  productivity: number;
  rank: number;
  isNew?: boolean;
}

export default function LeaderboardCard({
  name,
  tasksCompleted,
  productivity,
  rank,
  isNew = false,
}: LeaderboardCardProps) {
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
          <div className="w-6 h-6 flex items-center justify-center font-semibold bg-gray-200 px-4 py-4 rounded-full">
            {rank}
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
      className={`flex justify-between items-center border rounded-xl p-4 ${getCardColor()} `}
    >
      <div className="flex items-center gap-3">
        {getRankIcon()}
        <div>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-lg">{name}</p>
            {isNew && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                New
              </span>
            )}
          </div>
          <p className="text-gray-500 text-sm">
            {tasksCompleted} tasks completed
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-lg">{productivity}%</p>
        <p className="text-gray-500 text-sm">productivity</p>
      </div>
    </div>
  );
}
