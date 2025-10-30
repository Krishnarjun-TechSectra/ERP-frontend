import { AlertCircle, Calendar } from "lucide-react";

interface Task {
  id: number;
  title: string;
  description: string;
  assignee: string;
  priority: string;
  dueDate: string;
  priorityColor: string;
}

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-2">
      <div className="flex items-start justify-between">
        <h2 className="font-semibold text-foreground">{task.title}</h2>
        <span
          className={`px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap ${task.priorityColor}`}
        >
          {task.priority}
        </span>
      </div>

      <p className="text-gray-600 text-sm">{task.description}</p>

      <div className="flex items-center justify-between text-sm">
        <p className="text-gray-600 font-medium ">{task.assignee}</p>
        <div className="flex items-center gap-2 text-red-600 font-medium">
          <AlertCircle size={18} />
          <Calendar size={18} />
          <span>{task.dueDate}</span>
        </div>
      </div>
    </div>
  );
}
