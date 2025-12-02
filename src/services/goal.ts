import { apiClient } from "@/lib/api-client";
import type {
  GoalFilterDtoType,
  CreateGoalDtoType,
  UpdateGoalDtoType,
} from "@erp/shared-schema";

/* ---------------- CREATE GOAL ---------------- */
export async function createGoal(data: CreateGoalDtoType) {
  return apiClient("/goals", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/* ---------------- GET ALL GOALS (WITH FILTERS) ---------------- */
export async function getGoals(filters?: GoalFilterDtoType) {
  let query = "";

  if (filters && Object.keys(filters).length > 0) {
    const queryParts = Object.entries(filters)
      .filter(([_, val]) => val !== undefined && val !== null)
      .map(
        ([key, val]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(String(val))}`,
      );

    query = "?" + queryParts.join("&");
  }

  return apiClient(`/goals${query}`, {
    method: "GET",
  });
}

/* ---------------- GET GOAL BY ID ---------------- */
export async function getGoalById(id: string) {
  return apiClient(`/goals/${id}`, {
    method: "GET",
  });
}

/* ---------------- UPDATE GOAL ---------------- */
export async function updateGoal(id: string, data: UpdateGoalDtoType) {
  return apiClient(`/goals/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

/* ---------------- DELETE GOAL ---------------- */
export async function deleteGoal(id: string) {
  return apiClient(`/goals/${id}`, {
    method: "DELETE",
  });
}
