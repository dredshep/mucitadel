import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React from "react";
import ActiveLink from "../ActiveLink";
import { AuthData, LogIn, LogOut } from "../types/AuthenticationProvider";
import NavRightSide from "./NavRightSide";
import SearchBar from "./SearchBar/Index";

function MainLogo() {
  return (
    <img src="/images/mucitadel-white.png" className="" alt="MemeUnity Logo" />
  );
}

function Logo(props: { sidebar?: boolean }) {
  return (
    <div
      className={
        (props.sidebar ? "ml-6" : "ml-0") +
        " flex flex-row items-center w-40 mr-auto lg:mx-0"
      }
    >
      <MainLogo />
    </div>
  );
}

export default function NavBar(props: {
  sidebar?: boolean;
  logIn: LogIn;
  logOut: LogOut;
  authData: AuthData;
}) {
  const router = useRouter();
  return (
    <div className="flex flex-row lg:justify-between h-16 bg-asidebg items-center px-6">
      {props.sidebar ? (
        <FontAwesomeIcon icon={faBars} className="text-3xl mr-2 lg:hidden" />
      ) : undefined}
      <ActiveLink href={router.pathname === "/" ? "#" : "/"}>
        <Logo sidebar={props.sidebar} />
      </ActiveLink>
      <SearchBar className="hidden lg:flex" />
      <NavRightSide
        logIn={props.logIn}
        logOut={props.logOut}
        authData={props.authData}
      />
    </div>
  );
}
