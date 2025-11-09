// src/constants/taskColors.ts
import { TaskStatusEnum, TaskPriorityEnum } from "@erp/shared-schema";

export const TaskPriorityBgColorMap: Record<TaskPriorityEnum, string> = {
  [TaskPriorityEnum.LOW]: "bg-blue-100 text-blue-800",
  [TaskPriorityEnum.MEDIUM]: "bg-yellow-100 text-yellow-800",
  [TaskPriorityEnum.HIGH]: "bg-red-100 text-red-800",
};

export const TaskStatusBgColorMap: Record<TaskStatusEnum, string> = {
  [TaskStatusEnum.TODO]: "bg-[#F7F9FA] text-gray-800",
  [TaskStatusEnum.IN_PROGRESS]: "bg-[#EBF3FF] text-sky-800",
  [TaskStatusEnum.COMPLETED]: "bg-[#EDFDF1] text-green-800",
  [TaskStatusEnum.OVERDUE]: "bg-[#FEEFEF] text-red-800",
};
