import React, { useRef, useState } from "react";
import Image from "next/image";
import Button from "../common/Button";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosArrowUp,
} from "react-icons/io";
import BlogCard from "./BlogCard";
import { useRouter } from "next/router";
import Link from "next/link";
import parse from "html-react-parser";
import { useFetchRelatedPost } from "@/hooks/query/getRelatedPost";
const PostCard = ({ data }: { data: any }) => {
  const router = useRouter();
  const [showMore, setShowMore] = useState<boolean>(false);
  const scrollableContainerRef = useRef<HTMLInputElement>(null);

  const scrollToLeft = () => {
    if (scrollableContainerRef && scrollableContainerRef.current) {
      scrollableContainerRef.current.scroll({
        left: 0,
        behavior: "smooth", // Use 'auto' for instant scroll
      });
    }
  };

  // Card for displaying blog posts (Dynamic Content)
  if (!data) {
    return <div>Loading</div>;
  }

  const filterOptions = {
    userId: data.dloguser.id,
    category: data.category,
    revenue: data.revenue,
    tags: data.tags,
  };
  console.log("file", filterOptions);

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: relatedPost, refetch } = useFetchRelatedPost(filterOptions);
  const handleForwardScroll = (id: string) => {
    const ele = document.getElementById(id);
    if (!ele) return;
    sideScroll(ele, "right", 10, 430, 10);
  };
  const handleBackWardScroll = (id: string) => {
    const ele = document.getElementById(id);
    if (!ele) return;
    sideScroll(ele, "left", 10, 430, 10);
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
  console.log("related post", relatedPost);

  return (
    <div className="w-full px-6 py-6 dark:bg-neutral-900 dark:text-textColor-dark text-textColor-light bg-gray-100 md:px-8 overflow-hidden">
      {/* header */}
      <Link href={`/posts/${data.id}`}>
        <div className="flex justify-between w-full gap-5 md:flex-row flex-col">
          <div className="flex gap-4 min-w-fit justify-start items-center">
            <div className="w-12 h-12 relative rounded-full overflow-hidden">
              <Image
                src={data.banner.url}
                fill
                className="object-cover"
                alt="featured image"
              />
            </div>
            <div>
              <p className="whitespace-nowrap">{data.dloguser.name}</p>
              <p className="text-gray-500  whitespace-nowrap font-gt-walsheim-light">
                {data.dloguser.company}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            {data.tags.map((item: string, index: number) => (
              <p
                key={index}
                className="items-center px-6 py-2 text-center rounded-full bg-brand-gray-500/10 whitespace-nowrap"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
        {/* content */}
        <div className="mt-6 tracking-wide overflow-hidden text-ellipsis">
          <p className="text-2xl font-gt-walsheim-regular">
            {" "}
            {data.title &&
              (data.title.length > 100
                ? data.title.substring(0, 100).concat("...")
                : data.title)}
          </p>
          {/* <p className="mt-2 text-brand-primary  w-5/6 h-12">{data.body}</p> */}
          <div className="mt-2 dark:text-gray-300 text-gray-700  w-5/6 h-14 font-gt-walsheim-regular font-normal text-lg ">
            {data.freebody ? parse(data.freebody.html) : ""}
          </div>
        </div>
      </Link>
      <div className="mt-6">
        <div className="flex justify-between items-center">
          <Link href={`/posts/${data.id}`}>
            <Button variant="primary">Read Full Post</Button>
          </Link>
          <div
            className="flex items-center gap-2"
            onClick={() => {
              refetch();
              setShowMore(!showMore);
            }}
          >
            <p className="underline cursor-pointer">Related posts</p>
            <div
              className={` rounded-md transform duration-500 ease-in-out ${
                showMore ? " rotate-180" : "rotate-0"
              }`}
            >
              <IoIosArrowUp />
            </div>
          </div>
        </div>
      </div>
      <div className=" ">
        {/* Show related posts */}
        {showMore && (
          // <div className="lg:grid xl:gap-12 md:gap-10 gap-8 mt-4 auto-rows-min  overflow-x-scroll  ">
          <div className="flex flex-row w-full ">
            <div className="w-full ">
              <div
                className=" mt-6 flex gap-10 overflow-x-scroll pr-4 no-scrollbar"
                ref={scrollableContainerRef}
                id={data.id}
              >
                {relatedPost?.map((item: any, index: number) => {
                  if (item.id !== data.id) {
                    return (
                      <Link href={`/posts/${item.id}`} key={index}>
                        <BlogCard data={item} className=" rounded-none" />
                      </Link>
                    );
                  }
                })}
                {relatedPost?.length === 0 && (
                  <div className=" text-xl font-gt-super-ds-trial ">
                    No related post
                  </div>
                )}
              </div>
              <div className="flex justify-center items-center mt-5 gap-2">
                {/* {relatedPost?.map((items: any, index: number) => {
                  if (items.id !== data.id) {
                    return (
                      <p
                        className="w-2 h-2 bg-brand-gray-500 rounded-full"
                        key={index}
                      >
                        {}
                      </p>
                    );
                  }
                })} */}
                {relatedPost && relatedPost.length > 1 && (
                  <div className="flex  justify-between gap-10 items-center">
                    <button
                      className=" bg-brand-gray-800  h-10 w-10 border-white border-2 left-16 sm:hidden  flex items-center justify-center rounded-full bottom-0 z-20 "
                      onClick={() => handleBackWardScroll(data.id)}
                    >
                      <IoIosArrowBack
                        className="text-brand-green-300"
                        size={20}
                      />
                    </button>
                    {/* Backward Button for scrolling in small screen */}
                    <button
                      className="  bg-brand-gray-800  h-10 w-10 border-white border-2 right-16 sm:hidden  flex items-center justify-center rounded-full  z-20 bottom-0"
                      onClick={() => handleForwardScroll(data.id)}
                    >
                      <IoIosArrowForward
                        className="text-brand-green-300"
                        size={20}
                      />
                    </button>{" "}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
