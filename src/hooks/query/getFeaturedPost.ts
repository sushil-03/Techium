import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getFeaturedPosts } from "@/endpoints/posts";

export const useFetchFeaturedPost = () => {
  return useQuery({
    queryKey: ["featured"],
    retry: 3,
    queryFn: ({ pageParam = 1 }) => getFeaturedPosts(pageParam),

    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  });
};
