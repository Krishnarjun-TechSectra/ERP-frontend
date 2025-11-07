import React from "react";
import TaskMetricsCard from "./cards/metrics.card";
import {
  CircleCheckBig,
  Clock,
  Target,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";

const MetricsBoard = ({
  tasksAssigned,
  tasksCompleted,
  tasksPending,
  tasksOverdue,
}: {
  tasksAssigned: number;
  tasksCompleted: number;
  tasksPending: number;
  tasksOverdue: number;
}) => {
  const productivityScore = (tasksCompleted / tasksAssigned) * 100;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
      <TaskMetricsCard
        title="Tasks Assigned"
        count={tasksAssigned}
        icon={<Target size={18} />}
        borderColor="border-gray-300"
        description="Total tasks assigned to the user"
      />
      <TaskMetricsCard
        title="Tasks Completed"
        count={tasksCompleted}
        icon={<CircleCheckBig size={18} />}
        borderColor="border-green-300"
        description="Successfully completed"
      />
      <TaskMetricsCard
        title="Tasks Pending"
        count={tasksPending}
        icon={<Clock size={18} />}
        borderColor="border-blue-300"
        description="Still in progress"
      />
      <TaskMetricsCard
        title="Tasks Overdue"
        count={tasksOverdue}
        icon={<TriangleAlert size={18} />}
        borderColor="border-red-300"
        description="Past deadline"
      />
      <TaskMetricsCard
        title="Productivity Score"
        count={productivityScore}
        icon={<TrendingUp size={18} />}
        borderColor="border-purple-300"
        description="Weighted completion score"
      />
    </div>
  );
};

export default MetricsBoard;
