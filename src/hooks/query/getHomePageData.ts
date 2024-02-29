import { useQuery } from "@tanstack/react-query";
import { getHomePageData } from "@/endpoints/home";

export const useFetchHomeData = () => {
  return useQuery({
    queryKey: ["home"],
    queryFn: getHomePageData,
    retry: 3,
    staleTime: 1000 * 60 * 5,
  });
};
