import React from "react";

interface DataProps {
  id: string;
  innerText: string;
}
const SideScroll = ({
  className,
  data,
  active,
}: {
  className?: string;
  data: any;
  active: string;
}) => {
  // Function to navigate between id's
  const handleScroll = (index: number, idText: string) => {
    console.log("idd", idText);

    var element = document.getElementById(idText);
    console.log("idd3", element);

    var headerOffset = 200;
    if (!element) return;

    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  if (!data) return;
  return (
    <div
      className={`font-gt-walsheim-light relative  px-3 py-8 w-full min-w-[220px] ${className}  z-30`}
    >
      <div
        className=" flex flex-col gap-8 overflow-y-scroll max-h-[600px] nav no-scrollbar"
        style={{
          scrollbarColor: "red",
        }}
      >
        {/* All the tags from the content */}
        {data?.map((tag: DataProps, index: number) => {
          return (
            <div
              className="relative cursor-pointer  w-full"
              key={index}
              id={"data_" + tag.id}
              onClick={() => {
                handleScroll(index, tag.id);
              }}
            >
              <div
                className={`flex items-start gap-2 ${
                  index == data.length - 1 ? "" : ""
                }`}
              >
                {/* Navigation Circle  */}
                <div
                  className={` ${
                    index == data.length - 1
                      ? " h-20 z-20   tab:bg-[#F0F3F3] tab:dark:bg-neutral-900 bg-white "
                      : ""
                  }`}
                >
                  <div className={`relative z-20 `}>
                    <div
                      className={`w-6 h-6  rounded-full ${
                        active === tag.id
                          ? " bg-brand-green-100"
                          : "bg-brand-gray-100"
                      }`}
                    ></div>
                    <div
                      className={`w-4 h-4  rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
                        active === tag.id
                          ? "bg-brand-green-200"
                          : "bg-brand-gray-300"
                      }`}
                    ></div>
                  </div>
                </div>
                <div
                  className={`${
                    active === tag.id ? "text-primary" : "text-brand-gray-500"
                  } leading-5 `}
                >
                  {tag.innerText} {tag.id}
                </div>
              </div>
            </div>
          );
        })}

        {/* Straight line throught the tags */}
        {data && (
          <div
            className={`  absolute  top-8 bottom-8 left-4 z-10 w-2 border-r border-dashed border-brand-gray-500`}
          >
            {" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default SideScroll;
