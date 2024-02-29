import Link from "next/link";
import { Input } from "../common/Input";
import React, { FC } from "react";
import Button from "../common/Button";
import { useRouter } from "next/router";
import PageLayout from "@/pages/_layout";
import { useForm } from "react-hook-form";
interface VerificationOTPProps {
  type: "Login" | "Signup";
  setIsVerified: (value: boolean) => void;
}
const VerificationOTP: FC<VerificationOTPProps> = ({ type, setIsVerified }) => {
  const router = useRouter();
  const handleResend = () => {
    // TODO: Implement Resend OTP
  };
  const handleVerify = () => {
    setIsVerified(true);
  };
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const handleGoogleLogin = () => {};
  return (
    <PageLayout>
      <div className="w-full h-screen overflow-hidden bg-brand-snow/20 pt-20">
        <div className="xl:w-1/3 sm:w-1/2 w-5/6 m-auto h-2/3">
          <div className="flex flex-col  items-center   justify-around w-full h-full">
            <p className="  font-gt-super-ds-trial-light font-bold  md:text-6xl text-5xl">
              {type === "Login" ? "Login" : "Sign Up"}
            </p>
            <div className="w-full bg-white px-8 py-10 border-brand-gray-400 border flex flex-col gap-10 justify-center items-center">
              <div className="flex flex-col gap-6 w-full ">
                <div>
                  <Input
                    register={register}
                    name="otp"
                    type="number"
                    label="Enter OTP "
                    error={""}
                    placeholderText="123456"
                  />
                  <div className="mt-1 text-sm flex justify-between  items-center font-gt-walsheim-regular ">
                    <p className="  ">
                      <span className="text-brand-gray-800 ">
                        Didn’t receive OTP?
                      </span>{" "}
                      <button
                        className="text-[#334E57] font-medium font-gt-walsheim-bold hover:underline"
                        onClick={() => handleResend()}
                      >
                        {" "}
                        Resend
                      </button>
                    </p>
                    <button onClick={() => window.location.reload()}>
                      <span className="text-brand-gray-800 ">Not my mail</span>
                    </button>
                  </div>
                </div>
                <Button
                  variant="primary"
                  fullWidth
                  className=" rounded-lg !bg-brand-green-300 font-bold"
                  onClick={() => handleVerify()}
                >
                  Verify
                </Button>
              </div>
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
              {/* {type === "Login" ? (
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
        ) : (
          <div className=" ">
            <span className="text-brand-gray-800 font-gt-walsheim-regular">
              Already have an account?
            </span>
            <Link href="/login">
              <span className=" font-bold font-gt-walsheim-bold  cursor-pointer hover:underline pb-2 text-[#334E57]">
                {"   "}
                Login
              </span>
            </Link>
          </div>
        )} */}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default VerificationOTP;
