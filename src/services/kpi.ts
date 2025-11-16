import { apiClient } from "@/lib/api-client";
import { CreateKpiDtoType, UpdateKpiDtoType } from "@erp/shared-schema";

export async function createKpi(data: CreateKpiDtoType) {
  return apiClient("/kpi", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getKpis() {
  return apiClient("/kpi", {
    method: "GET",
  });
}

export async function getKpiById(id: string) {
  return apiClient(`/kpi/${id}`, {
    method: "GET",
  });
}

export async function updateKpi(id: string, data: UpdateKpiDtoType) {
  return apiClient(`/kpi/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteKpi(id: string) {
  return apiClient(`/kpi/${id}`, {
    method: "DELETE",
  });
}
