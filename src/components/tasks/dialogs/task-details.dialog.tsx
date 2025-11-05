import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateTask } from "@/lib/hooks/tasks/use-updatetask";
import { formatDateString } from "@/lib/utils/date-parser";
import {
  TaskPriorityBgColorMap,
  TaskStatusBgColorMap,
} from "@/lib/utils/task-status-color";
import { TaskPriorityEnum, TaskStatusEnum } from "@erp/shared-schema";
import { Calendar, User, Check, FileText, Layers, Loader2 } from "lucide-react";
import { useState } from "react";

export const TaskDetailsModal = ({ task, onClose }: any) => {
  const [proofOfCompletion, setProofOfCompletion] = useState<string>("");
  const { mutate: updateTask, isPending } = useUpdateTask();

  const onComplete = () => {
    if (!task) return;
    updateTask({
      id: task.id,
      data: {
        proofOfCompletion: proofOfCompletion,
        status: TaskStatusEnum.COMPLETED,
      },
    });
  };
  return (
    <Dialog open={!!task} onOpenChange={onClose}>
      <DialogContent className="max-w-md space-y-3">
        <DialogHeader>
          <DialogTitle>{task.title}</DialogTitle>
        </DialogHeader>

        {/* Priority and Status */}
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-1 rounded-md text-sm font-medium ${TaskPriorityBgColorMap[task.priority as TaskPriorityEnum]}`}
          >
            {task.priority} priority
          </span>

          <span
            className={`px-2 py-1 rounded-md text-sm ${TaskStatusBgColorMap[task.status as TaskStatusEnum]}`}
          >
            {task.status}
          </span>
        </div>

        {/* KPI */}
        {task.kpi && (
          <div
            className="rounded-md p-3 text-sm flex items-center font-semibold"
            style={{ border: `2px solid ${task.kpi.colorCode}` }}
          >
            <Layers color={task.kpi.colorCode} className="mr-2" />
            KPI: <p style={{ color: task.kpi.colorCode }}>{task.kpi.title}</p>
          </div>
        )}

        {/* Description */}
        {task.description && (
          <div>
            <h3 className="font-semibold">Description</h3>
            <p className="text-sm text-gray-500">{task.description}</p>
          </div>
        )}

        {/* Assigned User and Due Date */}
        <div className="flex gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <User size={14} /> {task.assignedUser.name}
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={14} /> {formatDateString(task.deadline)}
          </div>
        </div>

        {/* Completed Section */}
        {task.status === TaskStatusEnum.COMPLETED ? (
          <div className="space-y-2 bg-green-50 p-3 rounded-md">
          
            {task.proofOfCompletion && (
              <div className="mt-2">
                <div className="flex items-center gap-1 font-semibold text-green-700">
                  <FileText size={16} /> Proof of Completion
                </div>
                <p className="text-green-700 text-sm mt-1">{task.proofOfCompletion}</p>
              </div>
            )}
          </div>
        ) : (
          // Mark as Complete
          <div className="space-y-2">
            <h3 className="font-semibold">Mark as Complete</h3>
            <p className="text-sm text-gray-500">Provide proof of completion</p>
            <Textarea
              placeholder="Describe what you accomplished and provide evidence of completion..."
              value={proofOfCompletion}
              onChange={(e) => setProofOfCompletion(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-2">
              <Button
                variant={"outline"}
                onClick={onClose}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button onClick={() => onComplete()} disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isPending ? (
                  "Updating..."
                ) : (
                  <>
                    <Check size={14} /> Complete Task
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
