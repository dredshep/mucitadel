import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { LogIn } from "../../types/AuthenticationProvider";

export default function LoginModal(props: {
  loginModalIsVisible: boolean;
  showLoginModalCommand: () => void;
  logIn: LogIn;
  hasMetamask: boolean;
}) {
  const logInWithMetamask = () => {
    if (props.hasMetamask) {
      props
        .logIn("metamask")
        .then((bool) => bool && props.showLoginModalCommand());
    } else {
      alert("We can't detect the Metamask extension on your browser.");
    }
  };

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };
  const openMetaDownload = () =>
    openInNewTab("https://metamask.io/download.html");
  function MetamaskButton() {
    if (props.hasMetamask)
      return (
        <div
          className="px-4 py-2 font-semibold border-white border-opacity-50 hover:border-opacity-100 border-solid border-2 bg-metamask-bg text-metamask-text rounded-full cursor-pointer"
          onClick={logInWithMetamask}
        >
          Metamask
        </div>
      );
    else
      return (
        <div>
          <div
            className="px-4 py-2 font-semibold border-white border-opacity-50 border-solid border-2 bg-metamask-bg hover:bg-metamask-bg-hover hover:border-opacity-100 text-metamask-text hover:text-white rounded-full overflow-hidden cursor-pointer"
            onClick={openMetaDownload}
          >
            Install Metamask
          </div>
        </div>
      );
  }

  return (
    <div
      className={
        !props.loginModalIsVisible
          ? "hidden"
          : "fixed origin-top-left top-0 left-0 z-20 h-screen w-full"
      }
    >
      <div className="flex items-center justify-center h-full w-full">
        <div className="bg-mainbg rounded-xl w-full overflow-hidden max-w-max">
          <div className="text-title text-secondary text-lg font-semibold justify-around max-w-max">
            <div className="w-full flex justify-between">
              <div className="px-10 flex justify-around items-center">
                Choose your login method:
              </div>
              <div
                className="w-14 h-14 flex justify-around cursor-pointer items-center hover:bg-asidebg hover:text-white"
                onClick={props.showLoginModalCommand}
              >
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </div>
            {/* <div className="max-w-max pb-3">Choose your login method:</div> */}
            <div className="flex justify-center space-x-5 py-10 bg-asidebg">
              <MetamaskButton />
              <div className="px-4 py-2 font-semibold bg-phantasmablue border-white border-opacity-50 hover:border-opacity-100 border-solid border-2 text-white rounded-full cursor-pointer">
                Poltergeist
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
