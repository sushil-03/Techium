import { useQuery } from "@tanstack/react-query";
import { getPosts, FilterType } from "@/endpoints/posts";

export const useFetchPost = (options: FilterType) => {
  // queryKey: ["posts", options.limit, options.page, options.revenue, options.category, options.search],
  return useQuery({
    queryKey: [
      "posts",
      options.limit,
      options.page,
      options.company,
      options.category,
      options.search,
    ],
    queryFn: () => getPosts(options),
    retry: 3,
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  });
};
