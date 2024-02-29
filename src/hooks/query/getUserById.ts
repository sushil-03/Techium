import { useQuery } from "@tanstack/react-query";
import { fetchUserById } from "@/endpoints/auth";

export const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: ["user", [id]],
    queryFn: () => fetchUserById(id),
    retry: 3,
    staleTime: 1000 * 60 * 5,
    enabled: id != "" && typeof id != "object",
  });
};
