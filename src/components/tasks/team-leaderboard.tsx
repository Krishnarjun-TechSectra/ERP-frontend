import { Trophy } from "lucide-react";
import React from "react";
import LeaderboardCard from "./cards/leader-board.card";

const data = [
  { name: "Kabir Dey", tasksCompleted: 0, productivity: 0, rank: 1 },
  { name: "Ankita Kumar", tasksCompleted: 0, productivity: 0, rank: 2 },
  { name: "Sanjay Singh", tasksCompleted: 0, productivity: 0, rank: 3 },
];

const TeamLeaderBoard = () => {
  return (
    <div className="border border-gray-200 p-4 md:p-6 rounded-xl ">
      <h3 className="mb-4 flex items-center ">
        <Trophy className="mr-2" />
        <span className="text-lg md:text-xl font-bold">Team Leaderboard</span>
      </h3>
      <div className="flex flex-col gap-3">
        {data.map((user) => (
          <LeaderboardCard key={user.rank} {...user} />
        ))}
      </div>
    </div>
  );
};

export default TeamLeaderBoard;
