import { useQuery } from "@tanstack/react-query";
import { fetchGuidBySection } from "@/endpoints/guide";

export const useFetchGuideBySection = (id: string) => {
  return useQuery({
    queryKey: ["guide", id],
    queryFn: () => fetchGuidBySection(id),
    retry: 3,
    staleTime: 1000 * 60 * 5,
  });
};
