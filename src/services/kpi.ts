import { apiClient } from "@/lib/api-client";
import { CreateKpiDto, UpdateKpiDto } from "@erp/shared-schema";

export async function createKpi(data: CreateKpiDto) {
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

export async function updateKpi(id: string, data: UpdateKpiDto) {
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
