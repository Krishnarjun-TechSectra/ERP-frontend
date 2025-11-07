import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatDateString } from "@/lib/utils/date-parser";
import { CalendarDays, CalendarIcon, User } from "lucide-react";
import React from "react";

const TaskCard = (task: any) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="bg-white rounded-xl shadow-sm px-4 py-6 flex flex-col border hover:scale-[1.02] transition-transform duration-200 cursor-grab">
          <p className="font-medium text-gray-900">{task.title}</p>
          <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
            <CalendarIcon className="w-4 h-4" />
            <span>{formatDateString(task.deadline)}</span>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-xl">
        <DialogHeader>
          <DialogTitle>{task.title}</DialogTitle>
        </DialogHeader>
      </DialogContent>
      <div className="space-y-3">
        <p>{task.description}</p>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <User size={16} /> Assigned to: {task.assignedTo}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CalendarDays size={16} /> Due:{" "}
          {new Date(task.dueDate).toDateString()}
        </div>
      </div>
    </Dialog>
  );
};

export default TaskCard;
