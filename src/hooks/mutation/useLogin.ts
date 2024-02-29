import { useMutation } from "@tanstack/react-query";
import { handleLogInByMail, LoginDataProp } from "@/endpoints/auth";
export const useLogInByMail = () => {
  return useMutation({
    mutationFn: (data: LoginDataProp) => handleLogInByMail(data),
  });
};
