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
import { IoDocumentText, IoRocket, IoBulb } from "react-icons/io5";
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

  const cards = [
    {
      icon: IoBulb,
      title: "Idea Generation",
      body: "Creativity is where it all begins. Explore the power of idea generation, the first step on your path to building a successful business.",
    },
    {
      icon: IoDocumentText,

      title: "Business Planning",
      body: "Your Roadmap to Success. Dive into the world of business planning, your essential guide to turning ideas into thriving ventures.",
    },
    {
      icon: IoRocket,
      title: "Launching",
      body: "Your Roadmap to Success. Dive into the world of business planning, your essential guide to turning ideas into thriving ventures.",
    },
  ];

  return (
    <PageLayout>
      <div className="h-[50rem] w-full    dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

        <div className="flex gap-5 flex-col">
          <div className="flex gap-2  lg:text-7xl md:text-6xl sm:text-5xl xs:text-4xl text-3xl flex-col items-center guide">
            <strong className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-300 to-neutral-600 pt-8">
              Discover Boundless
              <div className="absolute right-10 lg:shadow-[10px_0px_300px_100px_rgb(140,_44,_222)] shadow-[10px_0px_500px_60px_rgb(140,_44,_222)] rotate-90 w-[1px] h-[1px] rounded-tr-full bg-transparent margi"></div>
            </strong>

            <em className="text-2xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-600 pb-8">
              {" "}
              Buisness Journey
            </em>
          </div>
          <div className="text-base flex items-center justify-center gap-4 ">
            <Link href={"/featured"} className="">
              <Button
                variant="primary"
                className="py-3 px-8 text-white  shadow-[0_10px_50px_-15px_rgb(140,_44,_222)]"
              >
                Explore
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className=" ">
        <div className=" lg:w-4/5 md:5/6 w-11/12 mx-auto ">
          <div className="py-24 flex gap-12  items-center justify-center  lg:flex-nowrap flex-wrap">
            {cards.map((card: any, index: number) => {
              return (
                <div
                  key={index}
                  className="dark:bg-[#1b1b1b] dark:text-white bg-white w-[400px] flex flex-col gap-4 px-4 pt-6 pb-8 border dark:border-none shadow-[0_7px_30px_-15px_rgb(148,_163,_184)] border-brand-gray-300  hover:shadow-[0_10px_50px_-15px_rgb(140,_44,_222)]  transition-shadow ease-in-out duration-500"
                >
                  <div className="flex flex-col gap-2">
                    <div className="rounded-full overflow-hidden bg-[#925fc0]  shadow-icon relative h-14 w-14 flex items-center justify-center">
                      <card.icon size={30} />
                    </div>
                    <span className=" font-gt-walsheim-regular text-2xl">
                      {card.title}
                    </span>
                  </div>
                  <span className=" text-primary/80 text-base font-gt-walsheim-regular leading-5">
                    {card.body}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {data && (
        <div className="flex flex-col justify-center items-center py-14 gap-28 sm:px-6 px-3 md:px-12 ">
          {/* Buisness Tags */}
          <div className="container grid items-center grid-cols-3 p-0 xl:grid-cols-5 gap-14">
            <div className="col-span-3 xl:col-span-2 w-full max-w-lg rounded-[10px] h-[280px] md:h-[335px] flex flex-col justify-center items-center">
              <Image
                src="/assets/svg/dream.svg"
                alt="Image"
                width={586}
                height={500}
                className=" px-8 w-full h-full bg-neutral-900"
              />
            </div>

            <div className="flex flex-col col-span-3 dark:text-textColor-dark text-textColor-light">
              {data.subsections.map((genre: any, index: number) => (
                <div key={`genre-${genre.title}-${index}`}>
                  <div className="w-full h-px bg-brand-snow"></div>
                  <div className=" py-[18px] flex items-center justify-between gap-6 ">
                    <div className="flex items-baseline gap-6 overflow-x-hidden">
                      <h3 className="text-[34px] font-gt-super-ds-trial ">
                        {genre.title}
                      </h3>
                      <div className="items-center hidden w-full overflow-hidden sm:flex">
                        {genre.subtitle.map((subGenre: any, index: number) => (
                          <Link
                            key={index}
                            // href={subGenre.link}
                            href={"/"}
                            className={cn(
                              "text-lg font-gt-walsheim-thin px-4 whitespace-nowrap  font-semibold",
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
          <div className=" xs:p-6 p-2 sm:px-14 sm:py-16 flex flex-col gap-12 md:gap-20 rounded-[10px] container dark:bg-[#1b1b1b]  bg-gray-100">
            <div className="grid items-center grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-20">
              <div className="flex flex-col items-start order-2 w-full max-w-lg gap-4 lg:gap-6 lg:order-1">
                <h2 className=" text-4xl leading-[64px] sm:text-5xl sm:leading-[72px] dark:text-textColor-dark text-textColor-light font-gt-super-ds-trial">
                  {data.title}
                </h2>
                <p className="text-lg leading-[26px] sm:text-xl dark:text-textColor-dark text-textColor-light tracking-wide sm:leading-[30px] font-normal font-gt-walsheim-regular whitespace-pre-line	">
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
                className=" bg-slate-900 absolute h-14 w-14  shadow-card-active left-16 sm:hidden  flex items-center justify-center rounded-full bottom-0 z-20 "
                onClick={() => handleBackWardScroll()}
              >
                <IoIosArrowBack className="text-primary" size={25} />
              </button>

              <button
                className="  bg-slate-900 absolute h-14 w-14 shadow-card-active right-16 sm:hidden  flex items-center justify-center rounded-full  z-20 bottom-0"
                onClick={() => handleForwardScroll()}
              >
                <IoIosArrowForward className="text-primary" size={25} />
              </button>

              <div
                className="flex gap-10 overflow-x-scroll no-scrollbar relative"
                id="case"
              >
                {data.recomended_case_studies.map(
                  (data: any, index: number) => {
                    if (!data.id) return;
                    return (
                      <Link href={`/posts/${data.id}`} key={index}>
                        <BlogCard
                          className="md:w-[280px] min-w-[200px]"
                          data={data}
                        />
                      </Link>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
