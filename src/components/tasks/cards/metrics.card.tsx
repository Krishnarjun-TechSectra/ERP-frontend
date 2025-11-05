import React from "react";

const TaskMetricsCard = ({
  title,
  count,
  icon,
  borderColor,
  description,
}: {
  title: string;
  count: number;
  icon: React.ReactNode;
  borderColor: string;
  description: string;
}) => {
  return (
    <div className={`p-4 md:p-6 border ${borderColor} bg-white rounded-xl`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-medium text-gray-700">{title}</h2>
        <span className=" text-gray-500">{icon}</span>
      </div>
      <p className="text-2xl font-bold text-gray-800">{count}</p>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default TaskMetricsCard;
