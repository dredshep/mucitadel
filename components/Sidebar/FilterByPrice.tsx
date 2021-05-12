import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Button from "../styled/Button";

const numberRegex = /^[+]?\d+([.]\d+)?$/;

const FilterByPrice = ({}) => {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const handleMinChange = (event) => {
    const min = event.target.value;

    if (min === "" || numberRegex.test(min)) {
      setMin(min);
    }
  };

  const handleMaxChange = (event) => {
    const max = event.target.value;

    if (numberRegex.test(max)) {
      setMax(max);
    }
  };

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
            value={min}
            placeholder="Min"
            onChange={handleMinChange}
          />
          <input
            className="shadow w-1/3 rounded bg-inputbg focus:bg-inputbg-focus hover:bg-inputbg-hover transition-colors duration-75 text-center focus:outline-none"
            type="text"
            placeholder="Max"
            value={max}
            onChange={handleMaxChange}
          />
          <Button className="pl-2 pr-2 rounded-r-md rounded-l-md">
            <FontAwesomeIcon icon={faSearch} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterByPrice;
