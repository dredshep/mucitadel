import Head from "next/head";
import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import {
  AuthData,
  LogIn,
  LogOut,
} from "../components/types/AuthenticationProvider";

function Content() {
  return (
    <div className="w-full h-full">
      <div className="w-full">
        <img
          className="w-full"
          src="images/layout.png"
          alt="Memeunity Card Carrousel"
        />
      </div>
    </div>
  );
}

export default function Landing(props: {
  logIn: LogIn;
  logOut: LogOut;
  authData: AuthData;
}) {
  return (
    <div className="App text-white bg-mainbg min-h-screen overflow-y-hidden font-body">
      <Head>
        <title>MU Citadel - the tree where memes grow</title>
      </Head>
      <NavBar {...props} />
      <Content />
      <Footer />
    </div>
  );
}
