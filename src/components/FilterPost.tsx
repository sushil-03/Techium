import React from "react";
import { Select } from "./common/Select";
import {
  CompanyOptions,
  CountryOptions,
  CategoryOptions,
} from "@/lib/constant";
const FilterPost = () => {
  return (
    <div className="">
      <p className="border-b-2 py-2 text-lg border-[#d3d3d3] dark:text-textColor-dark text-textColor-light">
        FILTER
      </p>
      <div className="mt-6">
        <Select options={CompanyOptions} label="Company" />
      </div>
      <div className="mt-6">
        <Select options={CategoryOptions} label="Category" />
      </div>
      <div className="mt-6">
        <Select options={CountryOptions} label="Country" />
      </div>
      <div className="mt-6">
        <Select options={["Recently", "Old"]} label="Timeframe" />
      </div>
    </div>
  );
};

export default FilterPost;
