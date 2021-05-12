import Head from "next/head";
import { useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import NFTList from "../components/NFTList";
import Sidebar from "../components/Sidebar";
import Toolbar from "../components/Toolbar";
import {
  AuthData,
  LogIn,
  LogOut,
} from "../components/types/AuthenticationProvider";
import { CURRENCIES, ORDER_TYPES, SORT_TYPES } from "../constant";

function Content({ searchTerm }) {
  const [configurations, setConfigurations] = useState({
    currency: CURRENCIES[1], // soul
    sortType: SORT_TYPES[1].value, // name
    orderType: ORDER_TYPES.ASCENDING,
  });

  const handleChangeConfiguration = (configurationName) => (value) => {
    setConfigurations({
      ...configurations,
      [configurationName]: value,
    });
  };

  return (
    <div className="flex flex-row h-full">
      <Sidebar />
      <div className="inline-flex flex-col box-border w-full">
        <Toolbar
          currency={configurations.currency}
          sortType={configurations.sortType}
          orderType={configurations.orderType}
          onSelectCurrency={handleChangeConfiguration("currency")}
          onChangeOrderType={handleChangeConfiguration("orderType")}
          onChangeSortType={handleChangeConfiguration("sortType")}
        />
        <NFTList configurations={configurations} searchTerm={searchTerm} />
      </div>
    </div>
  );
}

export default function Home(props: {
  logIn: LogIn;
  logOut: LogOut;
  authData: AuthData;
  hasMetamask: boolean;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="App text-white bg-mainbg min-h-screen overflow-y-hidden font-body">
      <Head>
        <title>MU Citadel - the tree where memes grow</title>
      </Head>
      <NavBar
        sidebar={true}
        term={searchTerm}
        onChangeTerm={setSearchTerm}
        {...props}
      />
      <Content searchTerm={searchTerm} />
      <Footer />
    </div>
  );
}
