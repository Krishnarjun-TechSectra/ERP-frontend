import { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Column } from "./task-column";
import { ModalProof } from "./dialogs/modal-proof";
import { TaskDetailsModal } from "./dialogs/task-details.dialog";
import { TaskStatusEnum } from "@erp/shared-schema";
import type { TaskSchemaType } from "@erp/shared-schema";

export default function KanbanBoard({
  tasks,
  isError,
  isLoading,
}: {
  tasks: TaskSchemaType[];
  isError: boolean;
  isLoading: boolean;
}) {
  console.log(tasks);

  const [proofModalTask, setProofModalTask] = useState<any | null>(null);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const fromStatus = tasks.find((t) => t.id === active.id)?.status;
    const toStatus = over.id as any["status"];

    if (fromStatus !== toStatus) {
      const updatedTasks = tasks.map((t) =>
        t.id === active.id ? { ...t, status: toStatus } : t,
      );
      // setTasks(updatedTasks);

      if (toStatus === "completed") {
        const movedTask = tasks.find((t) => t.id === active.id);
        if (movedTask) setProofModalTask(movedTask);
      }
    }
  };

  console.log(TaskStatusEnum);

  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        {tasks ? (
          <div className="grid grid-cols-4 gap-4">
            {Object.values(TaskStatusEnum).map((status) => (
              <Column
                key={status}
                id={status}
                taskStatus={status}
                tasks={tasks?.filter((t) => t.status === status)}
                onTaskClick={(task) => setSelectedTask(task)}
              />
            ))}
          </div>
        ) : (
          <div>No Tasks Were found</div>
        )}
      </DndContext>

      {/* Proof Modal when moved to Completed */}
      {proofModalTask && (
        <ModalProof
          task={proofModalTask}
          onClose={() => setProofModalTask(null)}
        />
      )}

      {/* Task Details Modal when clicked */}
      {selectedTask && (
        <TaskDetailsModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </>
  );
}
