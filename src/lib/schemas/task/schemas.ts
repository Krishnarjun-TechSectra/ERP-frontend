import z from "zod";

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum TaskStatus {
  OVERDUE = 'overdue',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  TODO = 'to_do',
}

export enum RecurringFrequency {
  DAILY = 'daily',
  WEEKLY = 'weekly',
}

export const CreateTaskSchema = z.object({
  title: z.string().nonempty('Title is required'),
  description: z.string().optional(),
  kpi_id: z.string().uuid().optional(),
  assignTo: z.string().nonempty('AssignTo is required'),
  priority: z.enum(TaskPriority),
  deadline: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date string',
  }),
  isRecurring: z.boolean(),
  recurringFrequency: z.enum(RecurringFrequency).optional(),
});