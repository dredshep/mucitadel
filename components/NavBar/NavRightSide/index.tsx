import { faBell, faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import {
  faChartLine,
  faSignInAlt,
  faTh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Explained from "../../Explainer/Explained";
import Button from "../../styled/Button";
import { AuthData, LogIn, LogOut } from "../../types/AuthenticationProvider";
import LoginModal from "../LoginModal";
import PopDown from "../PopDown";

export default function NavRightSide(props: {
  logIn: LogIn;
  logOut: LogOut;
  authData: AuthData;
  hasMetamask: boolean;
}) {
  const [loginModalIsVisible, showLoginModal] = React.useState(false);
  const showLoginModalCommand = () => showLoginModal(!loginModalIsVisible);
  return (
    <div className="text-xl ml-auto lg:ml-0 flex mr-3 h-full">
      <div
        className={
          !loginModalIsVisible
            ? "hidden"
            : "fixed origin-top-left top-0 left-0 z-20 h-screen w-screen bg-mupurple opacity-60"
        }
        onClick={showLoginModalCommand}
      ></div>
      <LoginModal
        {...{
          showLoginModalCommand,
          loginModalIsVisible,
          logIn: props.logIn,
          hasMetamask: props.hasMetamask,
        }}
      />
      <Explained
        explanation="Add NFT"
        className={`hidden${props.authData?.address ? " lg:flex" : ""}`}
      >
        <FontAwesomeIcon icon={faPlusSquare} />
      </Explained>
      <Explained explanation="Catalogue" className="lg:flex hidden">
        <FontAwesomeIcon icon={faTh} />
      </Explained>
      <Explained
        explanation="Notifications"
        className={`hidden${props.authData?.address ? " lg:flex" : ""}`}
      >
        <FontAwesomeIcon icon={faBell} />
      </Explained>
      <Explained explanation="Stats" className="lg:flex hidden">
        <FontAwesomeIcon icon={faChartLine} />
      </Explained>
      {/* cursor-pointer bg-mupurple py-4 px-4 rounded-full text-xl  font-title tracking-wide font-semibold leading-3 h-11 */}
      <Button
        className={
          props.authData?.address
            ? "hidden"
            : "text-lg font-title self-center lg:ml-4 pl-2 pr-2 lg:pl-4 lg:pr-4"
        }
        onClick={showLoginModalCommand}
      >
        {/* desktop */}
        <span className="hidden lg:flex">Login</span>
        {/* mobile */}
        <span className="flex lg:hidden">
          {/* <Explained explanation="Options"> */}
          <FontAwesomeIcon icon={faSignInAlt} />
          {/* </Explained> */}
        </span>
      </Button>
      <PopDown
        {...{
          isLoggedIn: props.authData?.address,
          authData: props.authData,
          logOut: props.logOut,
        }}
      />
    </div>
  );
}
