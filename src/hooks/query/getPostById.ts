import { useQuery } from "@tanstack/react-query";
import { getPostById } from "@/endpoints/posts";

export const useFetchPostById = (id: string) => {
  // queryKey: ["posts", options.limit, options.page, options.revenue, options.category, options.search],
  return useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPostById(id),
    retry: 3,
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
};
