import { useQuery } from "@tanstack/react-query";
import { getNewsLetterMail } from "@/endpoints/home";

export const useFetchNewsLetter = (email: string) => {
  return useQuery({
    queryKey: ["new_letter", email],
    queryFn: () => getNewsLetterMail(email),
    retry: 3,
    staleTime: 1000 * 60 * 5,
    enabled: false,
  });
};
