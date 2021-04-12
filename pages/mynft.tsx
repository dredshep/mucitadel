import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import Head from "next/head";
import useSWR from "swr";
import Cookies from "universal-cookie";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import {
  AuthData,
  LogIn,
  LogOut,
} from "../components/types/AuthenticationProvider";

const cookies = new Cookies();
const is_metamask_connected = cookies.get("metamask_connected");

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    1, // Mainet
    3, // Ropsten
    4, // Rinkeby
    5, // Goerli
    42, // Kovan
  ],
});

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}
const fetcher = (library) => (...args) => {
  const [method, ...params] = args;
  console.log(method, params);
  return library[method](...params);
};
export const Balance = () => {
  const { account, library } = useWeb3React<Web3Provider>();
  const { data: balance } = useSWR(["getBalance", account, "latest"], {
    fetcher: fetcher(library),
  });
  if (!balance) {
    return <div>...</div>;
  }
  return <div>Balance: {balance.toString()}</div>;
};
export const Wallet = () => {
  const { chainId, account, activate, active } = useWeb3React<Web3Provider>();
  activate(injectedConnector);

  return (
    <div>
      <div>ChainId: {chainId}</div>
      <div>Account: {account}</div>
      <Balance />
    </div>
  );
};
function Content() {
  if (is_metamask_connected) {
    return (
      <Web3ReactProvider getLibrary={getLibrary}>
        <Wallet />
      </Web3ReactProvider>
    );
  } else {
    return <p>this is not connected</p>;
  }
}

export default function MyNFT(props: {
  logIn: LogIn;
  logOut: LogOut;
  authData: AuthData;
}) {
  return (
    <div className="App text-white bg-mainbg min-h-screen overflow-y-hidden font-body">
      <Head>
        <title>MU Citadel - the tree where memes grow</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar sidebar={true} {...props} />
      <Content />
      <Footer />
    </div>
  );
}
