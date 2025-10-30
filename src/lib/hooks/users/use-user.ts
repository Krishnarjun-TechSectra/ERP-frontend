import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/services/users";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await getUsers();
      return res;
    },
  });
}
