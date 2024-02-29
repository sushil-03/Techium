import { useMutation } from "@tanstack/react-query";
import { updateUser } from "@/endpoints/auth";
export const useUpdateUser = () => {
  return useMutation({
    mutationFn: (data: any) => updateUser(data),
  });
};
