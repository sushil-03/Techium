import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import BlogCard from "../cards/BlogCard";
import Link from "next/link";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
export const LampContainer = ({
  isLoading,
  isFetching,
  data,
  children,
  className,
}: {
  isLoading: boolean;
  isFetching: boolean;
  data: any;
  children: React.ReactNode;
  className?: string;
}) => {
  const handleForwardScroll = () => {
    const ele = document.getElementById("container");
    if (!ele) return;
    sideScroll(ele, "right", 10, 440, 10);
  };
  const handleBackWardScroll = () => {
    const ele = document.getElementById("container");
    if (!ele) return;
    sideScroll(ele, "left", 10, 440, 10);
  };
  function sideScroll(
    element: HTMLElement,
    direction: string,
    speed: number,
    distance: number,
    step: number
  ) {
    let scrollAmount = 0;
    var slideTimer = setInterval(function () {
      if (direction == "left") {
        element.scrollLeft -= step;
      } else {
        element.scrollLeft += step;
      }
      scrollAmount += step;
      if (scrollAmount >= distance) {
        window.clearInterval(slideTimer);
      }
    }, speed);
  }
  return (
    <div
      className={cn(
        "relative flex mt-20 xl:h-[1400px] lg:h-[1500px]  sm:h-[1000px] h-[800px] flex-col items-center justify-center  bg-slate-950 w-full rounded-md z-0 ",
        className
      )}
    >
      <div className="relative flex w-full flex-1 items-center justify-center isolate z-0 ">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className=" absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute  w-[100%] left-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute  w-40 h-[100%] left-0 bg-slate-950  bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute  w-40 h-[100%] right-0 bg-slate-950  bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute  w-[100%] right-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-slate-950 blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        {/* <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl"></div> */}
        {/* <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-cyan-400 blur-2xl"
        ></motion.div> */}
        {/* <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-cyan-400 "
        ></motion.div> */}

        {/* <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-slate-950 "></div> */}
      </div>
      <div className="relative z-50 flex  md:-translate-y-[300px] -translate-y-[200px]   flex-col items-center px-5 ">
        {children}
      </div>
      <div className="relative lg:-translate-y-[140px]  -mt-20 overflow-scroll lg:pb-0 pb-16 ">
        <div className="bg-slate-950   ">
          <button
            className=" bg-slate-950  absolute h-14 w-14 shadow-card-active lg:hidden  flex items-center justify-center rounded-full bottom-3  left-20"
            onClick={() => handleBackWardScroll()}
          >
            <IoIosArrowBack className="text-primary" size={25} />
          </button>
          <button
            className="  bg-slate-950 absolute h-14 w-14 right-20 shadow-card-active lg:hidden  flex items-center justify-center rounded-full  bottom-3"
            onClick={() => handleForwardScroll()}
          >
            <IoIosArrowForward className="text-primary" size={25} />
          </button>
        </div>

        <div
          className="lg:grid xl:grid-cols-3 xl:grid-rows-2 lg:grid-cols-2 lg:grid-rows-2 lg:place-content-center px-2 lg:overflow-auto overflow-scroll gap-12 mb-6 flex flex-row no-scrollbar lg:w-full sm:w-[800px]  w-[400px] flex-shrink-0"
          id="container"
        >
          {isLoading || isFetching ? (
            <div className="w-full h-full flex justify-center items-center">
              {" "}
            </div>
          ) : (
            data?.map((post: any, index: number) => {
              return (
                <Link href={`/posts/${post.id}`} key={index} className="">
                  <BlogCard data={post} className=" rounded-none " />
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
