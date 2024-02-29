import { useQuery } from "@tanstack/react-query";
import { fetchSections } from "@/endpoints/guide";

export const useFetchSections = () => {
  return useQuery({
    queryKey: ["sections"],
    queryFn: fetchSections,
    retry: 3,
    staleTime: 1000 * 60 * 5,
  });
};
