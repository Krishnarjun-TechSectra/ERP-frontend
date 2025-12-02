import { Card } from "@/components/ui/card";
import Error from "@/components/ui/error-card";
import { Loading } from "@/components/ui/loading-card";
import NoDataFound from "@/components/ui/no-data-found-card";
import { GoalType } from "@erp/shared-schema";
import React from "react";
import GoalCard from "./goal.card";

const GoalsBoard = ({
  goals,
  isLoading,
  isError,
  isAdmin
}: {
  goals: GoalType[];
  isError: boolean;
  isLoading: boolean;
  isAdmin: boolean
}) => {
  return (
    <div className="p-4 border border-gray-300 rounded-xl">
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <Error />
      ) : goals && goals.length > 0 ? (
        <div className="space-y-4">
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              isAdmin={isAdmin}
            />
          ))}
        </div>
      ) : (
        <NoDataFound
          shortText="No Goals Yet!"
          longText="There is no Goals to show"
        />
      )}
    </div>
  );
};

export default GoalsBoard;
