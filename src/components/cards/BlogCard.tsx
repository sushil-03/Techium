import Image from "next/image";
interface BlogCardProps {
  data?: any;
  className?: string;
}
export default function BlogCard({ data, className }: BlogCardProps) {
  // Card for displaying blog posts (Dynamic Content)
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  return (
    <div
      className={`rounded-[10px] flex flex-col  dark:bg-black bg-white 2xl:w-[400px] md:w-[380px] sm:w-[340px] w-[300px] dark:text-textColor-dark
      text-textColor-light justify-between p-6 lg:h-[350px] sm:h-[340px]  h-[280px] z-50 ${className}`}
    >
      <p className="md:text-xl text-lg font-semibold font-gt-walsheim-regular ">
        {data?.title &&
          (data?.title.length > 50
            ? data?.title.substring(0, 50).concat("...")
            : data?.title)}
      </p>
      <div className="flex flex-col gap-3">
        <div className=" overflow-hidden  h-48 md:w-80 w-60 relative">
          <Image
            // src=""
            src={`${data ? data.banner.url : "/assets/imgs/img2.png"}`}
            alt="Image"
            // width={500}
            // height={350}
            fill
            className="h-full w-full  object-cover"
          />
        </div>
        <div className=" sm:flex hidden items-center flex-wrap justify-between">
          <span className="text-base font-gt-walsheim-regular font-medium ">
            {data?.category}
          </span>

          {data.revenue && data.revenue !== "0" && (
            <div className="relative w-32 h-fit flex justify-center">
              <div className="bg-secondary h-3 w-full mt-4"></div>
              <span className="text-xl absolute top-0 whitespace-nowrap font-gt-walsheim-regular font-bold">
                {data?.revenue || "0"}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
