import { apiClient } from "@/lib/api-client";
import type {
  CreateTaskDTO,
  TaskFilterDTO,
  UpdateTaskDTO,
} from "@erp/shared-schema";

export async function createTask(data: CreateTaskDTO) {
  return apiClient("/task", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getTasks(filters?: TaskFilterDTO) {
  const query = filters
    ? "?" +
      new URLSearchParams(
        Object.entries(filters).reduce((acc, [key, val]) => {
          if (val !== undefined && val !== null) {
           
            acc[key] = val instanceof Date ? val.toISOString() : String(val);
          }
          return acc;
        }, {} as Record<string, string>)
      ).toString()
    : "";

  console.log("Generated Query:", query);

  return apiClient(`/task${query}`, {
    method: "GET",
  });
}

export async function getTaskById(id: string) {
  return apiClient(`/task/${id}`, {
    method: "GET",
  });
}

export async function updateTask(id: string, data: UpdateTaskDTO) {
  return apiClient(`/task/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteTask(id: string) {
  return apiClient(`/task/${id}`, {
    method: "DELETE",
  });
}
