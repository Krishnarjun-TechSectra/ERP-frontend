import { useState } from "react";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { Column } from "./task-column";
import { ModalProof } from "./dialogs/modal-proof";
import { TaskDetailsModal } from "./dialogs/task-details.dialog";
import { TaskStatusEnum } from "@erp/shared-schema";
// import type { TaskSchema } from "@erp/shared-schema";
import NoDataFound from "../ui/no-data-found-card";
import Error from "../ui/error-card";
import { Loading } from "../ui/loading-card";
import { useUpdateTask } from "@/lib/hooks/tasks/use-updatetask";

export default function KanbanBoard({
  tasks,
  isError,
  isLoading,
}: {
  tasks: any[];
  isError: boolean;
  isLoading: boolean;
}) {
  const [proofModalTask, setProofModalTask] = useState<any | null>(null);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);

  const {
    mutate: updateTask,
    isError: isUpdateError,
    isPending: isUpdatePending,
  } = useUpdateTask();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find((t) => t.id === active.id);
    if (!activeTask) return;

    const fromStatus = activeTask.status;
    const toStatus = over.id as TaskStatusEnum;

    // 🚫 If dropped in the same column, do nothing
    if (fromStatus === toStatus) return;

    // ✅ If moved *to* COMPLETED — open proof modal instead of updating immediately
    if (toStatus === TaskStatusEnum.COMPLETED) {
      setProofModalTask({ ...activeTask, status: toStatus });
      return;
    }

    // ✅ If moved *from* COMPLETED to another column — remove proof
    if (
      fromStatus === TaskStatusEnum.COMPLETED &&
      (toStatus as TaskStatusEnum) !== TaskStatusEnum.COMPLETED
    ) {
      updateTask({
        id: activeTask.id,
        data: {
          status: toStatus,
          proofOfCompletion: null, // remove proof when leaving completed
        },
      });
      return;
    }

    // 🔵 For all other moves (normal status change)
    updateTask({
      id: activeTask.id,
      data: { status: toStatus },
    });
  };

  // ✅ Called when user confirms proof submission in the modal
  const handleConfirmProof = (task: any, proofText: string) => {
    updateTask({
      id: task.id,
      data: {
        status: TaskStatusEnum.COMPLETED,
        proofOfCompletion: proofText, // store entered proof
      },
    });
    setProofModalTask(null);
  };

  return (
    <div className="relative">
      {/* 🌀 Transparent overlay during task update */}
      {isUpdatePending && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-[2px] rounded-xl">
          <div className="flex flex-col items-center gap-3 animate-fade-in">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            <span className="text-sm font-medium text-gray-700 drop-shadow-sm">
              Updating task...
            </span>
          </div>
        </div>
      )}

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <Error />
        ) : tasks && tasks.length > 0 ? (
          <div className="grid grid-cols-4 gap-4 transition-all duration-300">
            {Object.values(TaskStatusEnum).map((status) => (
              <Column
                key={status}
                id={status}
                taskStatus={status}
                tasks={tasks.filter((t) => t.status === status)}
                onTaskClick={(task) => setSelectedTask(task)}
              />
            ))}
          </div>
        ) : (
          <NoDataFound />
        )}
      </DndContext>

      {/* ✅ Proof Modal — confirm before completing */}
      {proofModalTask && (
        <ModalProof
          task={proofModalTask}
          onConfirm={(proofText) =>
            handleConfirmProof(proofModalTask, proofText)
          }
          onClose={() => setProofModalTask(null)}
        />
      )}

      {/* Task Details Modal */}
      {selectedTask && (
        <TaskDetailsModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}

      {/* Error feedback */}
      {isUpdateError && (
        <div className="fixed bottom-4 right-4 bg-red-500/90 text-white px-4 py-2 rounded-md shadow-md animate-fade-in">
          Failed to update task status.
        </div>
      )}
    </div>
  );
}
