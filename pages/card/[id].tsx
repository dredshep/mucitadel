import moment from "moment";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import ReactTimeAgo from "react-time-ago";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { NFTCard } from "../../components/NFTList";
import SellModal from "../../components/SellModal";
import Button from "../../components/styled/Button";
import Link from "../../components/styled/Link";
import WhiteButton from "../../components/styled/WhiteButton";
import Tabs from "../../components/Tabs";
import Select from "../../components/UI/Select";
import capitalizeFirstLetter from "../../functions/capitalizeFirstLetter";
import getCardsFromAPI from "../../functions/getCardsFromAPI";
import { NFT } from "../../types/nft";

type NoLinkPair = {
  pairKey: string;
  value: string;
  info?: string;
};

type LinkPair = {
  pairKey: string;
  value: string;
  link: string;
  external: boolean;
  info?: string;
};

// function Link(props: { href: string; text: string }) {
//   return (
//     <a className="text-mupurple" href={props.href}>
//       {props.text}
//     </a>
//   );
// }

// const CurrencySelector = styled(Select)``;

function ExternalMarker(props: { href: string }) {
  return (
    <a href={props.href} className="text-mupurple">
      <i className="fas fa-external-link-alt"></i>
    </a>
  );
}

function BuySection() {
  return (
    <>
      {/* CURRENCY SECTION */}
      <div className="flex flex-row justify-between w-full mb-8">
        <div className="font-semibold font-title tracking-wide text-secondary">
          Currency
        </div>
        <div className="max-w-sm flex flex-row flex-wrap">
          {"SOUL DANK ETH USD".split(" ").map((currency, i) => (
            <div
              key={currency}
              className={
                "flex flex-col justify-around mb-px rounded-full items-center py-1 px-3 font-bold " +
                (i === 0 ? "bg-mupurple" : "bg-white text-mupurple") +
                " ml-2"
              }
            >
              <div>{currency}</div>
            </div>
          ))}
        </div>
      </div>
      {/* PRICE SECTION */}
      <div className="flex flex-row justify-between w-full mb-8">
        <div className="font-semibold font-title tracking-wide text-secondary">
          Price
        </div>
        <div className="max-w-sm flex flex-col flex-wrap font-bold">
          <div>
            120&nbsp;<span className="text-phantasmablue">SOUL</span>
          </div>
          <div>
            100&nbsp;<span className="text-kcalred">kcal</span>
          </div>
        </div>
      </div>
      {/* BUY BUTTONS SECTION */}
      <div className="mx-auto flex flex-row justify-around font-semibold text-xl">
        <div className="py-2 px-4 rounded-full bg-white text-mupurple flex justify-around items-center">
          <div className="mb-1">Add to cart</div>
        </div>
        <div className="py-2 px-4 rounded-full bg-mupurple text-white flex justify-around items-center ml-6">
          <div className="mb-px">Buy</div>
        </div>
      </div>
    </>
  );
}

function KeyValue(props: NoLinkPair | LinkPair) {
  // const { pairKey, value, link, external } = props
  const pairKeyElement = (
    <div className="font-semibold font-title tracking-wide text-secondary flex-shrink-0 min-w-min">
      {props.pairKey}{" "}
      {props.info ? <i className="fas fa-info-circle"></i> : undefined}
    </div>
  );

  const valueElement = (props as LinkPair).link ? (
    (props as LinkPair).external ? (
      <Link
        href={(props as LinkPair).link}
        children={(props as LinkPair).value}
      />
    ) : (
      <>
        <Link
          href={(props as LinkPair).link}
          children={(props as LinkPair).value}
        />{" "}
        <ExternalMarker href={(props as LinkPair).link} />
      </>
    )
  ) : (
    <>{(props as LinkPair).value}</>
  );
  // const stylizedPairKey = <div>{pairKeyElement}</div>
  const stylizedValue = (
    <div
      className="max-w-full text-left break-words"
      style={{ maxWidth: "60%" }}
    >
      {valueElement}
    </div>
  );

  return (
    <div className="flex flex-row justify-between w-full mb-3">
      {pairKeyElement} {stylizedValue}
    </div>
  );
}

