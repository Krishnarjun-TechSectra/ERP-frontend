import { apiClient } from "@/lib/api-client";
import type {
  CreateTaskDto,
  CreateTaskDtoType,
  TaskFilterDto,
  TaskFilterDtoType,
  UpdateTaskDto,
  UpdateTaskDtoType,
} from "@erp/shared-schema";

export async function createTask(data: CreateTaskDtoType) {
  return apiClient("/task", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getTasks(filters?: TaskFilterDtoType) {
  let query = "";

  if (filters && Object.keys(filters).length > 0) {
    const queryParts = Object.entries(filters)
      .filter(([_, val]) => val !== undefined && val !== null)
      .map(
        ([key, val]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(String(val))}`
      );

    query = "?" + queryParts.join("&");
  }

  return apiClient(`/task${query}`, {
    method: "GET",
  });
}

export async function getTaskById(id: string) {
  return apiClient(`/task/${id}`, {
    method: "GET",
  });
}

export async function updateTask(id: string, data: UpdateTaskDtoType) {
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
