import { useEffect, useState } from "react";

interface Window {
  ethereum: any;
}

export default function MadChild() {
  // const ethereum = ((window as unknown) as Window).ethereum;
  const [string, setString] = useState("nothingyet");
  useEffect(() => {
    const ethereum = ((window as unknown) as Window).ethereum;
    try {
      if (ethereum.isMetaMask) {
        handleEthereum();
      } else if (ethereum && ethereum.isTrust) {
        handleMobile();
      } else {
        window.addEventListener("ethereum#initialized", handleEthereum, {
          once: true,
        });

        // If the event is not dispatched by the end of the timeout,
        // the user probably doesn't have MetaMask installed.
        setTimeout(handleEthereum, 3000); // 3 seconds
      }
    } catch (e) {
      console.error(e);
    }

    async function handleEthereum() {
      if (ethereum && ethereum.isMetaMask) {
        console.log("Ethereum successfully detected!");
        var addresses = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setString(JSON.stringify(addresses));
      } else {
        alert("Please install MetaMask!");
      }
    }

    async function handleMobile() {
      if (ethereum && ethereum.isTrust) {
        console.log("TrustWallet successfully detected!");
        var addresses = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setString(JSON.stringify(addresses));
      } else {
        console.log("Please install MetaMask!");
      }
    }
  });
  // getAddy();

  return <>{string}</>;

  // (async () => {
  //   try {
  //     await ethereum.request({ method: "eth_requestAccounts" });
  //     const addy = await ethereum.request({ method: "eth_accounts" });
  //     return <>{JSON.stringify(addy?.[0])}</>;
  //     // console.log({ addy });
  //     // return addy?.[0] || null;
  //   } catch (e) {
  //     return <>There is nothing to see on this shore.</>;
  //   }
  // })();
  // return <>{string}</>;
}
