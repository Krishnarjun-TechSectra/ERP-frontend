import { apiClient } from "@/lib/api-client";

export async function createKPI(data: any) {
  return apiClient("/task/create-kpi", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function createTask(data: any) {
  return apiClient("/task", {
    method: "POST",
    body: JSON.stringify(data),
  });
}


export async function getKPIs() {
  return apiClient("/task/get-kpis");
}

export async function deleteKPI(id: string) {
  return apiClient(`/task/delete-kpi/${id}`, {
    method: "DELETE",
  });
}
