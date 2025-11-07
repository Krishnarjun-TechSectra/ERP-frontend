import { useDroppable } from "@dnd-kit/core";
import { TaskCard } from "./cards/task-board-column.card";
import { TaskStatusEnum } from "@erp/shared-schema";
import { TaskStatusBgColorMap } from "@/lib/utils/task-status-color";

interface ColumnProps {
  id: string;
  tasks: any[];
  taskStatus: TaskStatusEnum;
  onTaskClick: (task: any) => void;
}

export const Column = ({ id, tasks, onTaskClick, taskStatus }: ColumnProps) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`p-6 rounded-xl shadow-md border border-gray-200 transition-colors duration-200 ${TaskStatusBgColorMap[taskStatus]} ring-gray-200 ring-1`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-gray-900">{taskStatus}</h2>
        <span className="bg-gray-100 text-gray-800 font-medium rounded-full px-2 py-0.5 text-sm">
          {tasks.length}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onClick={onTaskClick} />
        ))}
        {tasks.length === 0 && (
          <p className="text-sm text-gray-400 text-center">No tasks</p>
        )}
      </div>
    </div>
  );
};
