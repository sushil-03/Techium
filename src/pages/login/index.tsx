import React from "react";
import PageLayout from "../_layout";
import Button from "@/components/common/Button";
import { handleGoogleLogin } from "@/endpoints/auth";
import Link from "next/link";

const Index = () => {
  return (
    <PageLayout>
      <div className="w-full h-screen overflow-hidden bg-brand-snow/20">
        <div className="xl:w-1/3 sm:w-1/2 xs:w-5/6 m-auto h-2/3 w-11/12">
          <div className="flex flex-col  items-center   justify-around w-full h-full">
            <p className="  font-gt-super-ds-trial-light font-bold  md:text-6xl text-5xl ">
              Login
            </p>
            <div className="w-full bg-white px-8 py-10 border-brand-gray-400 border flex flex-col gap-14 justify-center items-center">
              <div className="flex flex-col gap-6 w-full ">
                <Link href="/login/detail">
                  <Button
                    variant="primary"
                    fullWidth
                    className="border border-primary rounded-md !bg-brand-green-300 font-bold"
                  >
                    Login with Mail
                  </Button>
                </Link>
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

export default Index;
