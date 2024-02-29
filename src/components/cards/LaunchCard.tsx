import React from "react";
import Image from "next/image";
import parser from "html-react-parser";
import Link from "next/link";

const LaunchCard = ({ guide }: { guide: any }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  return (
    <Link href={`/guide/${guide.id}`}>
      <div className="w-full md:p-6 p-3 border border-brand-snow flex gap-4  flex-col">
        <div className="flex md:gap-6 gap-3 w-full">
          <div className=" min-h-[144px] min-w-[130px] relative">
            <Image
              src={`${BASE_URL}/assets/${guide?.banner}`}
              // src="/assets/imgs/img3.png"
              alt="img"
              fill
              className=" object-cover"
            />
          </div>
          <div className=" font-gt-walsheim-regular flex flex-col md:gap-3 gap-1">
            <div className="flex flex-col">
              <span className="font-semibold md:text-2xl text-xl">
                {guide.title}
              </span>
              <p className=" text-brand-gray-500  md:text-base text-sm    overflow-hidden text-ellipsis  ">
                {guide.subtitle.length > 100
                  ? guide.subtitle.substr(0, 100).concat("...")
                  : guide.subtitle}
              </p>
              <div className="md:text-lg sm:text-base text-sm text-primary overflow-hidden md:h-14  h-10 ">
                <span>{parser(guide.free_body || "")}</span>
              </div>
            </div>
            <div className="text-primary flex flex-wrap gap-x-4 gap-y-2 mt-2 md:text-base sm:text-sm text-xs">
              {guide.tags?.map((tag: string, index: number) => {
                return (
                  <span
                    key={index}
                    className=" whitespace-nowrap bg-brand-green-100 md:px-4 px-2 md:py-2 py-1 rounded-full flex items-center justify-center"
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center md:gap-4 gap-2 font-gt-walsheim-regular">
            <div className="w-10 h-10 rounded-full overflow-hidden relative">
              <Image
                src={`${BASE_URL}/assets/${guide?.author?.profile_picture}`}
                alt="avatar"
                fill
                className="object-contain"
              />
            </div>
            <span>{guide.author?.name}</span>
          </div>
          <div className="flex gap-4 items-center ">
            <div className="md:w-10 md:h-10 w-8 h-8 rounded-full overflow-hidden relative border-2 border-primary flex items-center justify-center md:text-2xl text-lg">
              📚
            </div>
            <div className="md:w-10 md:h-10 w-8 h-8 rounded-full overflow-hidden relative border-2 border-primary flex items-center justify-center md:text-2xl text-lg">
              💡
            </div>{" "}
            <div className="md:w-10 md:h-10 w-8 h-8 rounded-full overflow-hidden relative border-2 border-primary flex items-center justify-center md:text-2xl text-lg">
              💰
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LaunchCard;
