import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getUsers } from "@/services/users";
import type { UserSchemaType } from "@erp/shared-schema";

export function useUsers() {
  return useQuery<UserSchemaType[], Error>({
    queryKey: ["users"] as const,
    queryFn: getUsers,
    staleTime: 1000 * 60 * 2,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
