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
import { useState } from "react";
import TaskBoardCard from "./task-board.card";

export default function TaskBoard({ initialTasks }: any) {
  const [tasks, setTasks] = useState(initialTasks);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const fromColumn = active.data.current?.columnId;
    const toColumn = over.data.current?.columnId;

    if (!fromColumn || !toColumn) return;

    const activeTask = active.data.current?.task;

    // Reorder within same column
    if (fromColumn === toColumn) {
      setTasks((prev: any) => {
        const updated = { ...prev };
        const columnTasks = [...updated[fromColumn]];

        const oldIndex = columnTasks.findIndex(
          (t) => t.name === activeTask.name
        );
        const newIndex = columnTasks.findIndex(
          (t) => t.name === over.data.current?.task?.name
        );

        if (oldIndex !== -1 && newIndex !== -1) {
          updated[fromColumn] = arrayMove(columnTasks, oldIndex, newIndex);
        }

        return updated;
      });
      return;
    }

    // Move across columns
    setTasks((prev: any) => {
      const updated = { ...prev };
      const source = [...updated[fromColumn]];
      const dest = [...updated[toColumn]];

      const idx = source.findIndex((t) => t.name === activeTask.name);
      const [moved] = source.splice(idx, 1);
      dest.push(moved);

      updated[fromColumn] = source;
      updated[toColumn] = dest;

      return updated;
    });
  };

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
          tasks={tasks.todo}
          bgColor="bg-gray-100"
        />
        <TaskBoardCard
          title="In Progress"
          columnId="inprogress"
          tasks={tasks.inprogress}
          bgColor="bg-blue-50"
        />
        <TaskBoardCard
          title="Completed"
          columnId="completed"
          tasks={tasks.completed}
          bgColor="bg-green-50"
        />
        <TaskBoardCard
          title="Overdue"
          columnId="overdue"
          tasks={tasks.overdue}
          bgColor="bg-red-50"
        />
      </div>
    </DndContext>
  );
}
