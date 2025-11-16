import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getUsers } from "@/services/users";
import type { UserType } from "@erp/shared-schema";

export function useUsers() {
  return useQuery<UserType[], Error>({
    queryKey: ["users"] as const,
    queryFn: getUsers,
    staleTime: 1000 * 60 * 2,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
