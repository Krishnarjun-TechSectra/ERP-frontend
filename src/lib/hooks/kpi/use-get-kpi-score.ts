import { useQuery } from "@tanstack/react-query";
import { getKpiScore } from "@/services/kpi";
import { type KpiType } from "@erp/shared-schema";

export function useGetKpiScore() {
  return useQuery<KpiType[], Error>({
    queryKey: ["kpiScore"] as const,
    queryFn: getKpiScore,
    staleTime: 1000 * 60 * 2,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
