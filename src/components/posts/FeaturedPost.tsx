import React from "react";
import BlogCard from "../cards/BlogCard";
import Link from "next/link";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useFetchFeaturedPost } from "@/hooks/query/getFeaturedPost";
import Button from "../common/Button";
import { LampContainer } from "../common/LampContainer";
import { motion } from "framer-motion";
const FeaturedPost = () => {
  // Custom Scolling for small screen
  const { data, isLoading, isFetching } = useFetchFeaturedPost();
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

  // Helper for smooth scrolling
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
    <React.Fragment>
      <LampContainer isLoading={isLoading} isFetching={isFetching} data={data}>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center  font-medium tracking-tight text-transparent "
        >
          <div className=" w-full">
            <p className="text-white md:text-5xl sm:text-4xl text-3xl font-gt-super-ds-trial text-center ">
              Featured Posts
            </p>
          </div>
        </motion.h1>
      </LampContainer>
    </React.Fragment>
  );
};

export default FeaturedPost;
/*



 <div className="bg-slate-900 w-full p-8 mt-24 relative lg:pb-8 pb-20">
          <p className="text-secondary text-5xl font-gt-super-ds-trial text-center ">
            Featured Posts
          </p>

          <div>
            <button
              className=" bg-brand-gray-800 absolute h-14 w-14 border-white border-2  lg:hidden  flex items-center justify-center rounded-full bottom-6  left-20"
              onClick={() => handleBackWardScroll()}
            >
              <IoIosArrowBack className="text-brand-green-300" size={25} />
            </button>
            <button
              className="  bg-brand-gray-800 absolute h-14 w-14 border-white border-2 right-20 lg:hidden  flex items-center justify-center rounded-full  bottom-6"
              onClick={() => handleForwardScroll()}
            >
              <IoIosArrowForward className="text-brand-green-300" size={25} />
            </button>
          </div>

          <div
            className="lg:grid xl:grid-cols-3 xl:grid-rows-2 lg:grid-cols-2 lg:grid-rows-2 lg:place-content-center lg:overflow-auto overflow-x-scroll mt-16 gap-12 mb-6 flex no-scrollbar relative "
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



















*/
