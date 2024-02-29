import React from "react";
import Button from "../common/Button";
import { FC } from "react";
import Link from "next/link";
import { handleGoogleLogin } from "@/endpoints/auth";
interface LoginCardProps {
  setEmailLogin: (value: Boolean) => void;
  setIsLogin: (value: Boolean) => void;
}

const LoginCard: FC<LoginCardProps> = ({ setEmailLogin, setIsLogin }) => {
  // Login card to handle login via email and google
  return (
    <div className="flex flex-col  items-center   justify-around w-full h-full">
      <p className="  font-gt-super-ds-trial-light font-bold  md:text-6xl text-5xl ">
        Login
      </p>
      <div className="w-full bg-white px-8 py-10 border-brand-gray-400 border flex flex-col gap-14 justify-center items-center">
        <div className="flex flex-col gap-6 w-full ">
          <Button
            variant="primary"
            fullWidth
            className="border border-primary rounded-md !bg-brand-green-300 font-bold"
            onClick={() => setEmailLogin(true)}
          >
            Login with Mail
          </Button>
          <Button
            variant="primary"
            fullWidth
            className="border border-primary rounded-md !bg-brand-green-300 font-bold"
            onClick={() => handleGoogleLogin()}
          >
            Login with Google
          </Button>
        </div>
        <div className=" ">
          <span className="text-brand-gray-800 font-gt-walsheim-regular">
            Don&apos;t have an account?
          </span>
          <button onClick={() => setIsLogin(false)}>
            <span className=" font-bold font-gt-walsheim-bold  cursor-pointer hover:underline pb-2 text-[#334E57]">
              {"   "}
              Signup
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
