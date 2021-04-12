import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Button from "../../styled/Button";

export default function SearchBar(props) {
  return (
    <div
      className={
        "shadow flex w-6/12 xlish:w-4/12 mx-auto font-body " +
          props.className || ""
      }
    >
      <input
        className="w-full rounded-l py-1 px-6 bg-inputbg focus:bg-inputbg-focus hover:bg-inputbg-hover focus:outline-none transition-colors duration-75"
        type="text"
        placeholder="Search..."
      />
      <Button className="pl-2 pr-2 rounded-l-none rounded-r-md">
        <FontAwesomeIcon icon={faSearch} />
      </Button>
      {/* <button className="bg-mupurple w-auto flex justify-end items-center text-white p-2 focus:outline-none focus:ring-offset-mupurple rounded-r-md">
        <FontAwesomeIcon icon={faSearch} />
      </button> */}
    </div>
  );
}