// const Card = (
//   <div className="mt-auto mb-auto font-title rounded-lg text-sm font-bold w-60 flex-col bg-purple-300 overflow-hidden">
//     <div className="bg-success flex justify-around items-center h-8">
//       <div className="tracking-wider">#1031</div>
//     </div>

//     <div className="bg-mupurple flex justify-between px-4 py-1">
//       <div>Epic</div>
//       <div>100 kcal</div>
//     </div>
//     <div>
//       <img
//         className="max-w-full"
//         src="images/pete-card.jpg"
//         alt="Voiceover Pete"
//       />
//     </div>
//     <div className="bg-phantasmablue flex justify-between px-4 py-1">
//       <div>120 SOUL</div>
//       <div>$42.69</div>
//     </div>
//   </div>
// );

// TODO
// MAKE A FUNCTION THAT SENDS OR RECEIVES .INFO PROP TO ADD IT AS A POPUP TO THE ICON..
// till then, .info is deprecated.
function makeProp(pairKey: string, value: string): NoLinkPair;
function makeProp(
  pairKey: string,
  value: string,
  link: string,
  external: boolean
): LinkPair;
function makeProp(
  pairKey: string,
  value: string,
  link?: string,
  external?: boolean
) {
  if (link) {
    return {
      pairKey,
      value,
      link,
      external,
      key: pairKey,
    } as LinkPair;
  }
  return {
    pairKey,
    value,
    key: pairKey,
  } as NoLinkPair;
}

function NFTDetails(props: NFT) {
  const entries: (LinkPair | NoLinkPair)[] = [
    {
      pairKey: "Smart Contract",
      value: "GHOST",
      link: "https://explorer.phantasma.io/token/GHOST",
      external: true,
    } as LinkPair,
    {
      pairKey: "NFT ID",
      value:
        "104920549433542394393888664408303023894970105957056315840031505911066476125106",
    } as NoLinkPair,
    {
      pairKey: "Blockchain",
      value: "Phantasma",
      link: "https://ghostmarket.io/assets/pha/",
      external: false,
    } as LinkPair,
  ].map((obj) => makeProp(...(Object.values(obj) as [string, string])));

  return (
    <div className="flex flex-col p-8 bg-asidebg rounded-none box-border lg:rounded-xl w-full max-w-full lg:w-auto lg:max-w-md">
      {/* <div className="w-96"><img className="w-full" src="/images/pete-card.jpg" /></div> */}
      {/* <div className="text-lg font-bold">Voiceover Pete</div> */}
      <div className="text-3xl font-bold mb-5 font-title">NFT Details</div>
      {entries.map((entry) => (
        <KeyValue {...entry} />
      ))}
    </div>
  );
}

function SeriesDetails() {
  const props: (LinkPair | NoLinkPair)[] = [
    {
      pairKey: "Series ID",
      value: "475",
      link: "https://ghostmarket.io/assets/pha/ghost/?series_id=475",
      external: true,
    } as LinkPair,
    {
      pairKey: "Series Royalties",
      value: "10%",
      info: "10% of all sales will be paid to the original creator: uniqueart",
    } as NoLinkPair /*as NoLinkPair, {
      pairKey: "Series Royalties",
      value: "10%"
    }*/,
    {
      pairKey: "Series Current Supply",
      value: "2",
    },
    {
      pairKey: "Series Maximum Supply",
      value: "2",
    },
  ].map((obj) => makeProp(...(Object.values(obj) as [string, string])));

  return (
    <div className="flex flex-col p-8 bg-asidebg rounded-none lg:rounded-xl w-full lg:w-96">
      {/* <div className="w-96"><img className="w-full" src="/images/pete-card.jpg" /></div> */}
      {/* <div className="text-lg font-bold">Voiceover Pete</div> */}
      <div className="text-3xl font-bold mb-5 font-title">Series Details</div>
      {props.map((props) => (
        <KeyValue {...props} />
      ))}
    </div>
  );
}

