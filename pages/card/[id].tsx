import Selector from 'components/UI/Selector'
import moment from 'moment'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import BuyModal from '../../components/BuyModal'
import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'
import { NFTCard } from '../../components/NFTList'
import SellModal from '../../components/SellModal'
import Button from '../../components/styled/Button'
import Link from '../../components/styled/Link'
import WhiteButton from '../../components/styled/WhiteButton'
import Tabs from '../../components/Tabs'
import { AuthProps } from '../../components/types/AuthenticationProvider'
import capitalizeFirstLetter from '../../functions/capitalizeFirstLetter'
import cards from '../../functions/cards'
import getCardsFromAPI from '../../functions/getCardsFromAPI'
import { NFT } from '../../types/nft'

interface Window {
  ethereum: any
}

type NoLinkPair = {
  pairKey: string
  value: string
  info?: string
}

type LinkPair = {
  pairKey: string
  value: string
  link: string
  external: boolean
  info?: string
}

function ExternalMarker(props: { href: string }) {
  return (
    <a href={props.href} className="text-mupurple">
      <i className="fas fa-external-link-alt"></i>
    </a>
  )
}

function KeyValue(props: NoLinkPair | LinkPair) {
  // const { pairKey, value, link, external } = props
  const pairKeyElement = (
    <div className="font-semibold font-title tracking-wide text-secondary flex-shrink-0 min-w-min">
      {props.pairKey} {props.info ? <i className="fas fa-info-circle"></i> : undefined}
    </div>
  )

  const valueElement = (props as LinkPair).link ? (
    (props as LinkPair).external ? (
      <Link href={(props as LinkPair).link} children={(props as LinkPair).value} />
    ) : (
      <>
        <Link href={(props as LinkPair).link} children={(props as LinkPair).value} />{' '}
        <ExternalMarker href={(props as LinkPair).link} />
      </>
    )
  ) : (
    <>{(props as LinkPair).value}</>
  )
  // const stylizedPairKey = <div>{pairKeyElement}</div>
  const stylizedValue = (
    <div className="max-w-full text-left break-words" style={{ maxWidth: '60%' }}>
      {valueElement}
    </div>
  )

  return (
    <div className="flex flex-row justify-between w-full mb-3">
      {pairKeyElement} {stylizedValue}
    </div>
  )
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
function makeProp(pairKey: string, value: string): NoLinkPair
function makeProp(pairKey: string, value: string, link: string, external: boolean): LinkPair
function makeProp(pairKey: string, value: string, link?: string, external?: boolean) {
  if (link) {
    return {
      pairKey,
      value,
      link,
      external,
      key: pairKey,
    } as LinkPair
  }
  return {
    pairKey,
    value,
    key: pairKey,
  } as NoLinkPair
}

function NFTDetails(props: NFT) {
  const entries: (LinkPair | NoLinkPair)[] = [
    {
      pairKey: 'Smart Contract',
      value: capitalizeFirstLetter(props.blockchain),
      link: `${props.blockExplorerBaseUrl}address/${props.contractAddress}`,
      external: true,
    } as LinkPair,
    {
      pairKey: 'NFT Owner',
      value: props.shortOwner,
      link: `${props.blockExplorerBaseUrl}address/${props.owner}`,
      external: true,
    } as LinkPair,
    {
      pairKey: 'NFT ID',
      value: props.id,
    } as NoLinkPair,
    {
      pairKey: 'Minted amount',
      value: props.mints.totalMints.toString(),
    } as NoLinkPair,
    // {
    //   pairKey: "Blockchain",
    //   value: "Phantasma",
    //   link: "https://ghostmarket.io/assets/pha/",
    //   external: false,
    // } as LinkPair,
  ].map((obj) => makeProp(...(Object.values(obj) as [string, string])))

  return (
    <div className="flex flex-col p-8 bg-asidebg rounded-none box-border lg:rounded-xl w-full max-w-full lg:w-auto lg:max-w-md">
      {/* <div className="w-96"><img className="w-full" src="/images/pete-card.jpg" /></div> */}
      {/* <div className="text-lg font-bold">Voiceover Pete</div> */}
      <div className="text-3xl font-bold mb-5 font-title">NFT Details</div>
      {entries.map((entry) => (
        <KeyValue {...entry} />
      ))}
    </div>
  )
}

function SeriesDetails() {
  const props: (LinkPair | NoLinkPair)[] = [
    {
      pairKey: 'Series ID',
      value: '475',
      link: 'https://ghostmarket.io/assets/pha/ghost/?series_id=475',
      external: true,
    } as LinkPair,
    {
      pairKey: 'Series Royalties',
      value: '10%',
      info: '10% of all sales will be paid to the original creator: uniqueart',
    } as NoLinkPair /*as NoLinkPair, {
      pairKey: "Series Royalties",
      value: "10%"
    }*/,
    {
      pairKey: 'Series Current Supply',
      value: '2',
    },
    {
      pairKey: 'Series Maximum Supply',
      value: '2',
    },
  ].map((obj) => makeProp(...(Object.values(obj) as [string, string])))

  return (
    <div className="flex flex-col p-8 bg-asidebg rounded-none lg:rounded-xl w-full lg:w-96">
      {/* <div className="w-96"><img className="w-full" src="/images/pete-card.jpg" /></div> */}
      {/* <div className="text-lg font-bold">Voiceover Pete</div> */}
      <div className="text-3xl font-bold mb-5 font-title">Series Details</div>
      {props.map((props) => (
        <KeyValue {...props} />
      ))}
    </div>
  )
}

function RelatedSection(props: { cards: NFT[]; currentNFT: NFT }) {
  const toDisplay = props.cards.filter((x) => x.id !== props.currentNFT.id).slice(0, 2)
  const title = <div className="text-3xl font-bold mb-9 mt-10 mx-auto md:mx-0">Related Cards</div>
  const cards = (
    <div className="flex flex-col md:flex-row mx-auto justify-center w-max md:w-full box-border">
      {(() => {
        return toDisplay.map((card, index) => (
          <div key={index}>
            <NFTCard
              {...card}
              href={`/card/${card.id}`}
              currency={(() => {
                if (card.price) {
                  return card.price?.USD ? 'USD' : Object.keys(card.price)[0]
                } else return null
              })()}
              key={card.id}
            />
          </div>
        ))
      })()}
    </div>
  )
  return (
    <>
      {title} {cards}
    </>
  )
}

const keyTextClass = 'text-secondary font-semibold font-title'
const valueTextClass = 'text-white font-body'

function BuySell(props: {
  handleSell: () => void
  handleBuy: () => void
  nft: NFT
  userAddress: string
  showBuy: boolean
  showSell: boolean
}) {
  const { showBuy, showSell } = props
  const amountOfButtons = [showBuy, showSell].filter((x) => x)

  const { handleBuy, handleSell } = props

  console.log({ showBuy, showSell })

  const wFull = amountOfButtons.length === 1
  const wHalf = amountOfButtons.length === 2

  return (
    <div className="mt-5 mr-5">
      {showBuy && (
        <WhiteButton className={(wFull ? 'w-full' : '') + (wHalf ? 'w-1/2' : '') + ' text-lg'} onClick={handleBuy}>
          Buy
        </WhiteButton>
      )}
      {showSell && (
        <Button className={(wFull ? 'w-full' : '') + (wHalf ? 'w-1/2' : '') + ' w-1/2 text-lg'} onClick={handleSell}>
          Sell
        </Button>
      )}
    </div>
  )
}
function Product2(props: {
  nft: NFT
  setShowBuyModal: any
  setShowSellModal: any
  showBuyModal: boolean
  showSellModal: boolean
  showBuy: boolean
  showSell: boolean
  userAddress: string
}) {
  const { nft, setShowBuyModal, setShowSellModal, showBuyModal, showSellModal, showBuy, showSell } = props

  const [currency, setCurrency] = useState({
    label: '',
    value: '',
  })

  const getPriceListFromPriceObj = (priceObj: { [key: string]: number }) =>
    Object.entries(priceObj).map((pricePair) => pricePair[1] + ' ' + pricePair[0].toUpperCase())

  const handleCloseSellModal = () => {
    setShowSellModal(false)
  }

  return (
    <div className="flex flex-row px-5 pb-5 md:py-0 md:px-0 space-x-0 md:space-x-5 bg-asidebg rounded-none md:rounded-xl mt-0 md:mt-10 w-full max-w-lg md:max-w-3xl mx-auto">
      <div className="hidden md:flex flex-shrink-0" style={{ width: '45%' }}>
        <img
          className="object-contain"
          // src={"/images/cards/full-size/" + nft.url}
          src={nft.url}
        />
      </div>
      <div className="w-full">
        <div className="flex flex-row items-center mt-5">
          <div className="w-24 xs:w-24 flex-shrink-0 mr-3 md:hidden">
            <img
              className="w-full object-cover"
              // src={"/images/cards/346x461/" + nft.url}
              src={nft.url}
            />
          </div>
          <div>
            <div className="text-success font-semibold text-lg leading-3 font-body mt-3">
              {(() => {
                switch (nft.blockchain) {
                  case 'ethereum':
                    return 'Ethereum blockchain'
                  case 'binance':
                    return 'Binance Smart Chain'
                  default:
                    return capitalizeFirstLetter(nft.blockchain)
                }
              })()}
            </div>
            <div className="mt-4 text-white font-bold text-2xl xs:text-4xl leading-9 font-title">{nft.name}</div>
            <div className="mt-3 text-secondary font-semibold text-lg leading-3 font-body">
              {nft.tier?.charAt(0).toUpperCase() + nft.tier?.slice(1)}
            </div>
          </div>
        </div>
        <div className="flex flex-row mt-6 justify-start md:justify-between">
          <div className="flex flex-col w-7/12 xs:w-2/3 md:w-44">
            <div className={keyTextClass + ' mb-2'}>Price</div>
            <div className={valueTextClass + ' font-semibold text-lg'}>
              {/* {nft.soul}
              {currencyButton} */}
              <Selector
                placeholder="Select Price"
                options={
                  !nft.price
                    ? []
                    : getPriceListFromPriceObj(nft.price).map((price) => ({
                        label: price,
                        value: price,
                      }))
                }
                value={currency}
                onChange={(currency) => setCurrency(currency)}
              />
            </div>
          </div>
          <div className="flex flex-col w-5/12 xs:w-1/3 md:w-44 ">
            <div className={keyTextClass + ' mb-2'}>Mints for sale</div>
            <div className={valueTextClass}>{`${nft.mints.forSale} out of ${nft.mints.available}`}</div>
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-col h-56">
          <Tabs>
            {/* CHILD 1 */}
            <div className="mt-5 font-body mr-5">{nft.description}</div>
            {/* CHILD 2 */}
            <div className="flex flex-col space-y-3 mt-5 pr-5">
              {/* Row 1 */}
              <div className="flex flex-row justify-between font-body">
                <div className={keyTextClass}>Owner</div>
                <div className="text-white">
                  <Link
                    className="text-mupurple"
                    href={`/${nft.owner}`}
                    // href={`${nft.blockExplorerBaseUrl}address/${nft.owner}`}
                  >
                    {nft.shortOwner}
                  </Link>
                </div>
              </div>
              {/* Row 2 */}
              <div className="flex flex-row justify-between font-body">
                <div className={keyTextClass}>Mint date</div>
                <div className="text-white">{moment.utc(nft.mintDate).format('MMM DD, YYYY')}</div>
              </div>
              {/* Row 3 */}
              <div className="flex flex-row justify-between font-body">
                <div className={keyTextClass}>Blockchain</div>
                <div className="text-white">
                  {/* {moment.utc(nft.listedUntil).format("MMM DD, YYYY")} */}
                  <Link href={nft.blockExplorerBaseUrl}>{capitalizeFirstLetter(nft.blockchain)}</Link>
                </div>
              </div>
            </div>
          </Tabs>
          <BuySell
            {...{
              handleSell: () => setShowSellModal(true),
              handleBuy: () => setShowBuyModal(true),
              nft,
              userAddress: props.userAddress,
              showBuy,
              showSell,
            }}
          />
          <SellModal visible={showSellModal} tokenId={nft.id} nft={nft} onCloseModal={handleCloseSellModal} />
        </div>
      </div>
    </div>
  )
}

function CardNotFound() {
  return (
    <div className="w-full flex flex-col items-center mt-10 mb-20">
      <h1 className="mx-auto mt-20 text-4xl font-bold">404 - Card not found</h1>
      <a href="/" className="mt-10 mb-20">
        <Button href="/">Click here to go back home</Button>
      </a>
    </div>
  )
}

// function MiniExplorer(props) {
//   const metaData = {
//     totalCount: 100,
//     pageCount: 25,
//     currentPage: 1,
//     perPage: 4,
//   }

//   const paginationHandler = (page) => {
//     // Will uncomment this once the API for event segregation is added
//     // const currentPath = props.router.pathname;
//     // const currentQuery = props.router.query;
//     // currentQuery.page = page.selected + 1;
//     // props.router.push({
//     //     pathname: currentPath,
//     //     query: currentQuery,
//     // });
//   }
//   type Event = {
//     totalCount: number
//     pageCount: number
//     currentPage: number
//     perPage: number
//     type: 'cancelled' | 'minted' | 'infused' | 'listed'
//     date: Date
//     username: string
//     account: string
//     amount?: string
//     transaction: string
//   }
//   const exampleEvents = [
//     {
//       totalCount: 6,
//       pageCount: 2,
//       currentPage: 1,
//       perPage: 4,
//       type: 'listed',
//       date: new Date('Sat, 27 Feb 2021 18:48:43 GMT'),
//       username: 'moonsawyer1331',
//       account: 'P2K6h65yT8rx5pgAjSkAfhTAhRU7mRCJWYv6AbHewyGQQrg',
//       amount: '420.69 DANK',
//       transaction: 'F7A1FEB2A2525F373427AC9027B0ADED2E4B51C4A1F9559B85B4DB969173608D',
//     } as Event,
//     {
//       totalCount: 6,
//       pageCount: 2,
//       currentPage: 1,
//       perPage: 4,
//       type: 'infused',
//       date: new Date('Sat, 27 Feb 2021 18:48:43 GMT '),
//       username: 'moonsawyer1331',
//       account: 'P2K6h65yT8rx5pgAjSkAfhTAhRU7mRCJWYv6AbHewyGQQrg',
//       amount: '1 KCAL',
//       transaction: 'F7A1FEB2A2525F373427AC9027B0ADED2E4B51C4A1F9559B85B4DB969173608D',
//     } as Event,
//     {
//       totalCount: 6,
//       pageCount: 2,
//       currentPage: 1,
//       perPage: 4,
//       type: 'minted',
//       date: new Date('Sat, 27 Feb 2021 18:48:43 GMT '),
//       username: 'moonsawyer1331',
//       account: 'P2K6h65yT8rx5pgAjSkAfhTAhRU7mRCJWYv6AbHewyGQQrg',
//       transaction: 'F7A1FEB2A2525F373427AC9027B0ADED2E4B51C4A1F9559B85B4DB969173608D',
//     } as Event,
//     {
//       totalCount: 6,
//       pageCount: 2,
//       currentPage: 1,
//       perPage: 4,
//       type: 'cancelled',
//       date: new Date('Mon, 01 Mar 2021 22:18:32 GMT'),
//       username: 'moonsawyer1331',
//       account: 'P2K6h65yT8rx5pgAjSkAfhTAhRU7mRCJWYv6AbHewyGQQrg',
//       transaction: 'F7A1FEB2A2525F373427AC9027B0ADED2E4B51C4A1F9559B85B4DB969173608D',
//     } as Event,
//   ]

//   function Phrasing(event: Event, key: number) {
//     const surroundOrSpace = (s: string) => (s.length > 1 ? ` ${s} ${event.amount} ` : ` `)
//     const appendedWord = event.type === 'infused' ? 'with' : event.type === 'listed' ? 'for' : ''
//     const joiner = surroundOrSpace(appendedWord)

//     return (
//       <div className="whitespace-pre-wrap mb-3" key={key}>
//         <Link className="text-mupurple" href={'https://ghostmarket.io/account/pha/' + event.account}>
//           {event.username}
//         </Link>{' '}
//         {event.type}
//         {joiner}
//         <Link className="text-mupurple ml-auto" href={'https://https://explorer.phantasma.io/tx/' + event.transaction}>
//           <ReactTimeAgo date={event.date} locale="en-US" />
//         </Link>
//       </div>
//     )
//   }

//   return (
//     <div className="flex flex-col bg-asidebg rounded-none w-full lg:w-max lg:rounded-xl p-8 font-body">
//       <div className="text-3xl font-bold mb-5 font-title">Event History</div>
//       {exampleEvents.map((event, index) => Phrasing(event, index))}

//       {/* Pagination Starts from Here */}
//       <div className="whitespace-pre-wrap mb-3 paginationClass">
//         <ReactPaginate
//           previousLabel={'<<'}
//           nextLabel={'>>'}
//           breakLabel={'...'}
//           breakClassName={'break-me'}
//           activeClassName={'active'}
//           containerClassName={'pagination'}
//           subContainerClassName={'pages pagination'}
//           initialPage={metaData.currentPage - 1}
//           pageCount={metaData.pageCount}
//           marginPagesDisplayed={1}
//           pageRangeDisplayed={5}
//           onPageChange={paginationHandler}
//         />
//       </div>
//     </div>
//   )
// }

export default function Home(props: AuthProps & { nftList: NFT[]; milliseconds: number; id: string }) {
  const [showBuyModal, setShowBuyModal] = useState(false)
  const [showSellModal, setShowSellModal] = useState(false)
  useEffect(() => console.log(JSON.stringify({ milliseconds: props.milliseconds, id: props.id }, null, 2)))

  if (!props.nftList.length) return <div>Loading...</div>

  const router = useRouter()
  const currentNFT = props.nftList.find((card) => card.id === router.query.id)
  const mainProps: (LinkPair | NoLinkPair)[] = [
    {
      pairKey: 'Current Owner',
      value: 'moonsawyer1331',
      link: 'https://ghostmarket.io/account/pha/P2K6h65yT8rx5pgAjSkAfhTAhRU7mRCJWYv6AbHewyGQQrg/',
      external: false,
    } as LinkPair,
    {
      pairKey: 'Minted On',
      value: '2/27/2021, 2:48:43 PM',
    } as NoLinkPair,
    {
      pairKey: 'Mint Number',
      value: '1 out of 1',
    } as NoLinkPair,
    {
      pairKey: 'Current Listing',
      value: 'Sat Feb 27 2021 to Mon Mar 29 2021',
    } as NoLinkPair,
  ].map((obj) => makeProp(...(Object.values(obj) as [string, string])))

  if (currentNFT) {
    mainProps.push(makeProp('Description', currentNFT.description))
  }

  const userAddress = props.authData.address
  // const { userAddress } = props

  // console.log({ userAddress })
  const isOwner = userAddress && cards.isOwner(currentNFT, userAddress)
  const isForSale = cards.isForSale(currentNFT)
  // const someNotForSale = currentNFT.mints.notForSale > 0
  const canBeSold = cards.canBeSold(currentNFT)
  const showBuy = !isOwner && isForSale
  const showSell = isOwner && canBeSold

  return (
    <>
      <Head>
        <title>{currentNFT?.name || '404 Card Not Found' + ' — MU Citadel'}</title>
      </Head>
      <div className="App text-white bg-mainbg min-h-screen font-body">
        {currentNFT ? (
          <main className={`${(showBuyModal || showSellModal) && 'filter blur-sm'}`}>
            <NavBar {...props} />
            <div className="px-0 xl:px-32 flex flex-col pb-16">
              <Product2
                nft={currentNFT}
                setShowBuyModal={setShowBuyModal}
                setShowSellModal={setShowSellModal}
                showBuyModal={showBuyModal}
                showSellModal={showSellModal}
                userAddress={props.authData.address}
                showBuy={showBuy}
                showSell={showSell}
              />
              <div className="flex flex-col lg:flex-row flex-wrap lg:space-x-10 justify-start lg:justify-center w-full space-y-3 lg:space-y-0 mt-3 lg:mt-10 mx-auto">
                <div className="mb-0 lg:mb-10 max-w-full">
                  <NFTDetails {...currentNFT} />
                </div>
              </div>
              <div className="w-full text-center">
                <RelatedSection
                  currentNFT={currentNFT}
                  cards={props.nftList.filter((x: NFT) => x.tier === (currentNFT as NFT).tier)}
                />
              </div>
            </div>
            {/* : (<CardNotFound />) */}
            <Footer />
          </main>
        ) : (
          <CardNotFound />
        )}

        {showBuy && (
          <BuyModal
            visible={showBuyModal}
            tokenId={currentNFT.id}
            nft={currentNFT}
            onCloseModal={() => setShowBuyModal(false)}
          />
        )}
        {showSell && (
          <SellModal
            visible={showSellModal}
            tokenId={currentNFT.id}
            nft={currentNFT}
            onCloseModal={() => setShowSellModal(false)}
          />
        )}
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id
  const before = new Date().getTime()
  const nftList: NFT[] = await getCardsFromAPI()
  const after = new Date().getTime()
  var milliseconds = Math.abs(before - after)
  return { props: { nftList, milliseconds, id } }
}
