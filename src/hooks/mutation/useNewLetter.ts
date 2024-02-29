import { useMutation } from "@tanstack/react-query";
import { handleNewsLetter, NewsLetterProps } from "@/endpoints/home";
export const useNewsLetterUpload = () => {
  return useMutation({
    mutationFn: (data: NewsLetterProps) => handleNewsLetter(data),
  });
};
