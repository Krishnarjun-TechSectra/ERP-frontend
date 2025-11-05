"use client";

import {
  DndContext,
  DragEndEvent,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useEffect, useMemo, useState } from "react";
import TaskBoardCard from "./cards/task-board-column.card";

export default function TaskBoard({ tasks: allTasks, isLoading, isError }: any) {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    if (allTasks) setTasks(allTasks);
  }, [allTasks]);

  const sensors = useSensors(useSensor(PointerSensor));

  // ✅ Group tasks by status (auto derived from backend array)
  const groupedTasks = useMemo(() => {
    const groups: Record<string, any[]> = {
      todo: [],
      inprogress: [],
      completed: [],
      overdue: [],
    };

    tasks?.forEach((task) => {
      const now = new Date();
      const deadline = new Date(task.deadline);

      if (task.status === "to_do") groups.todo.push(task);
      else if (task.status === "in_progress") groups.inprogress.push(task);
      else if (task.status === "completed") groups.completed.push(task);
      else if (deadline < now && task.status !== "completed")
        groups.overdue.push(task);
      else groups.todo.push(task);
    });

    return groups;
  }, [tasks]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const fromColumn = active.data.current?.columnId;
    const toColumn = over.data.current?.columnId;

    if (!fromColumn || !toColumn) return;

    const activeTask = active.data.current?.task;

    // Same column reorder
    if (fromColumn === toColumn) {
      const updated = { ...groupedTasks };
      const items = [...updated[fromColumn]];

      const oldIndex = items.findIndex((t) => t.id === activeTask.id);
      const newIndex = items.findIndex(
        (t) => t.id === over.data.current?.task?.id
      );

      if (oldIndex !== -1 && newIndex !== -1) {
        updated[fromColumn] = arrayMove(items, oldIndex, newIndex);
        setTasks(Object.values(updated).flat());
      }
      return;
    }

    // Move to another column
    const updated = { ...groupedTasks };
    const source = [...updated[fromColumn]];
    const dest = [...updated[toColumn]];

    const idx = source.findIndex((t) => t.id === activeTask.id);
    const [moved] = source.splice(idx, 1);

    // 🟢 update task’s status locally
    moved.status =
      toColumn === "todo"
        ? "to_do"
        : toColumn === "inprogress"
        ? "in_progress"
        : toColumn === "completed"
        ? "completed"
        : moved.status;

    dest.push(moved);

    updated[fromColumn] = source;
    updated[toColumn] = dest;

    // flatten grouped structure back into array
    setTasks(Object.values(updated).flat());
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40 text-gray-500">
        Loading tasks...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-40 text-red-500">
        Failed to load tasks.
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <TaskBoardCard
          title="To Do"
          columnId="todo"
          tasks={groupedTasks.todo}
          bgColor="bg-gray-100"
        />
        <TaskBoardCard
          title="In Progress"
          columnId="inprogress"
          tasks={groupedTasks.inprogress}
          bgColor="bg-blue-50"
        />
        <TaskBoardCard
          title="Completed"
          columnId="completed"
          tasks={groupedTasks.completed}
          bgColor="bg-green-50"
        />
        <TaskBoardCard
          title="Overdue"
          columnId="overdue"
          tasks={groupedTasks.overdue}
          bgColor="bg-red-50"
        />
      </div>
    </DndContext>
  );
}
