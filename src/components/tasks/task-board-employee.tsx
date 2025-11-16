import TaskFilter from "./task-filter";
import { TaskFilterDtoType } from "@erp/shared-schema/";
import { useGetTasks } from "@/lib/hooks/tasks/use-gettask.";
import { useState } from "react";
import TaskManagerLayout from "@/app/task-manager/shared-layout";
import { Button } from "../ui/button";
import { RotateCcw } from "lucide-react";
import CreateTaskDialog from "./dialogs/create-task-dialog";
import KanbanBoard from "./task-status-dnd";
import CreateKpiDialog from "./dialogs/create-kpi-dialog";

export const TaskBoardEmployee = () => {
  const [filters, setFilters] = useState<TaskFilterDtoType>({});
  const { data: tasks, isLoading, isError, refetch } = useGetTasks(filters);

  const handleFilterChange = (newFilters: TaskFilterDtoType) => {
    setFilters(newFilters);
    // optional: push filters to URL or trigger API calls
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Task Board</h1>
          <p className="text-gray-600">Manage and track your tasks easily</p>
        </div>
        <div className="flex gap-2">
          <CreateKpiDialog />
          <CreateTaskDialog />
        </div>
      </div>

      {/* ✅ Modular Filter */}
      <TaskFilter
        showDate
        onFilterChange={handleFilterChange}
        initialFilters={filters}
      />

      {/* Kanban */}
      <KanbanBoard tasks={tasks} isError={isError} isLoading={isLoading} />
    </>
  );
};
