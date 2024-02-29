import React, { FC } from "react";
import Button from "../common/Button";
import Link from "next/link";
interface SignupCardProps {
  setShowEmailSignup: (value: Boolean) => void;
  setIsLogin: (value: Boolean) => void;
}
const SignupCard: FC<SignupCardProps> = ({
  setShowEmailSignup,
  setIsLogin,
}) => {
  // Sign up card for signing up with email or google
  return (
    <div className="flex flex-col  items-center   justify-around w-full h-full">
      <p className="  font-gt-super-ds-trial-light font-bold  md:text-6xl text-5xl">
        Sign Up
      </p>
      <div className="w-full bg-white px-8 py-10 border-brand-gray-400 border flex flex-col gap-14 justify-center items-center">
        <div className="flex flex-col gap-6 w-full ">
          <Button
            variant="primary"
            fullWidth
            onClick={() => setShowEmailSignup(true)}
            className="border border-primary rounded-md !bg-brand-green-300 font-bold"
          >
            Signup with Mail
          </Button>
          <Button
            variant="primary"
            fullWidth
            className="border border-primary rounded-md !bg-brand-green-300 font-bold"
          >
            Singup with Google
          </Button>
        </div>
        <div className=" ">
          <span className="text-brand-gray-800 font-gt-walsheim-regular">
            Already have an account?
          </span>
          <button onClick={() => setIsLogin(true)}>
            <span className=" font-bold font-gt-walsheim-bold  cursor-pointer hover:underline pb-2 text-[#334E57]">
              {"   "}
              Login
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupCard;
