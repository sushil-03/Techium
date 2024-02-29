import React, { useState } from "react";
import PageLayout from "../_layout";
import Button from "@/components/common/Button";
import Link from "next/link";
import { handleGoogleLogin } from "@/endpoints/auth";

const Index = () => {
  return (
    <PageLayout>
      <div className="">
        {/* In single page it render both  signup detail page as well as signup card based on certain condition */}
        <div className="w-full h-screen overflow-hidden bg-brand-snow/20">
          <div className="xl:w-1/3 sm:w-1/2 w-5/6 m-auto h-2/3">
            <div className="flex flex-col  items-center   justify-around w-full h-full">
              <p className="  font-gt-super-ds-trial-light font-bold  md:text-6xl text-5xl">
                Sign Up
              </p>
              <div className="w-full bg-white px-8 py-10 border-brand-gray-400 border flex flex-col gap-14 justify-center items-center">
                <div className="flex flex-col gap-6 w-full ">
                  <Link href="/signup/detail">
                    <Button
                      variant="primary"
                      fullWidth
                      className="border border-primary rounded-md !bg-brand-green-300 font-bold"
                    >
                      Signup with Mail
                    </Button>
                  </Link>
                  <Button
                    variant="primary"
                    fullWidth
                    className="border border-primary rounded-md !bg-brand-green-300 font-bold"
                    onClick={() => handleGoogleLogin()}
                  >
                    Singup with Google
                  </Button>
                </div>
                <div className=" ">
                  <span className="text-brand-gray-800 font-gt-walsheim-regular">
                    Already have an account?
                  </span>
                  <Link href="/login">
                    <span className=" font-bold font-gt-walsheim-bold  cursor-pointer hover:underline pb-2 text-[#334E57]">
                      Login
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Index;
