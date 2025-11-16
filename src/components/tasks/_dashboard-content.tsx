"use client";
import React, { useState, useMemo } from "react";
import {
  CircleCheckBig,
  Clock,
  Target,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";

import TaskManagerLayout from "@/app/task-manager/shared-layout";
import TaskMetricsCard from "@/components/tasks/cards/metrics.card";
import TeamLeaderBoard from "@/components/tasks/team-leaderboard";
import OverdueTasks from "@/components/tasks/overdue-tasks";
import TaskFilter from "./task-filter";

import { TaskFilterDtoType, TaskStatusEnum } from "@erp/shared-schema";
import { useGetTasks } from "@/lib/hooks/tasks/use-gettask.";

const TaskDashboardPage = () => {
  const [filters, setFilters] = useState<TaskFilterDtoType>({});
  const { data: tasks = [], isLoading, isError } = useGetTasks(filters);

  const { tasksCompleted, tasksPending, tasksOverdue } = useMemo(() => {
    if (!tasks || !Array.isArray(tasks)) {
      return { tasksCompleted: [], tasksPending: [], tasksOverdue: [] };
    }

    const completed = tasks.filter(
      (t) => t.status === TaskStatusEnum.COMPLETED,
    );
    const pending = tasks.filter(
      (t) => t.status === TaskStatusEnum.IN_PROGRESS,
    );
    const overdue = tasks.filter((t) => t.status === TaskStatusEnum.OVERDUE);

    return {
      tasksCompleted: completed,
      tasksPending: pending,
      tasksOverdue: overdue,
    };
  }, [tasks]);

  const handleFilterChange = (newFilters: TaskFilterDtoType) => {
    setFilters(newFilters);
  };

  return (
    <TaskManagerLayout>
      <div className="space-y-3 mb-4">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
          Team Dashboard
        </h1>
        <p className="text-gray-600">
          Track productivity and task completion metrics
        </p>
      </div>

      {/* Filters */}
      <TaskFilter
        showDate
        showUser
        onFilterChange={handleFilterChange}
        initialFilters={filters}
      />

      {/* Loading & Error States */}
      {isLoading ? (
        <div className="text-center py-8 text-gray-500">Loading tasks...</div>
      ) : isError ? (
        <div className="text-center py-8 text-red-500">
          Failed to load tasks. Please try again.
        </div>
      ) : (
        <>
          {/* Task Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
            <TaskMetricsCard
              title="Tasks Assigned"
              count={tasks.length}
              icon={<Target size={18} />}
              borderColor="border-gray-300"
              description="Total tasks assigned"
            />
            <TaskMetricsCard
              title="Tasks Completed"
              count={tasksCompleted.length}
              icon={<CircleCheckBig size={18} />}
              borderColor="border-green-300"
              description="Successfully completed"
            />
            <TaskMetricsCard
              title="Tasks Pending"
              count={tasksPending.length}
              icon={<Clock size={18} />}
              borderColor="border-blue-300"
              description="Still in progress"
            />
            <TaskMetricsCard
              title="Tasks Overdue"
              count={tasksOverdue.length}
              icon={<TriangleAlert size={18} />}
              borderColor="border-red-300"
              description="Past deadline"
            />
            <TaskMetricsCard
              title="Productivity Score"
              count={
                tasks.length > 0
                  ? Number(
                      ((tasksCompleted.length / tasks.length) * 100).toFixed(1),
                    )
                  : 0
              }
              icon={<TrendingUp size={18} />}
              borderColor="border-purple-300"
              description="Completion rate (%)"
            />
          </div>

          {/* Other components */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TeamLeaderBoard />
            <OverdueTasks tasksOverdue={tasksOverdue} />
          </div>
        </>
      )}
    </TaskManagerLayout>
  );
};

export default TaskDashboardPage;
