import {
  faInfoCircle,
  faShareAlt,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ORDER_TYPES } from "../../constant";
import { NFT } from "../../types/nft";
import ActiveLink from "../ActiveLink";

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

export function NFTCard(props: NFT & { href: string }) {
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
                src={`/images/cards/346x461/${props.url}`}
                alt={props.name}
              />
            </div>
            {/* Metadata */}
            <div className="text-base w-40 tiny:w-44 xlish:w-56 px-2 xlish:px-4 flex flex-col justify-between py-4 xlish:py-6">
              <div className="flex flex-row justify-between items-center">
                <div className="font-title text-secondary text-xs md:text-sm font-semibold">
                  Trending Rating
                </div>
                <div className="font-base font-body">{props.trending}</div>
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
                  {props.price[props.currency]}{" "}
                  <span className="text-phantasmablue uppercase">
                    {props.currency}
                  </span>
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
            {/* <li className="w-full h-full flex items-center justify-center"> // ant: disable wishlist feature
              <FontAwesomeIcon icon={faHeart} />
            </li> */}
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

const NFTList = (props: { configurations?: any; searchTerm?: string }) => {
  const { configurations, searchTerm = "" } = props;
  const [nftList, setNftList] = useState([]);
  useEffect(() => {
    const getNftList = async () =>
      setNftList((await axios.get("/api/cards")).data);
    getNftList();
  }, []);

  const sortedList = useMemo(() => {
    let sortedList = [...nftList];
    if (configurations) {
      sortedList = sortedList.filter(
        (nft) => nft.price[configurations.currency]
      );

      if (searchTerm) {
        sortedList = sortedList.filter((nft) =>
          nft.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (configurations.tier) {
        sortedList = sortedList.filter(
          (nft) => nft.tier === configurations.tier
        );
      }

      if (configurations.minPrice) {
        sortedList = sortedList.filter(
          (nft) => nft.price[configurations.currency] >= configurations.minPrice
        );
      }

      if (configurations.maxPrice) {
        sortedList = sortedList.filter(
          (nft) => nft.price[configurations.currency] <= configurations.maxPrice
        );
      }

      if (configurations.orderType === ORDER_TYPES.ASCENDING) {
        if (configurations.sortType === "price") {
          sortedList.sort((nft1, nft2) =>
            nft1.price[configurations.currency] >
            nft2.price[configurations.currency]
              ? 1
              : -1
          );
        } else {
          sortedList.sort((nft1, nft2) =>
            nft1[configurations.sortType] > nft2[configurations.sortType]
              ? 1
              : -1
          );
        }
      } else {
        if (configurations.sortType === "price") {
          sortedList.sort((nft1, nft2) =>
            nft1.price[configurations.currency] <
            nft2.price[configurations.currency]
              ? 1
              : -1
          );
        } else {
          sortedList.sort((nft1, nft2) =>
            nft1[configurations.sortType] < nft2[configurations.sortType]
              ? 1
              : -1
          );
        }
      }
    }

    return sortedList;
  }, [nftList, configurations, searchTerm]);

  return (
    <Container>
      <div className="flex flex-row flex-wrap justify-center mx-auto tiny:-ml-5">
        {sortedList.map((nft, i) => (
          <NFTCard
            className="mt-10 mx-auto tiny:mr-5 tiny:ml-5"
            href={"/card/" + i}
            key={nft.name}
            currency={configurations ? configurations.currency : "usd"}
            {...nft}
          />
        ))}
      </div>
    </Container>
  );
};

export default NFTList;
