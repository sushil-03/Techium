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
      className={`rounded-[10px] flex flex-col  dark:bg-black bg-white 2xl:w-[400px] w-[380px] dark:text-textColor-dark
      text-textColor-light justify-between p-6 h-[350px] z-50 ${className}`}
    >
      <p className="text-xl font-semibold font-gt-walsheim-regular">
        {data?.title &&
          (data?.title.length > 50
            ? data?.title.substring(0, 50).concat("...")
            : data?.title)}
      </p>
      <div className="flex flex-col gap-3">
        <div className=" overflow-hidden w-full h-48">
          <Image
            // src=""
            src={`${data ? data.banner.url : "/assets/imgs/img2.png"}`}
            alt="Image"
            width={500}
            height={350}
            className="h-full w-full object-fit"
          />
        </div>
        <div className=" flex items-center flex-wrap justify-between">
          <span className="text-base font-gt-walsheim-regular font-medium ">
            {data?.category}
          </span>
          <div className="relative w-32 h-fit flex justify-center">
            <div className="bg-secondary h-3 w-full mt-4"></div>
            <span className="text-xl absolute top-0 whitespace-nowrap font-gt-walsheim-regular font-bold">
              {data?.revenue || "0"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