function RelatedSection(props: { cards: NFT[] }) {
  const toDisplay = props.cards.slice(0, 2);
  const title = (
    <div className="text-3xl font-bold mb-9 mt-10 mx-auto md:mx-0">
      Related Cards
    </div>
  );
  const cards = (
    <div className="flex flex-col md:flex-row mx-auto justify-center w-max md:w-full box-border">
      {(() => {
        return toDisplay.map((card) => (
          <div>
            <NFTCard
              {...card}
              // {...props.cards[1]}
              href={`/card/${card.id}`}
              currency={card.price.USD ? "USD" : Object.keys(card.price)[0]}
            />
          </div>
        ));
      })()}
    </div>
  );
  return (
    <>
      {title} {cards}
    </>
  );
}

const keyTextClass = "text-secondary font-semibold font-title";
const valueTextClass = "text-white font-body";

function Product2(props: NFT) {
  const [currency, setCurrency] = useState("dank");
  const [showSellModal, setShowSellModal] = useState(false);

  const getPriceListFromPriceObj = (priceObj: { [key: string]: number }) =>
    Object.entries(priceObj).map(
      (pricePair) => pricePair[1] + " " + pricePair[0].toUpperCase()
    );

  const handleBuy = () => {
    alert(JSON.stringify(props, null, 2));
  };

  const handleSell = () => {
    alert(JSON.stringify(props, null, 2));
    setShowSellModal(true);
  };

  const handleCloseSellModal = () => {
    setShowSellModal(false);
  };

  return (
    <div className="flex flex-row px-5 pb-5 md:py-0 md:px-0 space-x-0 md:space-x-5 bg-asidebg rounded-none md:rounded-xl mt-0 md:mt-10 w-full max-w-lg md:max-w-3xl mx-auto">
      <div className="hidden md:flex flex-shrink-0" style={{ width: "45%" }}>
        <img
          className="object-contain"
          // src={"/images/cards/full-size/" + props.url}
          src={props.url}
        />
      </div>
      <div className="w-full">
        <div className="flex flex-row items-center mt-5">
          <div className="w-24 xs:w-24 flex-shrink-0 mr-3 md:hidden">
            <img
              className="w-full object-cover"
              // src={"/images/cards/346x461/" + props.url}
              src={props.url}
            />
          </div>
          <div>
            {/* <div className="text-success font-semibold text-lg leading-3 font-body">
              Market Rank: 137
            </div> */}
            <div className="mt-4 text-white font-bold text-2xl xs:text-4xl leading-9 font-title">
              {props.name}
            </div>
            <div className="mt-3 text-secondary font-semibold text-lg leading-3 font-body">
              {props.tier.charAt(0).toUpperCase() + props.tier.slice(1)}
            </div>
          </div>
        </div>
        <div className="flex flex-row mt-6 justify-start md:justify-between">
          <div className="flex flex-col w-7/12 xs:w-2/3 md:w-44">
            <div className={keyTextClass + " mb-2"}>Price</div>
            <div className={valueTextClass + " font-semibold text-lg"}>
              {/* {props.soul} */}
              {/* {currencyButton} */}
              <Select
                placeholder="Select Price"
                value={currency}
                options={getPriceListFromPriceObj(props.price).map((price) => ({
                  label: price,
                  value: price,
                }))}
                onChange={setCurrency}
              />
            </div>
          </div>
          <div className="flex flex-col w-5/12 xs:w-1/3 md:w-44 ">
            <div className={keyTextClass + " mb-2"}>Mint Edition</div>
            <div className={valueTextClass}>{`${
              props.mints.totalMints - props.mints.sold
            } out of ${props.mints.totalMints}`}</div>
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-col h-56">
          <Tabs>
            {/* CHILD 1 */}
            <div className="mt-5 font-body mr-5">{props.description}</div>
            {/* CHILD 2 */}
            <div className="flex flex-col space-y-3 mt-5 pr-5">
              {/* Row 1 */}
              <div className="flex flex-row justify-between font-body">
                <div className={keyTextClass}>Owner</div>
                <div className="text-white">
                  <Link
                    className="text-mupurple"
                    href={`${props.blockExplorerBaseUrl}address/${props.owner}`}
                  >
                    {props.shortOwner}
                  </Link>
                </div>
              </div>
              {/* Row 2 */}
              <div className="flex flex-row justify-between font-body">
                <div className={keyTextClass}>Mint date</div>
                <div className="text-white">
                  {moment.utc(props.mintDate).format("MMM DD, YYYY")}
                </div>
              </div>
              {/* Row 3 */}
              <div className="flex flex-row justify-between font-body">
                <div className={keyTextClass}>Blockchain</div>
                <div className="text-white">
                  {/* {moment.utc(props.listedUntil).format("MMM DD, YYYY")} */}
                  <Link href={props.blockExplorerBaseUrl}>
                    {capitalizeFirstLetter(props.blockchain)}
                  </Link>
                </div>
              </div>
            </div>
          </Tabs>
          {/* <div>
            <div className="flex h-12 text-base font-body mt-2 text-secondary">
              <div className="border-b-2 border-inputbg w-40 h-full flex items-center box-content">
                Description
              </div>
              <div className="border-b-2 border-mupurple h-full flex items-center w-full box-content pl-5">
                Details
              </div>
            </div>
            <div className="flex flex-col space-y-3 mt-5 pr-5">
              <div className="flex flex-row justify-between font-body">
                <div className={keyTextClass}>Owner</div>
                <div className="text-white">
                  <Link className="text-mupurple">{props.owner}</Link>
                </div>
              </div>
              <div className="flex flex-row justify-between font-body">
                <div className={keyTextClass}>Mint date</div>
                <div className="text-white">
                  {moment.utc(props.mintDate).format("MMM DD, YYYY")}
                </div>
              </div>
              <div className="flex flex-row justify-between font-body">
                <div className={keyTextClass}>Listed until</div>
                <div className="text-white">
                  {moment.utc(props.listedUntil).format("MMM DD, YYYY")}
                </div>
              </div>
            </div>
          </div> */}
          {/* BUY BUTTONS SECTION */}
          {/* <div className="flex flex-row font-semibold text-xl justify-start md:justify-center space-x-5 mt-4 w-full">
          <div className="w-1/2 md:w-auto px-6 rounded-full bg-white text-mupurple flex justify-around items-center ml-0 md:ml-6"><div className="pt-1 pb-1 md:pt-1 md:pb-1.5 leading-loose align-middle">Buy</div></div>
          <div className="w-1/2 md:w-auto px-6 rounded-full bg-mupurple text-white flex justify-around items-center"><div className="pt-1 pb-1 md:pt-1 md:pb-1.5 leading-loose align-middle">Add to wishlist</div></div>
        </div> mt-6 md:mt-4 */}
          <div className="flex row w-full h-full items-end justify-center">
            <WhiteButton className="w-1/2 text-lg mr-3" onClick={handleBuy}>
              Buy
            </WhiteButton>
            <Button className="w-1/2 text-lg mr-6" onClick={handleSell}>
              Sell
            </Button>
            {/* <Button className="w-full ml-4 mr-4 text-lg"> // ant: disable wishlist feature
              Add to wishlist
            </Button> */}
          </div>
          {/* <div className="flex row w-full h-full items-end justify-center"> */}
          {/* <WhiteButton className="w-1/2 text-lg mr-6">Buy</WhiteButton> */}
          {/* <Button className="w-full ml-4 mr-4 text-lg"> // ant: disable wishlist feature
              Add to wishlist
            </Button> */}
          {/* </div> */}
          {/* <div className="flex flex-row font-semibold text-sm xs:text-xl justify-start md:justify-center space-x-2 xs:space-x-5  my-4 w-full">
            <div className="w-1/2 md:w-auto px-3 tiny:px-6 rounded-full bg-white text-mupurple flex justify-around items-center ml-0 md:ml-6">
              <div className="pt-1 pb-1 md:pt-1 md:pb-1 leading-loose align-middle">
                Buy
              </div>
            </div>
            <div className="w-1/2 md:w-auto px-3 tiny:px-6 rounded-full bg-mupurple text-white flex justify-around items-center">
              <div className="pt-1 pb-1 md:pt-1 md:pb-1 leading-loose align-middle">
                Add to wishlist
              </div>
            </div>
          </div> */}
          <SellModal
            visible={showSellModal}
            tokenId={props.id}
            onCloseModal={handleCloseSellModal}
          />
        </div>
      </div>
    </div>
  );
}

