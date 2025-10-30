import { useQuery } from "@tanstack/react-query";
import { getKPIs } from "@/services/tasks";

export function useKpi() {
  return useQuery({
    queryKey: ["kpis"],
    queryFn: async () => {
      const res = await getKPIs();
      return res;
    },
  });
}
