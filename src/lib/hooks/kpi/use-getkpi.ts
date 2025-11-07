import { useQuery } from "@tanstack/react-query";
import { getKpis } from "@/services/kpi";
import type { Kpi } from "@erp/shared-schema";

export function useGetKpis() {
  return useQuery<Kpi[], Error>({
    queryKey: ["kpis"] as const,
    queryFn: getKpis,
    staleTime: 1000 * 60 * 2,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
