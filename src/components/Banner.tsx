import React from "react";
import Image from "next/image";
import Link from "next/link";
const Banner = () => {
  // Banner image for article screen
  return (
    <div className="w-11/12 mx-auto md:w-3/4 sm:5/6">
      <Link href="/subscribe">
        <div className="w-full pt-12 pb-12 border-b-2 border-brand-gray-300">
          <div className="bg-secondary">
            <div className="flex justify-between w-full gap-2 pl-6 pt-4 sm:gap-10 lg:gap-20 tab:gap-16 md:gap-12  md:px-12 ">
              {/* Heading */}
              <div className="sm:w-1/2  w-2/3">
                <p className=" font-gt-super-ds-trial lg:text-3xl tab:text-2xl  md:text-xl  sm:text-lg text-md  font-semibold  md:leading-8 leading-6 lg:leading-10 border-2 border-red-600">
                  Learn how people are starting successful business
                </p>
                <Image
                  src="/assets/svg/banner-clip.svg"
                  alt="slider"
                  width={320}
                  className="border-none bg-blend-multiply"
                  height={50}
                />
              </div>
              {/* Banner Arrow Image */}
              <div className="flex-1 ">
                <Image
                  src="/assets/svg/union.svg"
                  alt="slider"
                  width={350}
                  className="border-none bg-blend-multiply w-5/6"
                  height={5}
                />
              </div>
            </div>
            <p className="text-xs md:mx-12  mx-6 pb-4 font-gt-walsheim-light sm:hitespace-nowrap md:text-base sm:text-sm ">
              Join our membership and get access to 4,418 case studies
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Banner;
