import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faInfoCircle,
  faShareAlt,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ActiveLink from "../ActiveLink";

type SampleCard = {
  name: string;
  tier: string;
  url: string;
  description: string;
  soul: number;
  kcal: number;
  className?: string;
};

function useOutsideAlerter(
  ref: React.MutableRefObject<any>,
  showPopdown: React.Dispatch<React.SetStateAction<boolean>>
) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        showPopdown(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref]);
}

export function Card2(props: SampleCard & { href: string }) {
  const randomNumberBetween1and1000 = Math.floor(Math.random() * 1000) + 1;
  const [popdownIsVisible, showPopdown] = React.useState(false);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, showPopdown);
  return (
    <div key={props.name} className={props.className + " h-full relative"}>
      <ActiveLink href={props.href}>
        <div className="rounded-3xl font-title glow-on-hover">
          {/* Title */}
          <div className="bg-mupurple flex row items-center relative h-9 lg:h-10 rounded-t-3xl z-0">
            <div className="text-base xlish:text-lg font-bold tracking-wider w-full flex justify-center">
              {props.name}
            </div>
          </div>
          {/* Container for everything below the title */}
          <div className="flex flex-row bg-asidebg">
            {/* Image */}
            <div className="w-28 tiny:w-32 xlish:w-40 flex-shrink-0">
              <img
                className="max-w-full"
                src={`/images/cards/${props.url}`}
                alt={props.name}
              />
            </div>
            {/* Metadata */}
            <div className="text-base w-40 tiny:w-44 xlish:w-56 px-2 xlish:px-4 flex flex-col justify-between py-4 xlish:py-6">
              <div className="flex flex-row justify-between items-center">
                <div className="font-title text-secondary text-xs md:text-sm font-semibold">
                  Trending Rating
                </div>
                <div className="font-base font-body">
                  {randomNumberBetween1and1000}
                </div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="font-title text-secondary text-xs md:text-sm font-semibold">
                  Tier
                </div>
                <div className="font-base font-body">
                  {props.tier.charAt(0).toUpperCase() + props.tier.slice(1)}
                </div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="font-title text-secondary text-xs md:text-sm font-semibold">
                  kcal
                </div>
                <div className="font-base font-body">{props.kcal}</div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="font-title text-secondary text-xs md:text-sm font-semibold">
                  Price
                </div>
                <div className="font-base font-body">
                  {props.soul} <span className="text-phantasmablue">SOUL</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex list-none bg-mupurple rounded-b-3xl h-9 lg:h-10">
            <li className="w-full h-full flex items-center justify-center">
              <FontAwesomeIcon icon={faInfoCircle} />
            </li>
            <li className="w-full h-full flex items-center justify-center">
              <FontAwesomeIcon icon={faShareAlt} />
            </li>
            <li className="w-full h-full flex items-center justify-center">
              <FontAwesomeIcon icon={faHeart} />
            </li>
            <li className="w-full h-full flex items-center justify-center font-bold font-title">
              <FontAwesomeIcon icon={faShoppingCart} />
            </li>
          </div>
        </div>
      </ActiveLink>
    </div>
  );
}

function Container(props: { children: any }) {
  return <div className="px-auto">{props.children}</div>;
}

export default function Cards2() {
  // const sampleCardsJson = (await axios.get("/api/sampleCards")).data;
  // const sampleCards: SampleCard[] = JSON.parse(sampleCardsJson);
  // console.log(sampleCards);
  const [cards, setCards] = useState([]);
  useEffect(() => {
    const getCards = async () => setCards((await axios.get("/api/cards")).data);
    getCards();
    // return () => {
    // }
  }, []);
  return (
    // <div className="mt-7 grid md:grid-cols-3 2xl:grid-cols-6 xl:grid-cols-2 mx-auto gap-10">
    //   {[...Array(12).keys()].map(() => Card2)}
    // </div>
    <Container>
      <div className="flex flex-row flex-wrap justify-center mx-auto tiny:-ml-5">
        {cards.map((sampleCard, i) => (
          // <ActiveLink href={"/card/" + i} key={sampleCard.name}>
          <Card2
            className="mt-10 mx-auto tiny:mr-5 tiny:ml-5"
            href={"/card/" + i}
            key={sampleCard.name}
            {...sampleCard}
          />
          // </ActiveLink>
        ))}
      </div>
    </Container>
  );
}
