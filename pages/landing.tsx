import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Button from "../components/styled/Button";
import {
  AuthData,
  LogIn,
  LogOut,
} from "../components/types/AuthenticationProvider";

function Card(props: {
  rating: string;
  tier: string;
  price: string;
  minted: string;
  kcalOrUSD?: number;
  traits: number;
  url: string;
  name: string;
}) {
  const { rating, tier, price, minted, url, name, traits } = props;
  const [priceString, currency] = price.split(" ");
  const priceNumber = Number(priceString);
  const kcal = props.kcalOrUSD + (currency === "SOUL" ? " kcal" : " USD");

  return (
    <div className="font-title rounded-lg text-lg font-bold flex-col bg-purple-300 overflow-hidden">
      {/* <div className="bg-success flex justify-around items-center h-8">
        <div className="tracking-wider">{rating}</div>
      </div> */}

      <div className="bg-mupurple flex justify-between px-4 py-2">
        <div>{tier}</div>
        <div>{minted}</div>
      </div>
      <div>
        <img className="max-w-full" src={url} alt={name} />
      </div>
      <div className="bg-mupurple flex justify-between px-4 py-2">
        <div>
          {priceString} {currency}
        </div>
        <div>{kcal}</div>
      </div>
    </div>
  );
}

function Content() {
  const [firstJumpEnabled, enableFirstJump] = useState(false);
  const [secondJumpEnabled, enableSecondJump] = useState(false);
  const [thirdJumpEnabled, enableThirdJump] = useState(false);
  const en1 = () => enableFirstJump(true);
  const en2 = () => enableSecondJump(true);
  const en3 = () => enableThirdJump(true);
  useEffect(() => {
    const timer1 = setTimeout(en1, 0);
    const timer2 = setTimeout(en2, 1000);
    const timer3 = setTimeout(en3, 2000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);
  return (
    <div className="w-full h-full font-body">
      {/* <div className="w-full bg-black flex justify-center">
        <img
          // className="w-full object-cover"
          // style={{ height: "640px" }}
          src="images/Carrusel.png"
          alt="Memeunity Card Carrousel"
        />
      </div> */}
      {/* <div className="bg-memeunity-banner bg-no-repeat"> */}
      <div className="pb-20 bg-mainbg">
        <section className="bg-black bg-opacity-50 px-5 md:px-10 lg:px-20">
          <h1 className="mx-auto max-w-max text-4xl font-title font-extrabold tracking-wide py-14 text-mupurple text-center">
            memeunity Membership Card Sale
          </h1>
          <div className="max-w-6xl flex mx-auto flex-col mdish:flex-row">
            {/* <div
                className="flex-shrink-0 flex justify-center relative -ml-12 mt-11 animate-bounce"
                style={{ width: "60%" }}
              >
                <img
                  src="images/cards/full-size/Paula.png"
                  alt="Epic Mia - MU Citadel MemeUnity NFT Card"
                  className="w-56 absolute transform rotate-12 left-96 top-8"
                />
                <img
                  src="images/cards/full-size/Elon Musk.png"
                  alt="Epic Mia - MU Citadel MemeUnity NFT Card"
                  className="w-56 absolute transform -rotate-12 right-96 top-8"
                />
                <img
                  src="images/cards/full-size/epic-mia.png"
                  alt="Epic Mia - MU Citadel MemeUnity NFT Card"
                  className="w-60 absolute"
                />
              </div> */}
            {/* <figure className="flex flex-grow-0 flex-shrink-0 w-full max-w-lg mdish:max-w-sm h-72 items-center mdish:items-end lg:max-w-md lgish:max-w-lg self-center">
              <div className="w-full">
                <img
                  src="images/metal-tiers/bronze-small.png"
                  alt="Bronze MemeUnity Tier for Membership Cards."
                  className="object-contain"
                  style={
                    firstJumpEnabled
                      ? {
                          animation: "bounce 3s infinite",
                          visibility: "visible",
                          transition: "visibility 0s, opacity 0.5s linear",
                          opacity: "1",
                        }
                      : { visibility: "hidden", opacity: "0" }
                  }
                />
              </div>
              <div className="w-full ml-5">
                <img
                  src="images/metal-tiers/silver-small.png"
                  alt="Silver MemeUnity Tier for Membership Cards."
                  className="object-contain"
                  style={
                    secondJumpEnabled
                      ? {
                          animation: "bounce 3s infinite",
                          visibility: "visible",
                          transition: "visibility 0s, opacity 0.5s linear",
                          opacity: "1",
                        }
                      : { visibility: "hidden", opacity: "0" }
                  }
                />
              </div>
              <div className="w-full ml-5">
                <img
                  src="images/metal-tiers/gold-small.png"
                  alt="Gold MemeUnity Tier for Membership Cards."
                  className="object-contain"
                  style={
                    thirdJumpEnabled
                      ? {
                          animation: "bounce 3s infinite",
                          visibility: "visible",
                          transition: "visibility 0s, opacity 0.5s linear",
                          opacity: "1",
                        }
                      : { visibility: "hidden", opacity: "0" }
                  }
                />
              </div>
            </figure>
             */}
            <figure>
              <img
                src="/images/3 cards4.png"
                alt="Three memeunity card tiers: bronze, silver and gold."
              />
            </figure>
            <div className="ml-0 mdish:ml-10 ">
              <h2 className="font-bold text-white font-title text-3xl mb-5">
                Free Bonuses with ALL card purchases!
              </h2>
              <p className="text-secondary-hover">
                We are super excited to offer these super-powered memeunity Membership Card
                bonuses to you all!
                <br />
                <br />
                The two bonuses -{" "}
                <strong className="text-white font-bold">
                  MUU Token Airdrops
                </strong> &{" "}
                <strong className="text-white font-bold">MUCitadel fee discounts!</strong>{" "}
                - membership card buyers/holders will receive varying MUU token
                airdrops + marketplace fee discounts!
                <br />
                <br />
                <strong className="text-white font-bold">
                  MUU Token Airdrops
                </strong>{" "}
                and{" "}
                <strong className="text-white font-bold">MUCitadel fee discounts</strong>{" "}
                will activate when there are{" "}
                <strong className="text-white font-bold">500</strong> membership
                cards sold.
                <br />
                <br />
                <strong className="text-white font-bold">
                  (See below for details)
                </strong>
              </p>
            </div>
          </div>
          <div className="max-w-2xl mx-auto mt-20 pb-5">
            <h2 className="font-bold text-white font-title text-3xl mb-5">
              Get your membership card.
            </h2>
            <p className="text-secondary-hover">
              Here's the chance you???ve been waiting for! You can now get your
              hands on your very own{" "}
              <strong className="text-white font-bold">Membership Card</strong>.
              Just pick one of the three available card types:{" "}
              <strong className="text-white font-bold">GOLD</strong>,{" "}
              <strong className="text-white font-bold">SILVER</strong>, or{" "}
              <strong className="text-white font-bold">BRONZE</strong>. There are
              3 different card designs per tier, each a mystery and
              are equally random in chance!{" "}
            </p>
          </div>
        </section>
        {/* END TOP PART */}
        {/* START CARD INTRO AND BOXES */}
        <div className="px-5 md:px-10 lg:px-20">
          <div className="max-w-2xl mx-auto text-secondary">
            <div className="w-full flex justify-center text-7xl animate-bounce my-14">
              <div className="text-mupurple hover:text-mupurple-hover cursor-pointer">
                <FontAwesomeIcon icon={faCaretDown} />
              </div>
            </div>
            Each category comes with distinct features, although any card has a
            chance of hitting the jackpot with a superb find. You???ll be able to
            see the card 2 weeks after the sale, when our MUCitadel marketplace
            launches. Increase your bonuses by collecting all 3 cards from each
            tier - creating a 3-piece set gives ultimate rewards!
            <br />
            <br />
            Pick from the three available series: GOLD (Nani Tier), with
            only 15 cards ever minted, SILVER (Legendary Tier), with 150 cards
            minted, and BRONZE (Epic Tier), with 1500 cards minted.
            <br />
            <br />
            <em>
              NOTE: Card images shown are{" "}
              <strong className="text-white font-bold">random</strong> and{" "}
              <strong className="text-white font-bold">not a guarantee</strong>{" "}
              of which card you will receive.
            </em>
          </div>
          <div className="max-w-6xl flex flex-wrap lg:flex-nowrap mx-auto mt-10 justify-center">
            <div className="flex flex-col items-center w-full mx-auto lg:mr-4 rounded-2xl py-6 px-3 lg:p-6 bg-asidebg text-center">
              <h1 className="font-extrabold font-title text-3xl mb-2">GOLD</h1>
              <div className="mb-10 text-sm">Membership Card</div>
              {/* <img
                  className="rounded-md"
                  src="images/cards/full-size/epic-mia.png"
                  alt=""
                /> */}
              <Card
                minted="1 of 15"
                name="Epic Mia"
                price="15 ETH"
                rating="1202"
                tier="Nani"
                traits={6}
                url="images/cards/full-size/epic-mia.png"
                kcalOrUSD={40000}
              />
              <div className="mt-10 mb-4">Price:</div>
              <div className="text-4xl text-mupurple font-bold">15 ETH</div>
              <div className="font-semibold text-secondary mt-5">
                Card Tier:
              </div>
              <div>Nani</div>
              <div className="font-semibold text-secondary mt-1">
                Cards Available:
              </div>
              <div>15 of 15</div>
              <div className="font-semibold text-secondary mt-1">
                Chances & Benefits:
              </div>
              <div>Chance of pulling 1 of 3 Nani NFT Designs</div>
              <div>50k MUU Token Airdrop monthly</div>
              <div>100% MUCitadel Fee Discount</div>
              <div><a href="https://cryptomasks.co/shop/">Custom Limited Edition MU Swag Pack</a></div>
              <div>-Limited Edition Placard</div>
              <div>-Limited Edition Canvas Artwork</div>
              <div>-Limited Edition Backpack</div>
              <div>-MU Dank Logo Shirt</div>
              <div>-MU Dank Hat</div>
              <div>-MU Dank Gaiter</div>
              <div className="mt-10 flex flex-gro w-full px-6w items-end px-6">
                <Button className="w-full">BUY GOLD</Button>
              </div>
            </div>
            <div className="flex flex-col items-center w-full mx-auto lg:mx-4 mt-5 lg:mt-0 rounded-2xl px-3 py-6 lg:p-6 bg-asidebg text-center">
              <h1 className="font-extrabold font-title text-3xl mb-2">
                SILVER
              </h1>
              <div className="mb-10 text-sm">Membership Card</div>
              {/* <img
                  className="rounded-md"
                  src="images/cards/full-size/Bunnies.png"
                  alt=""
                /> */}
              <Card
                minted="1 of 150"
                name="Bunnies"
                price="1 ETH"
                rating="1202"
                tier="Legendary"
                traits={6}
                url="images/cards/full-size/Bunnies.png"
                kcalOrUSD={2700}
              />
              <div className="mt-10 mb-4">Price:</div>
              <div className="text-4xl text-mupurple font-bold">1 ETH</div>
              <div className="font-semibold text-secondary mt-5">
                Card Tier:
              </div>
              <div>Legendary</div>
              <div className="font-semibold text-secondary mt-1">
                Cards Available:
              </div>
              <div>150 of 150</div>
              <div className="font-semibold text-secondary mt-1">
                Chances & Benefits:
              </div>
              <div>Chance of pulling 1 of 3 Legendary NFT Designs</div>
              <div>20k MUU Token Airdrop monthly</div>
              <div>50% MUCitadel Marketplace fee discount</div>
              <div><a href="https://cryptomasks.co/shop/">MU Swag Pack (DANK shirt, hat, gaiter)</a></div>
              <div className="mt-10 flex flex-grow items-end w-full px-6">
                <Button className="max-w-full w-full">BUY SILVER</Button>
              </div>
            </div>
            <div className="flex flex-col items-center w-full mx-auto lg:ml-4 mt-5 lg:mt-0 rounded-2xl px-3 py-6 lg:p-6 bg-asidebg text-center">
              <h1 className="font-extrabold font-title text-3xl mb-2">
                BRONZE
              </h1>
              <div className="mb-10 text-sm">Membership Card</div>
              {/* <img className="rounded-md" src="images/cards/full-size/Pete.png" alt="" /> */}
              <Card
                minted="1 of 1500"
                name="Pete"
                price="0.25 ETH"
                rating="1202"
                tier="Epic"
                traits={6}
                url="images/cards/full-size/Voiceover Pete.png"
                kcalOrUSD={680}
              />
              <div className="mt-10 mb-4">Price:</div>
              <div className="text-4xl text-mupurple font-bold">0.25 ETH</div>
              <div className="font-semibold text-secondary mt-5">
                Card Tier:
              </div>
              <div>Epic</div>
              <div className="font-semibold text-secondary mt-1">
                Cards Available:
              </div>
              <div>1500 of 1500</div>
              <div className="font-semibold text-secondary mt-1">
                Chances & Benefits:
              </div>
              <div>Chance of pulling 1 of 3 Epic NFT Designs</div>
              <div>2.5k MUU Token Airdrop monthly</div>
              <div>25% MUCitadel Marketplace fee discount</div>
              <div><a href="https://cryptomasks.co/shop/shirts/memeunity-dank-shirt/">MU DANK Logo Shirt</a></div>
              <div className="mt-10 flex flex-grow items-end w-full px-6">
                <Button className="max-w-full w-full">BUY BRONZE</Button>
              </div>
            </div>
          </div>
          {/* END CARD BOXES */}
          {/* START POST-CARDS */}
          <div className="max-w-2xl bg-highlightbg mx-auto rounded-xl py-5 flex justify-between px-11 mt-20 just-glow">
            <div className="flex flex-col space-y-5 items-center">
              <div>Next BAT Bonus</div>
              <div className="font-title font-extrabold text-5xl">
                3291&nbsp;DANK
              </div>
              <div>Current BAT Bonus: 32.3 ETH</div>
            </div>
            <div className="flex flex-col space-y-5 items-center">
              <div>Next Legendary Upgrade</div>
              <div className="font-title font-extrabold text-5xl">
                513&nbsp;DANK
              </div>
            </div>
          </div>
          <div className="max-w-6xl mx-auto mt-20 flex flex-col sm:flex-row w-full space-x-0 space-y-10 sm:space-y-0 sm:space-x-5">
            <div className="w-full">
              <div className="h-auto sm:h-44">
                <h1 className="text-3xl font-bold font-title mb-3">BONUS 1:</h1>
                <div className="text-secondary">
                  Free BAT tokens reward on every{" "}
                  <strong className="text-white font-normal">5th</strong> common
                  card sale. We???ve created a $5.9 million BAT token pool to
                  reward all future Common card buyers with an equivalent amount
                  of their purchase.
                </div>
              </div>

              <div className="w-full">
                <h1 className="text-2xl font-bold mt-5 mb-3">Example:</h1>
                <div className="text-secondary">
                  If you pay 2.0 ETH for card sale{" "}
                  <strong className="text-white font-normal">5345</strong>, then
                  you will receive that same 2.0 ETH (~$3,400) in BAT tokens. If
                  you are the fifth buyer and you pay 5.0 ETH, then you will
                  receive 5.0 ETH (~$8,500)!
                  <br />
                  <br />
                  <em>
                    Free BAT token rewards on card sales:{" "}
                    <strong className="text-white font-normal">
                      5345, 5340, 5335, 5330...
                    </strong>
                  </em>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="h-auto sm:h-44">
                <h1 className="text-3xl font-bold font-title mb-3">BONUS 2:</h1>
                <div className="text-secondary">
                  FREE Alpha upgrade on every{" "}
                  <strong className="text-white font-normal">25th</strong>{" "}
                  Common card sale.
                </div>
              </div>
              <div className="w-full">
                <h1 className="text-2xl font-bold mt-5 mb-3">Example:</h1>
                <div className="text-secondary">
                  {" "}
                  If you purchase the{" "}
                  <strong className="text-white font-normal">25th</strong> card,
                  you will receive the ability to upgrade your Common card to an
                  Alpha card for free.
                  <br />
                  <br />
                  <em>
                    Free Alpha Card upgrade on card sale:{" "}
                    <strong className="text-white font-normal">
                      5318, 5293, 5268, 5243...
                    </strong>
                    <br />
                    <br />
                    NOTE: $ value is correct at the time of writing and will
                    change based on ETH???s current price.
                  </em>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="max-w-6xl mx-auto flex w-full space-x-5">
          </div> */}
          <div className="max-w-2xl mx-auto mt-20 text-secondary">
            In order to buy your card(s), please ensure your{" "}
            <strong className="text-white font-normal">wallet</strong> is
            connected and funded with enough ETH.
            <br />
            <br />
            <ol>
              <li>Click the "Buy" button on your desired card series</li>
              <li>Agree to the T&Cs</li>
              <li>
                Enter the amount of ETH you would like to spend purchasing cards
                of the selected series*
              </li>
              <li>
                Click buy & confirm the transaction in your wallet if needed
              </li>
              <li>
                You will be redirected to your wallet page with your purchased
                cards showing soon
              </li>
            </ol>
            <br />
            <br />
            If you wish to purchase more cards, please go to the sale page
            through the top menu *Card prices will be taken from the current
            price bracket when the transaction is processed, NOT when you click
            the buy button in step 1.
            <br />
            <br />
            <span className="text-red text-sm">
              *Card prices will be taken from the current price bracket when the
              transaction is processed, NOT when you click the buy button in
              step 1.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Landing(props: {
  logIn: LogIn;
  logOut: LogOut;
  authData: AuthData;
  hasMetamask: boolean;
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
