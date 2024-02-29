import { useQuery } from "@tanstack/react-query";
import { getGuideById } from "@/endpoints/guide";

export const useFetchGuideById = (id: string) => {
  return useQuery({
    queryKey: ["guide", id],
    queryFn: () => getGuideById(id),
    retry: 3,
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
};
