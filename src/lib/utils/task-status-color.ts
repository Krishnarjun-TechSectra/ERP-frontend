// src/constants/taskColors.ts
import { TaskStatusEnum, TaskPriorityEnum } from "@erp/shared-schema";

export const TaskPriorityBgColorMap: Record<TaskPriorityEnum, string> = {
  [TaskPriorityEnum.LOW]: "bg-blue-100 text-blue-800",
  [TaskPriorityEnum.MEDIUM]: "bg-yellow-100 text-yellow-800",
  [TaskPriorityEnum.HIGH]: "bg-red-100 text-red-800",
};

export const TaskStatusBgColorMap: Record<TaskStatusEnum, string> = {
  [TaskStatusEnum.TODO]: "bg-gray-100 text-gray-800",
  [TaskStatusEnum.IN_PROGRESS]: "bg-sky-100 text-sky-800",
  [TaskStatusEnum.COMPLETED]: "bg-green-100 text-green-800",
  // [TaskStatusEnum.OVERDUE]: "bg-red-100 text-red-800",
};
