import React, { FC, useState } from "react";
import Button from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import VerificationOTP from "@/components/auth/VerificationOTP";
import Link from "next/link";
import { useRouter } from "next/router";
import PageLayout from "@/pages/_layout";
import { LoginDataProp, handleGoogleLogin } from "@/endpoints/auth";
import { useForm } from "react-hook-form";
import { useLogInByMail } from "@/hooks/mutation/useLogin";
import { toast } from "react-toastify";
const LoginDetails = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<LoginDataProp>();
  const { mutate: proposeLogin } = useLogInByMail();
  const [data, setData] = useState<LoginDataProp>();
  const router = useRouter();
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [showOTP, setShowOTP] = useState<boolean>(false);
  const handleLogin = (data: any) => {
    setShowOTP(true);
    setData(data);
    console.log("login data", data);
    // TODO: Implement OTP
  };
  if (isVerified && data) {
    setIsVerified(false);
    proposeLogin(data, {
      onSuccess: (data) => {
        toast.success("Welcome Back", {
          delay: 0,
        });
        setTimeout(() => router.push("/"), 2000);
      },
      onError: (data) => {
        toast.error("User doesn't exist ", {
          delay: 0,
        });
        setTimeout(() => router.push("/login"), 2000);
      },
    });
  }

  if (showOTP) {
    return <VerificationOTP type="Login" setIsVerified={setIsVerified} />;
  }

  return (
    <PageLayout>
      <div className="w-full h-screen overflow-hidden bg-brand-snow/20">
        <div className="xl:w-1/3 sm:w-1/2 xs:w-5/6 m-auto h-2/3 w-11/12">
          <div className="flex flex-col  items-center   justify-around w-full h-full">
            <p className="  font-gt-super-ds-trial-light font-bold   md:text-6xl text-5xl ">
              Login
            </p>
            <div className="w-full bg-white px-8 py-10 border-brand-gray-400 border flex flex-col gap-10 justify-center items-center">
              <form
                className="flex flex-col gap-6 w-full "
                onSubmit={handleSubmit(handleLogin)}
              >
                <Input
                  name="email"
                  register={register}
                  type="email"
                  label="Enter your mail"
                  error={errors.email?.message}
                  otherValidation={{
                    pattern: {
                      value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Invalid Email",
                    },
                  }}
                  placeholderText="yourmailhere@mail.com"
                />

                <button
                  // variant="primary"
                  type="button"
                  // fullWidth
                  className=" rounded-lg !bg-brand-green-300 font-bold py-4"
                  onClick={handleSubmit(handleLogin)}
                >
                  Send OTP
                </button>
              </form>
              <p className="w-full text-center border-b border-brand-gray-500 leading-[1px] ">
                {" "}
                <span className="py-4 z-30 bg-white text-brand-gray-500 font-gt-walsheim-regular px-3">
                  or
                </span>{" "}
              </p>
              <Button
                variant="secondary"
                fullWidth
                className=" rounded-lg  font-bold py-3"
                onClick={() => handleGoogleLogin()}
              >
                Login with Google
              </Button>
              <div className=" ">
                <span className="text-brand-gray-800 font-gt-walsheim-regular">
                  Don&apos;t have an account?
                </span>
                <Link href="/signup">
                  <span className=" font-bold font-gt-walsheim-bold  cursor-pointer hover:underline pb-2 text-[#334E57]">
                    {"   "}
                    Signup
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default LoginDetails;
