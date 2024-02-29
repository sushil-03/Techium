import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FilterStoreType, useFilterStore } from "@/hooks/state/filter";

export const Select = ({ options, label }: any) => {
  const setCategory = useFilterStore(
    (state: FilterStoreType) => state.setCategory
  );
  const setCountry = useFilterStore(
    (state: FilterStoreType) => state.setCountry
  );
  const setCompany = useFilterStore(
    (state: FilterStoreType) => state.setCompany
  );
  // const setSortBy = useFilterStore((state: FilterStoreType) => state.setSortBy);

  const handleChange = (value: string) => {
    if (value === "Any type") {
      value = "";
    }
    if (label === "Category") {
      setCategory(value);
    } else if (label === "Country") {
      setCountry(value);
    } else if (label === "Company") {
      setCompany(value);
    }
  };

  return (
    <div className="">
      <p className="text-lg text-brand-gray-700 font-gt-walsheim-light mb-1">
        {label}
      </p>
      <div className="relative">
        <select
          name=""
          id=""
          className="w-full outline-none border  border-black p-3 rounded-md appearance-none dark:bg-black bg-white dark:text-textColor-dark text-textColor-light"
          onChange={(e) => handleChange(e.target.value)}
        >
          {options?.map((option: any, index: number) => {
            return (
              <option value={option} key={index}>
                {option}
              </option>
            );
          })}
        </select>
        <IoIosArrowDown
          className="absolute right-3 top-4  pointer-events-none dark:text-textColor-dark text-textColor-light"
          size={20}
        />
      </div>
    </div>
  );
};
