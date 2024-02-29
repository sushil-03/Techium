import { useQuery } from "@tanstack/react-query";
import { getRelatedPost } from "@/endpoints/posts";
import { RelatedProductFilterType } from "@/endpoints/posts";

export const useFetchRelatedPost = (options: RelatedProductFilterType) => {
  return useQuery({
    queryKey: [
      "related posts",
      [options.category, options.userId, options.company],
    ],
    queryFn: () => getRelatedPost(options),
    retry: 3,
    staleTime: 1000 * 60 * 5,
    enabled: false,
  });
};
