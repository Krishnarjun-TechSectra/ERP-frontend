import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDateString } from "@/lib/utils/date-parser";
import {
  TaskPriorityBgColorMap,
  TaskStatusBgColorMap,
} from "@/lib/utils/task-status-color";
import { TaskPriorityEnum, TaskStatusEnum } from "@erp/shared-schema";
import { Calendar, User, Check, FileText, Layers } from "lucide-react";

export const TaskDetailsModal = ({ task, onClose, onComplete }: any) => {
  console.log(task);
  return (
    <Dialog open={!!task} onOpenChange={onClose}>
      <DialogContent className="max-w-md space-y-4">
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
        {task.status === "completed" ? (
          <div className="space-y-2 bg-green-50 p-3 rounded">
            <div className="flex items-center gap-1 text-green-700 font-medium">
              <Check size={16} /> Completed on {task.completedDate}
            </div>
            {task.proof && (
              <div className="mt-2">
                <div className="flex items-center gap-1 font-semibold text-green-700">
                  <FileText size={16} /> Proof of Completion
                </div>
                <p className="text-green-700 text-sm mt-1">{task.proof}</p>
              </div>
            )}
          </div>
        ) : (
          // Mark as Complete
          <div className="space-y-2">
            <h3 className="font-semibold">Mark as Complete</h3>
            <p className="text-sm text-gray-500">Provide proof of completion</p>
            <textarea
              className="w-full border rounded p-2 text-sm"
              placeholder="Describe what you accomplished and provide evidence of completion..."
              onChange={(e) => task.setProof(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-2">
              <Button variant={'outline'} onClick={onClose}>Cancel</Button>
              <Button onClick={() => onComplete(task)}>
                <Check size={14} /> Complete Task
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
