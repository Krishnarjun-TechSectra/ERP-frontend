import TaskManagerLayout from "@/app/task-manager/shared-layout";
import React, { useEffect, useState } from "react";
import CreateGoalDialog from "../dialogs/create-goal.dialog";
import GoalFilter from "./goal-filter";
import { GoalFilterDtoType, ViewTypeEnum } from "@erp/shared-schema";
import { useAuth } from "../../../../context/auth-context";
import { useGetGoals } from "@/lib/hooks/goals/use-get-goals";
import GoalsBoard from "./goals.board";

const GoalPageComponent = () => {
  const [filters, setFilters] = useState<GoalFilterDtoType | null>(null);
  const { user } = useAuth();
  const { data: goals, isLoading, isError } = useGetGoals(filters ?? {});
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!user || initialized) return;

    const isAdmin = user.user_metadata.role === "Admin";

    const defaultFilters: GoalFilterDtoType = {
      viewType: ViewTypeEnum.DAILY,
      selectedDate: new Date().toLocaleDateString("sv-SE"),
      assignedUserId: isAdmin ? user.id : user.id,
    };

    setFilters(defaultFilters);
    setInitialized(true);
  }, [user, initialized]);

  const handleFilterChange = (newFilters: GoalFilterDtoType) => {
    setFilters(newFilters);
  };
  if (!user || !filters) return <div>Loading Goals...</div>;
  return (
    <TaskManagerLayout>
      <div className="space-y-3 mb-4 flex justify-between gap-6">
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">Goal</h1>
          <p className="text-gray-600">
            Track and manage your goals and progress
          </p>
        </div>
        {user.user_metadata.role === "admin" && <CreateGoalDialog />}
      </div>
      <GoalFilter
        showDate
        showUser={user.user_metadata.role === "admin"}
        onFilterChange={handleFilterChange}
        initialFilters={filters}
      />
      <GoalsBoard
        goals={goals}
        isError={isError}
        isLoading={isLoading}
        isAdmin={user.user_metadata.role === "admin"}
      />
    </TaskManagerLayout>
  );
};

export default GoalPageComponent;
