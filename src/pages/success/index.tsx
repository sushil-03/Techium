import React from "react";
import PageLayout from "../_layout";
import Button from "@/components/common/Button";
import { useRouter } from "next/router";
import Logo from "@/components/Logo";

export default function Success() {
  const router = useRouter();
  // Success page for subscription
  return (
    <PageLayout>
      <div className="flex items-center  gap-16 flex-col   justify-center xl:w-1/3 lg:w-2/5 md:w-1/2 sm:w-2/3 w-11/12 m-auto ">
        <div className="flex items-center justify-center flex-col  md:gap-10 gap-6  md:mt-32 mt-24">
          <p className="font-gt-super-ds-trial md:text-7xl sm:text-5xl text-3xl text-primary italic">
            Congratulations!
          </p>
          <p className=" font-gt-walsheim-light text-center   md:text-lg sm:text-base  text-sm">
            Welcome to the VIP club! Your subscription purchase has just
            upgraded your journey with us.
          </p>
        </div>
        <div className="flex flex-col w-full md:gap-20 gap-16 mt-5  ">
          {/* Success Card Pending */}

          <div className=" bg-gradient-to-b from-primary from-0%  to-[#02485f] to-100% z-20 rounded-xl  border-secondary border-2 shadow-md">
            <div className="   w-full p-4 flex md:gap-8 gap-5 flex-col  bg-success-card rounded-xl  relative  -z-10">
              <div className="p-2">
                <Logo />
              </div>
              <div className="flex items-center flex-col md:gap-10 gap-6 font-gt-walsheim-regular my-4">
                <p className="  font-bold md:text-4xl sm:text-3xl text-2xl text-white">
                  Benjamin Campbell
                </p>
                <p className="text-secondary uppercase font-bold">
                  Premium Member
                </p>
              </div>
            </div>
          </div>
          <div className="mx-auto ">
            <Button
              variant="secondary"
              onClick={() => router.push("/")}
              className="border-2 px-6 py-1"
            >
              Home
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
