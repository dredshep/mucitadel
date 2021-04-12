import {
  faClone,
  faPlusSquare,
  faUserCircle,
  IconDefinition,
} from "@fortawesome/free-regular-svg-icons";
import {
  faHeartbeat,
  faSignOutAlt,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react";
import Explained from "../../Explainer/Explained";
import { AuthData, LogOut } from "../../types/AuthenticationProvider";

// Close Popdown/Popup when click outside.
// Documentation: https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
// Fixed some bugs with this: https://codedaily.io/tutorials/63/Create-a-Dropdown-in-React-that-Closes-When-the-Body-is-Clicked

function useOutsideAlerter(
  ref: React.MutableRefObject<any>,
  showPopdown: React.Dispatch<React.SetStateAction<boolean>>
) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        showPopdown(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref]);
}

export default function PopDown(props: {
  isLoggedIn: string | undefined;
  logOut: LogOut;
  authData: AuthData;
}) {
  const [popdownIsVisible, showPopdown] = React.useState(false);
  function showPopdownCommand() {
    if (popdownIsVisible === false) {
      showPopdown(true);
    } else if (popdownIsVisible === true) {
      showPopdown(false);
    }
  }
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, showPopdown);
  function Link(props: {
    icon: IconDefinition;
    href?: string;
    children: string;
    onClick?: any;
  }) {
    return (
      <a
        className="flex flex-column text-base hover:bg-mainbg cursor-pointer"
        onClick={props.onClick}
      >
        <div className="flex items-center py-3 px-5">
          <FontAwesomeIcon icon={props.icon} className="mr-5" />
          <div>{props.children}</div>
        </div>
      </a>
    );
  }
  return (
    <div
      ref={wrapperRef}
      onClick={showPopdownCommand}
      className={props.isLoggedIn ? "flex flex-column" : "hidden"}
    >
      <Explained explanation="Options">
        <FontAwesomeIcon icon={faUserCircle} className="cursor-pointer" />
      </Explained>
      <div
        className={
          (popdownIsVisible ? "absolute" : "hidden") +
          " origin-top-right top-14 right-4 bg-asidebg shadow-2xl text-lg rounded-lg flex flex-col font-semibold z-10"
        }
      >
        <Link icon={faPlusSquare}>
          {props.authData?.address || "pls login"}
        </Link>
        <Link icon={faPlusSquare}>Create NFT</Link>
        <Link icon={faClone}>My NFTs</Link>
        <Link icon={faWallet}>Wallet</Link>
        <Link icon={faHeartbeat}>Activity</Link>
        <Link icon={faSignOutAlt} onClick={props.logOut}>
          Log Out
        </Link>
      </div>
    </div>
  );
}