function MiniExplorer(props) {
  const metaData = {
    totalCount: 100,
    pageCount: 25,
    currentPage: 1,
    perPage: 4,
  };

  const paginationHandler = (page) => {
    // Will uncomment this once the API for event segregation is added
    // const currentPath = props.router.pathname;
    // const currentQuery = props.router.query;
    // currentQuery.page = page.selected + 1;
    // props.router.push({
    //     pathname: currentPath,
    //     query: currentQuery,
    // });
  };
  type Event = {
    totalCount: number;
    pageCount: number;
    currentPage: number;
    perPage: number;
    type: "cancelled" | "minted" | "infused" | "listed";
    date: Date;
    username: string;
    account: string;
    amount?: string;
    transaction: string;
  };
  const exampleEvents = [
    {
      totalCount: 6,
      pageCount: 2,
      currentPage: 1,
      perPage: 4,
      type: "listed",
      date: new Date("Sat, 27 Feb 2021 18:48:43 GMT"),
      username: "moonsawyer1331",
      account: "P2K6h65yT8rx5pgAjSkAfhTAhRU7mRCJWYv6AbHewyGQQrg",
      amount: "420.69 DANK",
      transaction:
        "F7A1FEB2A2525F373427AC9027B0ADED2E4B51C4A1F9559B85B4DB969173608D",
    } as Event,
    {
      totalCount: 6,
      pageCount: 2,
      currentPage: 1,
      perPage: 4,
      type: "infused",
      date: new Date("Sat, 27 Feb 2021 18:48:43 GMT "),
      username: "moonsawyer1331",
      account: "P2K6h65yT8rx5pgAjSkAfhTAhRU7mRCJWYv6AbHewyGQQrg",
      amount: "1 KCAL",
      transaction:
        "F7A1FEB2A2525F373427AC9027B0ADED2E4B51C4A1F9559B85B4DB969173608D",
    } as Event,
    {
      totalCount: 6,
      pageCount: 2,
      currentPage: 1,
      perPage: 4,
      type: "minted",
      date: new Date("Sat, 27 Feb 2021 18:48:43 GMT "),
      username: "moonsawyer1331",
      account: "P2K6h65yT8rx5pgAjSkAfhTAhRU7mRCJWYv6AbHewyGQQrg",
      transaction:
        "F7A1FEB2A2525F373427AC9027B0ADED2E4B51C4A1F9559B85B4DB969173608D",
    } as Event,
    {
      totalCount: 6,
      pageCount: 2,
      currentPage: 1,
      perPage: 4,
      type: "cancelled",
      date: new Date("Mon, 01 Mar 2021 22:18:32 GMT"),
      username: "moonsawyer1331",
      account: "P2K6h65yT8rx5pgAjSkAfhTAhRU7mRCJWYv6AbHewyGQQrg",
      transaction:
        "F7A1FEB2A2525F373427AC9027B0ADED2E4B51C4A1F9559B85B4DB969173608D",
    } as Event,
  ];

  function Phrasing(event: Event, key: number) {
    const surroundOrSpace = (s: string) =>
      s.length > 1 ? ` ${s} ${event.amount} ` : ` `;
    const appendedWord =
      event.type === "infused" ? "with" : event.type === "listed" ? "for" : "";
    const joiner = surroundOrSpace(appendedWord);

    return (
      <div className="whitespace-pre-wrap mb-3" key={key}>
        <Link
          className="text-mupurple"
          href={"https://ghostmarket.io/account/pha/" + event.account}
        >
          {event.username}
        </Link>{" "}
        {event.type}
        {joiner}
        <Link
          className="text-mupurple ml-auto"
          href={"https://https://explorer.phantasma.io/tx/" + event.transaction}
        >
          <ReactTimeAgo date={event.date} locale="en-US" />
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-asidebg rounded-none w-full lg:w-max lg:rounded-xl p-8 font-body">
      <div className="text-3xl font-bold mb-5 font-title">Event History</div>
      {exampleEvents.map((event, index) => Phrasing(event, index))}

      {/* Pagination Starts from Here */}
      <div className="whitespace-pre-wrap mb-3 paginationClass">
        <ReactPaginate
          previousLabel={"<<"}
          nextLabel={">>"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          activeClassName={"active"}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          initialPage={metaData.currentPage - 1}
          pageCount={metaData.pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={5}
          onPageChange={paginationHandler}
        />
      </div>
    </div>
  );
}

//
// <div className="flex flex-row h-full mt-10 p-8 bg-asidebg rounded-xl">
// {/* <div className="w-96"><img className="w-full" src="/images/pete-card.jpg" /></div> */}
// {/* <div className="text-lg font-bold">Voiceover Pete</div> */}
// <div className="flex flex-col items-center">
//   <div className="text-3xl font-bold">Voiceover Pete</div>
//   {Card}
// </div>
// {propsSection}
// </div>

function Content({ cardArr }) {
  // const [cardArr, setCards] = useState([]);
  // useEffect(() => {
  //   const getCards = async () =>
  //     setCards(
  //       (
  //         await axios.get(
  //           "https://api.mucitadel.io/v1/nft/listnfts?page=1&per_page=100"
  //         )
  //       ).data.data.data
  //     );
  //   getCards();
  //   // return () => {
  //   // }
  // }, []);
  if (!cardArr.length) return <div>Loading...</div>;
  const router = useRouter();
  const currentCard = cardArr.find((card) => card.id === router.query.id);
  console.log({ currentCard });
  const mainProps: (LinkPair | NoLinkPair)[] = [
    {
      pairKey: "Current Owner",
      value: "moonsawyer1331",
      link: "https://ghostmarket.io/account/pha/P2K6h65yT8rx5pgAjSkAfhTAhRU7mRCJWYv6AbHewyGQQrg/",
      external: false,
    } as LinkPair,
    {
      pairKey: "Minted On",
      value: "2/27/2021, 2:48:43 PM",
    } as NoLinkPair,
    {
      pairKey: "Mint Number",
      value: "1 out of 1",
    } as NoLinkPair,
    {
      pairKey: "Current Listing",
      value: "Sat Feb 27 2021 to Mon Mar 29 2021",
    } as NoLinkPair,
  ].map((obj) => makeProp(...(Object.values(obj) as [string, string])));
  if (currentCard) {
    mainProps.push(makeProp("Description", currentCard.description));
  }
  const propsSection = (
    <div className="flex flex-col items-start w-full ml-10">
      {mainProps.map((props) => (
        <KeyValue {...props} />
      ))}
      <BuySection />
    </div>
  );
  return (
    <div className="px-0 xl:px-32 flex flex-col pb-16">
      <Product2 {...currentCard} />
      <div className="flex flex-col lg:flex-row flex-wrap lg:space-x-10 justify-start lg:justify-center w-full space-y-3 lg:space-y-0 mt-3 lg:mt-10 mx-auto">
        <div className="mb-0 lg:mb-10 max-w-full">
          <NFTDetails {...currentCard} />
        </div>
        {/* <div className="mb-0 lg:mb-10 max-w-full">
          <SeriesDetails />
        </div> */}
        {/* <div className="mb-0 lg:mb-10 max-w-full">
          <MiniExplorer />
        </div> */}
      </div>
      <div className="w-full text-center">
        <RelatedSection
          cards={cardArr.filter(
            (x: NFT) => x.tier === (currentCard as NFT).tier
          )}
        />
      </div>
    </div>
  );
}

export default function Home(props) {
  return (
    <div className="App text-white bg-mainbg min-h-screen font-body">
      <NavBar {...props} />
      <Content cardArr={props.nftList} />

      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const nftList: NFT[] = await getCardsFromAPI();
  return { props: { nftList } };
};
