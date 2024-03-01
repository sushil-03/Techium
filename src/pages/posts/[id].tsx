import Banner from "@/components/Banner";
import React, { useEffect, useState } from "react";
import PageLayout from "../_layout";
import { BsTwitter } from "react-icons/bs";
import { BiLogoLinkedin, BiLogoFacebook } from "react-icons/bi";
import PostCard from "@/components/cards/PostCard";
import Button from "@/components/common/Button";
import { FiArrowUpRight } from "react-icons/fi";
import { AiOutlineUnorderedList } from "react-icons/ai";
import SideScroll from "@/components/SideScroll";
import Image from "next/image";
import Modal from "react-modal";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/router";
import { useFetchPostById } from "@/hooks/query/getPostById";
import parse from "html-react-parser";
import { useFetchRelatedPost } from "@/hooks/query/getRelatedPost";

import { handleGoogleLogin } from "@/endpoints/auth";
import Link from "next/link";
import { useUserStore } from "@/hooks/state/userState";

const ArticlePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useFetchPostById(id as string);
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [active, setActive] = React.useState<string>("");
  const user = useUserStore((state) => state.user);

  const [h1Data, setH1Data] = useState<any>();
  const [updatedBody, setUpdateBody] = useState<any>();
  const { data: relatedPost, refetch } = useFetchRelatedPost({
    category: data?.category,
    country: data?.country,
  });

  useEffect(() => {
    fetchAllH1(data?.body?.html);
    refetch();
  }, [data, refetch]);

  //State for handling modal for small screen
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "50px",
      border: "none",
      transform: "translate(-50%, -50%)",
      // overflow: "scroll",

      maxHeight: "80%",
      width: "80%",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      scrollbars: "none",
    },
  };

  // Disable scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const fetchAllH1 = (html: any) => {
    const tempDiv = html;
    const parser = new DOMParser();
    const doc = parser.parseFromString(tempDiv, "text/html");

    const h1Tags = doc.querySelectorAll("h1");
    const h1InfoArray = Array.from(h1Tags).map((h1Tag, index) => {
      const id = `h1_${index}`;
      h1Tag.id = id;
      const innerText = h1Tag.innerText;
      return { id, innerText };
    });
    if (doc) {
      setUpdateBody(doc);
    }
    setH1Data(h1InfoArray);
  };
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("h1[id]");

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= window.innerHeight / 2) {
          setActive(section.getAttribute("id") || "");
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // console.log("uodata", updatedBody.html);

  return (
    <PageLayout>
      <div className="w-full h-full pt-10">
        <div className="h-full sm:px-4 px-2 md:px-8">
          <Banner />
          {data ? (
            <div className="flex h-full gap-8 mt-16 ">
              {/* Left side Navigation Panel */}
              <div className=" tab:w-1/5 ">
                {/* For large Screen */}
                {h1Data?.length > 0 && (
                  <div className="w-full sticky top-36 hidden min-h-[500px]  tab:block mt-8  mb-72">
                    <SideScroll
                      data={h1Data}
                      // className="bg-[#F0F3F3]"
                      className="dark:bg-neutral-900 bg-[#F0F3F3]"
                      active={active}
                    />
                  </div>
                )}
                {/* For Small Screen */}
                {h1Data?.length > 0 && (
                  <div className="block tab:hidden " id="sidebar">
                    <button
                      className="fixed flex items-center justify-center w-12 h-12 border-2 rounded-full bg-primary border-primary bottom-5 left-5 z-40"
                      onClick={openModal}
                    >
                      <AiOutlineUnorderedList
                        className="text-white"
                        size={20}
                      />
                    </button>
                    <Modal
                      isOpen={isOpen}
                      onRequestClose={closeModal}
                      style={customStyles}
                      closeTimeoutMS={500}
                      ariaHideApp={false}
                      contentLabel="Example Modal"
                    >
                      <div className="flex justify-end   right-3 top-0 pl-10 sticky ">
                        <button
                          onClick={() => closeModal()}
                          className="uppercase border-2 p-2 rounded-full border-primary z-30 bg-white"
                        >
                          <RxCross2 size={18} />
                        </button>
                      </div>
                      <SideScroll
                        active={active}
                        className="bg-white border-none no-scrollbar -mt-10 pr-10"
                        data={h1Data}
                      />
                    </Modal>
                  </div>
                )}
              </div>
              {/* Right Side Content */}
              <div className="w-full mx-auto md:w-4/5 tab:w-2/3 tab:mx-0 ">
                {/* Title ,Share links */}
                <div className="w-full ">
                  <h1 className="text-2xl leading-8 font-gt-super-ds-trial tab:text-5xl md:text-4xl sm:text-3xl tab:leading-16 md:leading-12 sm:leading-10 dark:text-textColor-dark text-textColor-light">
                    {data.title}
                  </h1>

                  <div className="flex items-center gap-4 mt-4 mb-8">
                    <span className=" font-gt-walsheim-regular dark:text-textColor-dark text-textColor-light">
                      Share on:{" "}
                    </span>
                    <BsTwitter size={20} className="text-brand-gray-500" />
                    <BiLogoLinkedin size={25} className="text-brand-gray-500" />
                    <BiLogoFacebook size={24} className="text-brand-gray-500" />
                  </div>
                  {/* About Author */}
                  <div className="flex items-center gap-4 py-2 border-y-2 border-brand-gray-300">
                    <div className="">
                      <Image
                        // src="/assets/imgs/user.png"
                        src={data.dloguser.profile.url}
                        width={80}
                        height={80}
                        alt=""
                      />
                    </div>
                    <div className="">
                      <p className="text-brand-gray-600 font-gt-walsheim-light text-lg  text-ellipsis overflow-hidden w-full">
                        {data.dloguser.name}
                      </p>
                      <p className="text-brand-gray-600 font-gt-walsheim-light h-[60px]  text-ellipsis overflow-hidden w-full">
                        {data.dloguser.bio}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Main content Rich Text  */}
                <div
                  className={`my-8 relative text-lg tracking-wide font-gt-walsheim-light content dark:text-textColor-dark text-textColor-light `}
                >
                  {/* {parse(data.body.html || "")} */}

                  {updatedBody && parse(updatedBody.body.innerHTML || "")}

                  {/* {data.body} */}
                </div>

                {/* Share links */}
                <div className="flex flex-col items-center justify-center gap-2 my-24 dark:text-textColor-dark text-textColor-light">
                  <span className=" font-gt-walsheim-regular">Share on: </span>
                  <div className="flex items-center justify-center gap-4">
                    <BsTwitter size={20} className="text-brand-gray-500" />
                    <BiLogoLinkedin size={25} className="text-brand-gray-500" />
                    <BiLogoFacebook size={24} className="text-brand-gray-500" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>Loading</div>
          )}
        </div>
      </div>
      {/* Related article */}
      <div className="w-full h-full md:py-10 py-0  ">
        <div className="w-11/12 mx-auto sm:w-4/5 lg:w-2/3 md:w-3/4">
          <h1 className="pb-20 text-4xl text-center font-gt-super-ds-trial pt-28 dark:text-textColor-dark text-textColor-light">
            Related Articles
          </h1>
          <div className="flex flex-col gap-6">
            {relatedPost?.map((post: any, index: number) => {
              return <PostCard data={post} key={index} />;
            })}
          </div>
          {/* Explore More */}
          <div className="flex items-center justify-center my-20">
            <Button
              variant="secondary"
              icon={<FiArrowUpRight size={20} />}
              onClick={() => router.push("/featured")}
            >
              Explore More
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ArticlePage;
