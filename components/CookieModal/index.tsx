import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

export default function CookieModal() {
  const [showCookieModal, setShowCookieModal] = useState(true);
  useEffect(function () {
    const boolStr = localStorage.getItem("hasRemoved");
    const bool = JSON.parse(boolStr);
    if (!bool) setShowCookieModal(true);
    else setShowCookieModal(false);
  }, []);
  function closeCookieModal() {
    localStorage.setItem("hasRemoved", "true");
    setShowCookieModal(false);
  }
  return (
    <div
      className={
        !showCookieModal
          ? "hidden"
          : "fixed origin-bottom-left left-3 bottom-3 z-10 bg-white rounded-full opacity-90 text pl-6 h-10 text-mainbg flex items-center overflow-hidden cursor-default"
      }
    >
      We use 🍪
      <span className="ml-3 text-mupurple font-bold cursor-pointer">
        Learn More
      </span>
      <span
        className="h-10 flex items-center w-10 justify-center cursor-pointer hover:text-mupurple"
        onClick={closeCookieModal}
      >
        <FontAwesomeIcon icon={faTimes} />
      </span>
    </div>
  );
}
