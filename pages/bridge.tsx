import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import Button from "../components/styled/Button";
import Select from "../components/UI/Select";

// export default function LoginModal(props: {
//   loginModalIsVisible: boolean;
//   showLoginModalCommand: () => void;
//   logIn: LogIn;
//   hasMetamask: boolean;
// }) {
export default function DankBridge() {
  const props = {} as { [key: string]: any };
  props.loginModalIsVisible = true;
  props.logIn = async () => true;
  props.showLoginModalCommand = () => true;
  props.hasMetamask = true;
  const logInWithMetamask = () => {
    if (props.hasMetamask) {
      props
        .logIn("metamask")
        .then((bool) => bool && props.showLoginModalCommand());
    } else {
      alert("We can't detect the Metamask extension on your browser.");
    }
  };

  const [direction, setDirection] = useState({
    label: "Ethereum -> BSC",
    value: "BSC",
  });

  const [BSCApproved, setBSCApproved] = useState(false);
  const [ETHApproved, setETHApproved] = useState(false);
  const handleApprove = () => {
    if (direction.value === "BSC")
      alert("approved ETH contract"), setETHApproved(true);
    if (direction.value === "ETH")
      alert("approved BSC contract"), setBSCApproved(true);
  };

  const tokenAmount = useRef(null);
  const handleBridge = () => {
    if (direction.value === "BSC")
      alert(
        `Bridged ${tokenAmount.current.value || 0} DANK from Ethereum to BSC`
      );
    if (direction.value === "ETH")
      alert(
        `Bridged ${tokenAmount.current.value || 0} DANK from BSC to Ethereum`
      );
  };

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };
  const openMetaDownload = () =>
    openInNewTab("https://metamask.io/download.html");
  function MetamaskButton() {
    if (props.hasMetamask) {
      return (
        <>
          {(() => {
            if (
              (direction.value === "BSC" && !ETHApproved) ||
              (direction.value === "ETH" && !BSCApproved)
            ) {
              return (
                <Button onClick={handleApprove}>
                  {(() => {
                    if (direction.value === "BSC")
                      return "Approve Ethereum Contract";
                    if (direction.value === "ETH")
                      return "Approve BSC Contract";
                  })()}
                </Button>
              );
            } else {
              return (
                <div className="flex flex-col">
                  <input
                    className="shadow w-full h-10 rounded-md mb-2 bg-inputbg focus:bg-inputbg-focus hover:bg-inputbg-hover transition-colors duration-75 text-center focus:outline-none"
                    type="number"
                    ref={tokenAmount}
                    placeholder="DANK Amount"
                  />
                  <Button onClick={handleBridge}>Bridge tokens</Button>
                </div>
              );
            }
          })()}
        </>
      );
      // <div
      //   className="px-4 py-2 font-semibold border-white border-opacity-50 hover:border-opacity-100 border-solid border-2 bg-metamask-bg text-metamask-text rounded-full cursor-pointer"
      //   onClick={logInWithMetamask}
      // >
      //   Metamask
      // </div>});
    } else
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
          : "fixed origin-top-left top-0 left-0 z-20 h-screen w-full font-body text-white"
      }
    >
      <div className="flex items-center justify-center h-full w-full">
        <div className="bg-asidebg rounded-xl w-full overflow-hidden max-w-max">
          <div className="text-title text-secondary text-lg font-semibold justify-around max-w-max">
            <div className="w-full flex justify-between mb-3 bg-mainbg">
              <div className="px-10 flex justify-around items-center">
                DANK Bridge
              </div>
              <div
                className="w-14 h-14 flex justify-around cursor-pointer items-center hover:bg-asidebg hover:text-white"
                onClick={props.showLoginModalCommand}
              >
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </div>
            <div className="px-5">
              <Select
                placeholder="Select Bridge Direction"
                value={direction}
                options={[
                  { label: "Ethereum -> BSC", value: "BSC" },
                  { label: "BSC -> Ethereum", value: "ETH" },
                ].map((direction) => ({
                  label: direction.label,
                  value: direction.value,
                }))}
                onChange={setDirection}
              />
              {/* <div className="max-w-max pb-3">Choose your login method:</div> */}
              <div className="flex justify-center space-x-5 py-10 bg-asidebg">
                <MetamaskButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
