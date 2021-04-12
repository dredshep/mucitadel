import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Button from "../styled/Button";

export default function FilterByPrice() {
  return (
    <div className="sticky flex flex-column items-start">
      <div className="px-4 mb-6">
        {/* Section title */}
        <div className="text-left pb-6 mt-5">
          {/* <i class="fas fa-tags"></i> */}
          <span className="font-semibold font-title text-secondary">
            FILTER BY PRICE
          </span>
        </div>
        {/* Search bars */}
        <div className="flex justify-between">
          {/*removed from min/max/button/search: focus:outline-black*/}
          <input
            className="shadow w-1/3 rounded bg-inputbg focus:bg-inputbg-focus hover:bg-inputbg-hover transition-colors duration-75 text-center focus:outline-none"
            type="text"
            placeholder="Min"
          />
          <input
            className="shadow w-1/3 rounded bg-inputbg focus:bg-inputbg-focus hover:bg-inputbg-hover transition-colors duration-75 text-center focus:outline-none"
            type="text"
            placeholder="Max"
          />

          <Button className="pl-2 pr-2 rounded-r-md rounded-l-md">
            <FontAwesomeIcon icon={faSearch} />
          </Button>
        </div>
      </div>
    </div>
  );
}
