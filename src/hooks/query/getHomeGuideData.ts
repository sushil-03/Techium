import { useQuery } from "@tanstack/react-query";

import { getGuideHomeData } from "@/endpoints/guide";
export const useFetchGuideHomeData = () => {
  return useQuery({
    queryKey: ["guide_home"],
    queryFn: getGuideHomeData,
    retry: 3,
    staleTime: 1000 * 60 * 5,
  });
};
