"use client";

import { formatDateString } from "@/lib/utils/date-parser";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CalendarIcon } from "lucide-react";

type Task = {
  name: string;
  date: string;
};

type TaskBoardColumnProps = {
  title: string;
  columnId: string;
  tasks: Task[];
  bgColor?: string;
};

// Each draggable task
function SortableTask({ task, columnId }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: `${columnId}-${task.name}`,
      data: { task, columnId },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white rounded-xl shadow-sm px-4 py-6 flex flex-col border hover:scale-[1.02] transition-transform duration-200 cursor-grab"
    >
      <p className="font-medium text-gray-900">{task.title}</p>
      <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
        <CalendarIcon className="w-4 h-4" />
        <span>{formatDateString(task.deadline)}</span>
      </div>
    </div>
  );
}

export default function TaskBoardColumn({
  title,
  columnId,
  tasks,
  bgColor = "bg-green-50",
}: TaskBoardColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: columnId,
    data: { columnId },
  });

  return (
    <div
      ref={setNodeRef}
      className={`p-6 rounded-xl shadow-md border border-gray-200 transition-colors duration-200 ${
        isOver ? "ring-2 ring-blue-400" : ""
      } ${bgColor}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-gray-900">{title}</h2>
        <span className="bg-gray-100 text-gray-800 font-medium rounded-full px-2 py-0.5 text-sm">
          {tasks.length}
        </span>
      </div>

      {/* Sortable List of Tasks */}
      <SortableContext
        id={columnId}
        items={tasks.map((t) => `${columnId}-${t.name}`)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-3 min-h-[120px]">
          {tasks.length === 0 ? (
            <div className="flex justify-center items-center text-sm text-gray-600 py-6">
              No tasks
            </div>
          ) : (
            tasks.map((task, i:number) => (
              <SortableTask
                key={i}
                task={task}
                columnId={columnId}
              />
            ))
          )}
        </div>
      </SortableContext>
    </div>
  );
}
