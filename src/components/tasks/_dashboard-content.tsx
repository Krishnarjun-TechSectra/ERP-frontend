"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  CircleCheckBig,
  Clock,
  Loader2,
  Target,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";

import TaskManagerLayout from "@/app/task-manager/shared-layout";
import TaskMetricsCard from "@/components/tasks/cards/metrics.card";
import TeamLeaderBoard from "@/components/tasks/team-leaderboard";
import OverdueTasks from "@/components/tasks/overdue-tasks";
import TaskFilter from "./task-filter";

import {
  TaskFilterDtoType,
  TaskStatusEnum,
  ViewTypeEnum,
} from "@erp/shared-schema";
import { useGetTasks } from "@/lib/hooks/tasks/use-gettask.";
import { useAuth } from "../../../context/auth-context";

const TaskDashboardPage = () => {
  const { user } = useAuth();
  const [filters, setFilters] = useState<TaskFilterDtoType | null>(null);
  const [initialized, setInitialized] = useState(false);

  const isAdmin = user?.user_metadata?.role === "Admin";

  // ✔ Set filters ONLY when user loads, NOT on SSR
  useEffect(() => {
    if (!user || initialized) return;

    setFilters({
      viewType: ViewTypeEnum.DAILY,
      selectedDate: new Date().toLocaleDateString("sv-SE"),
      assignedUserId: user.id,
    });

    setInitialized(true);
  }, [user, initialized]);

  // Fetch tasks once filters exist
  const { data: tasks = [], isLoading, isError } = useGetTasks(filters ?? {});

  const handleFilterChange = (newFilters: TaskFilterDtoType) => {
    setFilters(newFilters);
  };

  // -------- Metrics (safe even if tasks empty) --------
  const { tasksCompleted, tasksPending, tasksOverdue } = useMemo(() => {
    if (!Array.isArray(tasks)) {
      return { tasksCompleted: [], tasksPending: [], tasksOverdue: [] };
    }

    return {
      tasksCompleted: tasks.filter(
        (t) => t.status === TaskStatusEnum.COMPLETED,
      ),
      tasksPending: tasks.filter(
        (t) => t.status === TaskStatusEnum.IN_PROGRESS,
      ),
      tasksOverdue: tasks.filter((t) => t.status === TaskStatusEnum.OVERDUE),
    };
  }, [tasks]);

  return (
    <TaskManagerLayout>
      {/* Header always SSR-safe */}
      <div className="space-y-3 mb-4">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
          Team Dashboard
        </h1>
        <p className="text-gray-600">
          Track productivity and task completion metrics
        </p>
      </div>

      {/* Render Filter ONLY once user & filters exist */}
      {user && filters ? (
        <TaskFilter
          showDate
          showUser={user.user_metadata.role === "admin"}
          onFilterChange={handleFilterChange}
          initialFilters={filters}
        />
      ) : (
        <div className="text-gray-500 mb-4">Loading filters...</div>
      )}

      {/* Loading & Error states */}
      {isLoading || !filters ? (
        <div className="flex flex-col justify-center items-center py-8 text-gray-600">
          <Loader2 className="h-6 w-6 animate-spin mb-2" />
          <span>Loading dashboard...</span>
        </div>
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
              description="Completed tasks"
            />
            <TaskMetricsCard
              title="Tasks Pending"
              count={tasksPending.length}
              icon={<Clock size={18} />}
              borderColor="border-blue-300"
              description="In-progress tasks"
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

          {/* Leaderboard + Overdue Tasks */}
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
