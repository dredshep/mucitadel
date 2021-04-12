import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";
import Cards2 from "../components/Cards2";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import Toolbar from "../components/Toolbar";
import {
  AuthData,
  LogIn,
  LogOut,
} from "../components/types/AuthenticationProvider";

function Content() {
  return (
    <div className="flex flex-row h-full">
      <Sidebar />
      <div className="inline-flex flex-col box-border w-full">
        <Toolbar />
        <Cards2 />
      </div>
    </div>
  );
}

function MainLogo() {
  return (
    <img src="/images/White Mask.png" className="h-10" alt="MemeUnity Logo" />
  );
}

function Logo() {
  return (
    <div className="flex flex-row items-center w-48 justify-between">
      <MainLogo />
      <div className="font-title text-xl font-bold tracking-wider">
        MU&nbsp;Citadel
      </div>
    </div>
  );
}
faTimes;

export default function Home(props: {
  logIn: LogIn;
  logOut: LogOut;
  authData: AuthData;
}) {
  return (
    <div className="App text-white bg-mainbg min-h-screen overflow-y-hidden font-body">
      <Head>
        <title>MU Citadel - the tree where memes grow</title>
      </Head>
      <NavBar sidebar={true} {...props} />
      <Content />
      <Footer />
    </div>
  );
}
