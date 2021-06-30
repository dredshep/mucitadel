import { faInfoCircle, faShareAlt, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useRef } from 'react'
import { ORDER_TYPES } from '../../constant'
import capitalizeFirstLetter from '../../functions/capitalizeFirstLetter'
import { NFT } from '../../types/nft'

function useOutsideAlerter(
  ref: React.MutableRefObject<any>,
  showPopdown: React.Dispatch<React.SetStateAction<boolean>>,
) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        showPopdown(false)
      }
    }
    // Bind the event listener
    document.addEventListener('mouseup', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mouseup', handleClickOutside)
    }
  }, [ref])
}

export function NFTCard(props: NFT & { href: string; currency: string }) {
  const [popdownIsVisible, showPopdown] = React.useState(false)
  const router = useRouter()
  console.log(props.id)

  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef, showPopdown)

  const handleViewInfo = (event) => {
    event.stopPropagation()
    alert('Info button clicked')
  }

  const handleAddShoppingCart = (event) => {
    event.stopPropagation()
    alert('Shopping cart button clicked')
  }

  const handleShare = (event) => {
    event.stopPropagation()
    alert('Share button clicked')
  }

  const handleClick = (e: any) => {
    e.preventDefault()
    router.push(props.href)
  }
  const mouseDownHandler = (e: any) => {
    e.preventDefault()
    if (e.button === 1) {
      // open in new tab
    }
    if (e.button === 0) {
      // open in this tab
    }
  }
  return (
    <div key={props.name} className={props.className + ' h-full relative'}>
      <div onClick={handleClick} onMouseDown={mouseDownHandler}>
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
                // src={`/images/cards/346x461/${props.url}`}
                src={props.url}
                alt={props.name}
              />
            </div>
            {/* Metadata */}
            <div className="text-base w-40 tiny:w-44 xlish:w-56 px-2 xlish:px-4 flex flex-col justify-between py-4 xlish:py-6">
              <div className="flex flex-row justify-between items-center">
                <div className="font-title text-secondary text-xs md:text-sm font-semibold">Blockchain</div>
                <div className="font-base font-body">{capitalizeFirstLetter(props.blockchain)}</div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="font-title text-secondary text-xs md:text-sm font-semibold">Tier</div>
                <div className="font-base font-body">{props.tier.charAt(0).toUpperCase() + props.tier.slice(1)}</div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="font-title text-secondary text-xs md:text-sm font-semibold">Mints for sale</div>
                <div className="font-base font-body">{`${props.mints.forSale} of ${props.mints.available}`}</div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="font-title text-secondary text-xs md:text-sm font-semibold">Price</div>
                <div className="font-base font-body">
                  {props.price?.[props.currency] || 'Not for sale'}{' '}
                  {props.price?.[props.currency] ? (
                    <span className="text-phantasmablue uppercase">{props.currency}</span>
                  ) : undefined}
                </div>
              </div>
            </div>
          </div>
          <div className="flex list-none bg-mupurple rounded-b-3xl h-9 lg:h-10">
            <li
              onClick={handleViewInfo}
              className="w-full h-full flex items-center justify-center hover:bg-mupurple-hover cursor-pointer rounded-bl-3xl"
            >
              <FontAwesomeIcon icon={faInfoCircle} />
            </li>
            <li
              onClick={handleShare}
              className="w-full h-full flex items-center justify-center hover:bg-mupurple-hover cursor-pointer"
            >
              <FontAwesomeIcon icon={faShareAlt} />
            </li>
            {/* <li className="w-full h-full flex items-center justify-center"> // ant: disable wishlist feature
              <FontAwesomeIcon icon={faHeart} />
            </li> */}
            <li
              onClick={handleAddShoppingCart}
              className="w-full h-full flex items-center justify-center font-bold font-title hover:bg-mupurple-hover cursor-pointer rounded-br-3xl"
            >
              <FontAwesomeIcon icon={faShoppingCart} />
            </li>
          </div>
        </div>
      </div>
    </div>
  )
}

function Container(props: { children: any }) {
  return <div className="px-auto">{props.children}</div>
}

function NFTList(props: { configurations?: any; searchTerm?: string; nftList: NFT[] }) {
  const { configurations, searchTerm = '', nftList } = props

  const sortedList = useMemo(() => {
    let sortedList = [...(nftList || [])]
    const isValidString = (s: string) => typeof s === 'string' && s.length > 0
    const isValidNumber = (n: number) => typeof n === 'number' && n > 0

    if (configurations) {
      // only set currency
      sortedList = sortedList.filter((nft) => {
        const ifNotFirstTrueOtherwiseSecond = (condition1, condition2) => (condition1 ? true : condition2)
        const hasCurrency = nft.price?.[configurations.currency]
        const fitsSearch = ifNotFirstTrueOtherwiseSecond(
          !isValidString(searchTerm),
          nft.name.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        const isTier = ifNotFirstTrueOtherwiseSecond(
          !isValidString(configurations.tier),
          nft.tier === configurations.tier,
        )
        const isAbovePrice = ifNotFirstTrueOtherwiseSecond(
          !isValidNumber(configurations.minPrice),
          nft.price?.[configurations.currency] >= configurations.minPrice,
        )
        const isBelowPrice = ifNotFirstTrueOtherwiseSecond(
          !isValidNumber(configurations.maxPrice),
          nft.price?.[configurations.currency] <= configurations.maxPrice,
        )
        // console.log({hasCurrency, fitsSearch, isTier, isAbovePrice, isBelowPrice})
        return hasCurrency && fitsSearch && isTier && isAbovePrice && isBelowPrice
      })

      if (configurations.orderType === ORDER_TYPES.ASCENDING) {
        if (configurations.sortType === 'price') {
          // order by price ascending
          sortedList.sort((nft1, nft2) =>
            nft1.price[configurations.currency] > nft2.price[configurations.currency] ? 1 : -1,
          )
        } else {
          // order by generic string from filtering value ascending
          sortedList.sort((nft1, nft2) => (nft1[configurations.sortType] > nft2[configurations.sortType] ? 1 : -1))
        }
      } else {
        if (configurations.sortType === 'price') {
          // order by price descending
          sortedList.sort((nft1, nft2) =>
            nft1.price[configurations.currency] < nft2.price[configurations.currency] ? 1 : -1,
          )
        } else {
          // order by generic string from filtering value descending
          sortedList.sort((nft1, nft2) => (nft1[configurations.sortType] < nft2[configurations.sortType] ? 1 : -1))
        }
      }
    }

    return sortedList
  }, [nftList, configurations, searchTerm])

  const log = (v: any) => (console.log(v), v)

  return (
    <Container>
      <div className="flex flex-row flex-wrap justify-center mx-auto tiny:-ml-5">
        {sortedList.map((nft: NFT) => (
          <NFTCard
            className="mt-10 mx-auto tiny:mr-5 tiny:ml-5"
            href={'/card/' + nft.id}
            key={nft.id}
            currency={configurations ? configurations.currency : 'USD'}
            {...nft}
          />
        ))}
      </div>
    </Container>
  )
}

export default NFTList
