import React from "react";
import TaskCard from "./cards/overdue-task.card";
import { TaskSchemaType } from "@erp/shared-schema";
import { useGetOverdueTasks } from "@/lib/hooks/tasks/use-get-overduetasks";

const OverdueTasks = () => {
  const { data: tasksOverdue = [], isLoading: kpiLoading } =
    useGetOverdueTasks();

  return (
    <div className="rounded-xl border border-gray-200 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-bold text-foreground">Overdue Tasks</h1>
        <div className=" font-semibold bg-gray-200 text-sm rounded-full px-2.5 py-1">
          {tasksOverdue?.length}
        </div>
      </div>

      {/* Scrollable Cards Section */}
      <div className="space-y-4 max-h-[400px] overflow-y-auto scrollbar-overlay">
        {tasksOverdue?.length !== 0 &&
          tasksOverdue?.map((task: any) => (
            <TaskCard key={task.id} task={task} />
          ))}
      </div>
    </div>
  );
};

export default OverdueTasks;
