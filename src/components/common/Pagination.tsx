import Image from "next/image";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
// import NextIcon from "/public/assets/next-page.svg";
interface PaginationProps {
  currPage: number;
  pages: number;
  handlePageNext: () => void;
  handlePagePrevious: () => void;
  navigateToPage: (page: number) => void;
}
const Pagination: React.FC<PaginationProps> = ({
  currPage,
  pages,
  handlePageNext,
  handlePagePrevious,
  navigateToPage,
}) => {
  const renderPagination = (navigateToPage: any) => {
    let pagination = [];
    for (let i = 1; i <= pages; i++) {
      if (i === 1 || i === 2 || i === pages || i === pages - 1) {
        pagination.push(
          <button
            key={i}
            onClick={() => navigateToPage(i)}
            className={`${
              currPage === i ? "bg-primary text-white" : "bg-white text-primary"
            } border border-gray-300 h-8 w-8 flex items-center justify-center rounded cursor-pointer`}
          >
            {i}
          </button>,
        );
      } else if (i === 3) {
        pagination.push(
          <button className="bg-white border text-xl border-gray-300 h-8 w-8 flex items-center justify-center rounded cursor-pointer">
            ...
          </button>,
        );
      }
    }
    return pagination;
  };

  return (
    <div className="flex font-bold gap-2">
      <button
        onClick={handlePagePrevious}
        className="bg-white border border-gray-300 h-8 w-8 flex items-center justify-center rounded cursor-pointer"
      >
        <IoIosArrowForward className="rotate-180 text-primary text-xl" />
      </button>
      {renderPagination(navigateToPage)}
      <button
        onClick={handlePageNext}
        className="bg-white border border-gray-300 h-8 w-8 flex items-center justify-center rounded cursor-pointer"
      >
        <IoIosArrowForward className="text-primary text-xl" />
      </button>
    </div>
  );
};

export default Pagination;
