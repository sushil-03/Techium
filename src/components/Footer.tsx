import Link from "next/link";
import Logo from "./Logo";
import Image from "next/image";
import { cn } from "@/lib/utils";
const footerNavigation = [
  {
    heading: "Starting",
    Links: [
      {
        url: "",
        title: "Ideas & Basics",
      },
      {
        url: "",
        title: "Plans & Launch",
      },
      {
        url: "",
        title: "Manage & Grow",
      },
    ],
  },
  {
    heading: "Case Studies",
    Links: [
      {
        url: "",
        title: "Success",
      },
      {
        url: "",
        title: "Failures",
      },
    ],
  },
];

const socialMediaNav = [
  {
    linkUrl: "",
    imgUrl: "/assets/icons/Facebook.svg",
    imgAlt: "Facebook Image",
  },
  {
    linkUrl: "",
    imgUrl: "/assets/icons/Twitter.svg",
    imgAlt: "Twitter Image",
  },
  {
    linkUrl: "",
    imgUrl: "/assets/icons/Linkedin.svg",
    imgAlt: "Linkedin Image",
  },
  {
    linkUrl: "",
    imgUrl: "/assets/icons/Youtube.svg",
    imgAlt: "Youtube Image",
  },
  {
    linkUrl: "",
    imgUrl: "/assets/icons/Instagram.svg",
    imgAlt: "Instagram Image",
  },
];

export default function Footer() {
  return (
    <div className=" bg-black">
      <div className="flex flex-col container max-w-screen-2xl px-6 md:px-10 lg:px-16 py-6 lg:py-9 gap-7">
        <div className=" grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1  py-6 gap-8 lg:gap-0 ">
          <div className="flex flex-col gap-5 items-start  lg:col-span-2 col-span-1 ">
            {/* <Logo className=" h-14 w-auto " /> */}
            <Image
              src="/assets/imgs/test2.png"
              alt="Image"
              width={200}
              height={100}
              className={cn("rounded-md  ")}
            />
            <p className="text-base text-white tracking-wide font-light font-gt-walsheim-thin">
              Build your OWN business -<br /> OWN Your Freedom
            </p>
            <div className="flex gap-6 items-center">
              {socialMediaNav.map((link, index) => (
                <Link key={`social-media-${link.imgUrl}`} href={link.linkUrl}>
                  <Image
                    src={link.imgUrl}
                    alt={link.imgAlt}
                    width={24}
                    height={24}
                  />
                </Link>
              ))}
            </div>
          </div>
          {/* <div
            className={
              " col-span-2 grid-cols-2 sm:grid-cols-3 grid md:grid-cols-5 gap-6 md:pr-6"
            }
          > */}
          <div className={"  grid-cols-2 grid  md:pr-6 "}>
            {footerNavigation.map((nav, index) => (
              <div
                key={`footer-nav-${nav.heading}-${index}`}
                className={cn("flex flex-col gap-2")}
              >
                <p className="text-base text-white tracking-wide font-medium font-gt-walsheim-regular whitespace-nowrap">
                  {nav.heading}
                </p>
                <ul className="flex flex-col gap-1.5">
                  {nav.Links.map((link, index) => (
                    <li key={`footer-nav-url-${link.title}-${index}`}>
                      <Link
                        href={link.url}
                        className="text-base whitespace-nowrap text-white tracking-wide font-gt-walsheim-thin"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <hr className="" />
        <div className="  flex justify-center items-center">
          <span className="text-white font-gt-walsheim-thin text-xs font-thin tracking-wider">
            Terms of Service | Privacy Policy | GDPR Information | CCPA
            Information | Copyright © 2022 Techium
          </span>
        </div>
      </div>
    </div>
  );
}
