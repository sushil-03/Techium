import React, { use, useEffect } from "react";
import PostCard from "../cards/PostCard";
import Modal from "react-modal";
import { FiFilter } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import FilterPost from "../FilterPost";
import { FaFilter } from "react-icons/fa6";
import Pagination from "../common/Pagination";
import { useFilterStore } from "@/hooks/state/filter";
const RecommendedPost = ({ posts }: { posts: any }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const page = useFilterStore((state) => state.page);
  const setPage = useFilterStore((state) => state.setPage);
  // const totalPage = Math.ceil posts.meta.filter_count || 0;
  const postPerPage = useFilterStore((state) => state.limit);
  const totalPage =
    (posts && posts.meta && Math.ceil(posts.meta.filter_count / postPerPage)) ||
    0;

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
      paddingBottom: "20px",
      border: "none",
      transform: "translate(-50%, -50%)",
      zIndex: 1000,
      // overflow: "scroll",

      maxHeight: "80%",
      width: "80%",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      scrollbars: "none",
      // opacity: "0",
      // transition: "opacity 2000ms ease-in-out",
    },
  };

  useEffect(() => {
    // To prevent scrolling when modal is open
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const handlePageNext = () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };

  const handlePagePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const navigateToPage = (page: number) => {
    setPage(page);
  };
  // This component is used in featured post page
  console.log("parpap", posts);

  return (
    <div className="my-24 w-full">
      <p className="md:text-5xl sm:text-4xl text-3xl text-center dark:text-textColor-dark text-textColor-light font-gt-super-ds-trial">
        Recommended Posts{" "}
      </p>
      <div className="flex lg:gap-8 mt-16 font-gt-walsheim relative">
        {/* Filter for small Screen */}
        {/* Hidden for now Previoslu hiddent tilll lg */}
        <div className="hidden " id="category">
          <button
            className="fixed flex items-center justify-center w-12 h-12 border-2 p-2 rounded-full bg-secondary border-primary bottom-5 left-5 "
            onClick={openModal}
          >
            <FiFilter className="text-primary" size={24} />
            {/* <FaFilter className="text-primary" size={20} /> */}
          </button>
          <Modal
            closeTimeoutMS={500}
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customStyles}
            ariaHideApp={false}
            contentLabel="Example Modal"
          >
            <div className="flex justify-end   sm:right-3 top-0 pl-10 sticky z-20">
              <button
                onClick={() => closeModal()}
                className="uppercase border-2 p-2 rounded-full border-primary  bg-gray-100 z-20"
              >
                <RxCross2 size={18} />
              </button>
            </div>
            <div className="-mt-10  sm:pl-8 bg-gray-100 p-4 pr-10 ">
              <FilterPost />
            </div>
          </Modal>
        </div>
        {/* Filter for large Screen */}

        {/* Hidden for now Previously show till  lg*/}
        <div className=" 2xl:w-1/4 xl:w-1/3 lg:w-1/2 lg:block hidden    min-w-[250px]">
          <div className="p-8 dark:bg-neutral-900 bg-gray-100 sticky top-32 z-30">
            <FilterPost />
          </div>
        </div>
        {/* Posts */}

        <div className="flex flex-col items-center gap-20 w-full">
          <div className="flex flex-col w-full gap-8 ">
            {posts &&
              posts.map((post: any, index: number) => {
                return (
                  <div key={index}>
                    <PostCard data={post} />
                  </div>
                );
              })}
            {posts && posts.length === 0 && (
              <div>
                <p className="text-4xl text-center font-gt-super-ds-trial dark:text-textColor-dark text-textColor-light">
                  No Post Found
                </p>
              </div>
            )}
          </div>

          {posts && posts.data && posts.data.length > 0 && totalPage > 1 && (
            <div>
              <Pagination
                currPage={page}
                pages={totalPage}
                handlePageNext={handlePageNext}
                handlePagePrevious={handlePagePrevious}
                navigateToPage={navigateToPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendedPost;
