import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import NFTList from "../components/NFTList";
import Sidebar from "../components/Sidebar";
import Toolbar from "../components/Toolbar";
import {
  AuthData,
  LogIn,
  LogOut
} from "../components/types/AuthenticationProvider";
import { CURRENCIES, ORDER_TYPES, SORT_TYPES } from "../constant";
import getCardsFromAPI from "../functions/getCardsFromAPI";
import { NFT } from "../types/nft";

function Content(props: { searchTerm: string, nftList: NFT[] }) {
  const [configurations, setConfigurations] = useState({
    currency: CURRENCIES[2], // USD
    sortType: SORT_TYPES[1].value, // name
    orderType: ORDER_TYPES.ASCENDING,
    minPrice: null,
    maxPrice: null,
    tier: "",
  });

  const handleChangeConfiguration = (configurationName) => (value) => {
    setConfigurations({
      ...configurations,
      [configurationName]: value,
    });
  };

  const handleReleaseFilter = () => {
    setConfigurations({
      ...configurations,
      minPrice: null,
      maxPrice: null,
      tier: "",
    });
  };

  const handleChangePriceRange = (min, max) => {
    setConfigurations({
      ...configurations,
      minPrice: min,
      maxPrice: max,
    });
  };

  return (
    <div className="flex flex-row h-full">
      <Sidebar
        minPrice={configurations.minPrice}
        maxPrice={configurations.maxPrice}
        tier={configurations.tier}
        currency={configurations.currency}
        onSetPriceRange={handleChangePriceRange}
        onSelectTierFilter={handleChangeConfiguration("tier")}
        onSelectCurrency={handleChangeConfiguration("currency")}
      />
      <div className="inline-flex flex-col box-border w-full pb-16">
        <Toolbar
          configurations={configurations}
          onReleaseFilter={handleReleaseFilter}
          onChangeOrderType={handleChangeConfiguration("orderType")}
          onChangeSortType={handleChangeConfiguration("sortType")}
        />
        <NFTList
          configurations={configurations}
          searchTerm={props.searchTerm}
          nftList={props.nftList}
        />
      </div>
    </div>
  );
}

export default function Home(props: {
  logIn: LogIn;
  logOut: LogOut;
  authData: AuthData;
  hasMetamask: boolean;
  nftList: NFT[]
}) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("nftlist", JSON.stringify(props.nftList));
  }, [props.nftList]);

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
      <Content searchTerm={searchTerm} nftList={props.nftList} />
      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const nftList: NFT[] = await getCardsFromAPI()
  return { props: { nftList } }
}
