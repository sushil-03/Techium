import PageLayout from "./_layout";
import Image from "next/image";
import Link from "next/link";
import BlogCard from "@/components/cards/BlogCard";
import { cn } from "@/lib/utils";
import Button from "@/components/common/Button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/router";
import { useFetchHomeData } from "@/hooks/query/getHomePageData";
import parser from "html-react-parser";
import { useUserStore } from "@/hooks/state/userState";
export default function Home() {
  const user = useUserStore((state) => state.user);
  // Custom Scroll for small screen
  const { data, error } = useFetchHomeData();
  console.log("daa", data, error);

  const router = useRouter();
  const handleForwardScroll = () => {
    const ele = document.getElementById("case");
    if (!ele) return;
    sideScroll(ele, "right", 10, 350, 10);
  };
  const handleBackWardScroll = () => {
    const ele = document.getElementById("case");
    if (!ele) return;
    sideScroll(ele, "left", 10, 350, 10);
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

  if (!data) {
    return <div>Loading...</div>;
  }

  localStorage.removeItem("@ownerpreneurGoogle");

  return (
    <PageLayout>
      <div className="flex flex-col justify-center items-center py-14 gap-28 bg-brand-snow/20 px-6 md:px-12 ">
        {/* Headline for Home Page */}
        <div className="container grid grid-cols-1 gap-20 p-0  lg:grid-cols-2 place-content-center place-items-center">
          <div className="flex flex-col items-start justify-start w-full gap-6 mt-4 md:gap-8 sm:mt-6 md:mt-10">
            <h1 className="text-4xl leading-12 xs:text-5xl   xs:leading-[54px] sm:text-6xl sm:leading-[72px] max-w-3xl min-w-0 md:min-w-[44rem] text-primary font-normal font-gt-super-ds-trial heading">
              {parser(data.headline.html)}
            </h1>
            <div className="flex flex-wrap items-center gap-4 xs:flex-nowrap w-full">
              <div
                className="relative flex h-12   items-center"
                style={{
                  width: `${data.faces.length * 38}px`,
                }}
              >
                {data?.faces.map((face: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className="absolute"
                      style={{
                        marginLeft: `${index * 35}px`,
                      }}
                    >
                      <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={face.url ? face.url : "sdf"}
                          fill
                          className="object-cover"
                          alt="featured image"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="text-lg sm:text-2xl text-primary underline underline-offset-4 tracking-wide font-normal font-gt-walsheim-regular">
                {data.faceTitle}
              </p>
            </div>
            <p className=" text-lg sm:text-2xl text-primary tracking-wide md:leading-[30px] font-normal font-gt-walsheim-regular">
              {data.subtitle}
            </p>
          </div>
          <div className="relative flex items-center justify-center w-full lg:h-full   sm:h-[450px] h-[350px] -top-6 lg:-top-0 ">
            <div className="relative flex items-center justify-center w-11/12 sm:w-10/12 md:w-3/4 lg:w-2/3 xl:w-full  h-full">
              <div className="relative w-full h-full ">
                <Image
                  // src="/assets/imgs/hero-img.png"
                  src={`${data.heroImage.url}`}
                  alt="Image"
                  fill
                  className="n sm:object-fit object-cover w-full"
                />
                <div className="absolute flex items-center justify-center p-2 border border-white rounded-full -left-10 -bottom-10 md:-left-16 md:-bottom-16 bg-white/20 md:p-3 backdrop-blur-sm ">
                  <Image
                    src="/assets/svg/byob-badge.svg"
                    alt="Image"
                    width={150}
                    height={150}
                    className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:32 lg:w-36 lg:h-36"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Buisness Tags */}
        <div className="container grid items-center grid-cols-3 p-0 xl:grid-cols-5 gap-14">
          <div className="col-span-3 xl:col-span-2 w-full max-w-lg rounded-[10px] h-[280px] md:h-[335px] flex flex-col justify-center items-center">
            <Image
              src={data.heroImage2.url}
              alt="Image"
              width={586}
              height={500}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex flex-col col-span-3 ">
            {data.subsections.map((genre: any, index: number) => (
              <div key={`genre-${genre.title}-${index}`}>
                <div className="w-full h-px bg-brand-snow"></div>
                <div className=" py-[18px] flex items-center justify-between gap-6 ">
                  <div className="flex items-baseline gap-6 overflow-x-hidden">
                    <h3 className="text-[34px] font-gt-super-ds-trial">
                      {genre.title}
                    </h3>
                    <div className="items-center hidden w-full overflow-hidden sm:flex">
                      {genre.subtitle.map((subGenre: any, index: number) => (
                        <Link
                          key={index}
                          // href={subGenre.link}
                          href={"/"}
                          className={cn(
                            "text-lg font-gt-walsheim-thin px-4 whitespace-nowrap text-primary font-semibold",
                            index < genre.subtitle.length - 1
                              ? " border-r-2 border-brand-gray-500"
                              : ""
                          )}
                        >
                          {subGenre}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <Link href={`${index === 0 ? "/" : "/featured"}`}>
                    <Image
                      src={"/assets/svg/right-arrow.svg"}
                      alt={"Image"}
                      width={40}
                      height={40}
                      className=""
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Case Studies */}
        <div className=" p-6 sm:px-14 sm:py-16 flex flex-col gap-12 md:gap-20 rounded-[10px] container bg-white">
          <div className="grid items-center grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-20">
            <div className="flex flex-col items-start order-2 w-full max-w-lg gap-4 lg:gap-6 lg:order-1">
              <h2 className=" text-4xl leading-[64px] sm:text-5xl sm:leading-[72px] text-primary font-gt-super-ds-trial">
                {data.title}
              </h2>
              <p className="text-lg leading-[26px] sm:text-xl text-primary tracking-wide sm:leading-[30px] font-normal font-gt-walsheim-regular whitespace-pre-line	">
                {parser(data.description.html)}
              </p>
              {/* <Link href={data.button_text_link}> */}
              <Button
                variant="primary"
                onClick={() => {}}
                className="rounded-[10px] font-semibold"
              >
                View Full List
              </Button>
              {/* </Link> */}
            </div>
            <div className="rounded-[10px] overflow-hidden w-full h-[280px] sm:h-[381px] order-1 lg:order-2">
              <Image
                src={data.heroImage3.url}
                alt="Image"
                width={586}
                height={500}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="relative sm:pb-0 pb-20">
            <button
              className=" bg-brand-gray-800 absolute h-14 w-14 border-white border-2 left-16 sm:hidden  flex items-center justify-center rounded-full bottom-0 z-20 "
              onClick={() => handleBackWardScroll()}
            >
              <IoIosArrowBack className="text-brand-green-300" size={25} />
            </button>

            <button
              className="  bg-brand-gray-800 absolute h-14 w-14 border-white border-2 right-16 sm:hidden  flex items-center justify-center rounded-full  z-20 bottom-0"
              onClick={() => handleForwardScroll()}
            >
              <IoIosArrowForward className="text-brand-green-300" size={25} />
            </button>

            <div
              className="flex gap-10 overflow-x-scroll no-scrollbar relative"
              id="case"
            >
              {data.recomended_case_studies.map((data: any, index: number) => {
                if (!data.id) return;
                return (
                  <Link href={`/posts/${data.id}`} key={index}>
                    <BlogCard className="min-w-[280px]" data={data} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
