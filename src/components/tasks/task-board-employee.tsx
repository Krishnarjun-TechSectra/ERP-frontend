import TaskFilter from "./task-filter";
import { TaskFilterDtoType, ViewTypeEnum } from "@erp/shared-schema/";
import { useGetTasks } from "@/lib/hooks/tasks/use-gettask.";
import { useEffect, useState } from "react";
import CreateTaskDialog from "./dialogs/create-task-dialog";
import KanbanBoard from "./task-status-dnd";
import CreateKpiDialog from "./dialogs/create-kpi-dialog";
import { useAuth } from "../../../context/auth-context";
import KpiScoreDialog from "./dialogs/kpi-score-tracker-dialog";

export const TaskBoardEmployee = () => {
  const { user } = useAuth();

  // 🚀 filters will be set only after user is loaded
  const [filters, setFilters] = useState<TaskFilterDtoType | null>(null);

  // 🛡 prevents multiple re-renders due to user reloads
  const [initialized, setInitialized] = useState(false);

  // ========== Initialize Filters WHEN user loads ==========
  useEffect(() => {
    if (!user || initialized) return;

    const isAdmin = user.user_metadata.role === "Admin";

    const defaultFilters: TaskFilterDtoType = {
      viewType: ViewTypeEnum.DAILY,
      selectedDate: new Date().toLocaleDateString("sv-SE"), // yyyy-mm-dd
      assignedUserId: isAdmin ? user.id : user.id, // admin sees own tasks by default
    };

    setFilters(defaultFilters);
    setInitialized(true);
  }, [user, initialized]);

  const { data: tasks, isLoading, isError } = useGetTasks(filters ?? {});

  const handleFilterChange = (newFilters: TaskFilterDtoType) => {
    setFilters(newFilters);
  };

  // ⏳ Wait for user + filters to initialize
  if (!user || !filters) return <div>Loading task board...</div>;

  console.log(user);

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Task Board</h1>
          <p className="text-gray-600">Manage and track your tasks easily</p>
        </div>
        <div className="flex gap-2">
          <KpiScoreDialog />
          <CreateKpiDialog />
          <CreateTaskDialog />
        </div>
      </div>

      {/* Filter */}
      <TaskFilter
        showDate
        showUser={user.user_metadata.role === "admin"} // admin only
        onFilterChange={handleFilterChange}
        initialFilters={filters}
      />

      {/* Kanban */}
      <KanbanBoard tasks={tasks} isError={isError} isLoading={isLoading} />
    </>
  );
};
