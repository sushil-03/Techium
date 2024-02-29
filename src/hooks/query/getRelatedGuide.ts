import { useQuery } from "@tanstack/react-query";
import { getRelatedGuide } from "@/endpoints/guide";

export const useFetchRelatedGuide = (id: string) => {
  return useQuery({
    queryKey: ["related guide", id],
    queryFn: () => getRelatedGuide(id),
    retry: 3,
    staleTime: 1000 * 60 * 5,
    enabled: id != "",
  });
};
