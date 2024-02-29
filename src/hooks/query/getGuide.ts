import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchGuide } from "@/endpoints/guide";

export const useFetchGuide = (id = "") => {
  return useInfiniteQuery({
    queryKey: ["guide", id],
    queryFn: ({ pageParam = 1 }) => fetchGuide(id, pageParam),
    retry: 3,
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      // const
      const nextPage =
        allPages.length !== Math.ceil(lastPage.meta.total_count / 6)
          ? allPages.length + 1
          : undefined;

      return nextPage;
    },
  });
};
