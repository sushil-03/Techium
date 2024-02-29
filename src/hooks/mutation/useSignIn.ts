import { useMutation } from "@tanstack/react-query";
import { handleSignInByMail, SigninDataProp } from "@/endpoints/auth";
export const useSignInByMail = () => {
  return useMutation({
    mutationFn: (data: SigninDataProp) => handleSignInByMail(data),
  });
};
