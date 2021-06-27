import axios from "axios";
import { NFT, RawNFT } from "../types/nft";

type Prices = { [key: string]: number };

function shortenAddress(address) {
  const firstPart = address.slice(0, 15);
  const secondPart = address.slice(address.length - 4, address.length);
  return [firstPart, secondPart].join("...");
}

type DankPrice = {
  dank_price_eth: string;
  eth_price: string;
  dank_price_usd: number;
};

const isEthy = (s: string) => "ETH,DANK,BNB,MIA,MUU".split(",").includes(s);
const isNullish = (s: string | null) => s == null || s === "null";
// const isNotNull = (s: string) => s !== null && s !== "null";

const nullIfNull = <T>(notNull: string, returnValue: T): T | null =>
  !isNullish(notNull) ? returnValue : null;

const baseUrlFromBlockchain = (blockchain) => {
  if (blockchain === "ethereum") return "https://rinkeby.etherscan.io/";
  if (blockchain === "binance") return "https://testnet.bscscan.com/";
};

const forceMaxTwoDecimals = (n: number) => Number(n.toFixed(2));

const mergePrices = (
  premergePrices: string[],
  premergeSymbols: string[]
): Prices =>
  premergePrices.reduce((prices, price, i) => {
    const symbol = premergeSymbols[i];
    const actualPrice = isEthy(symbol) ? Number(price) / 1e18 : Number(price);
    return Object.assign(prices, { [premergeSymbols[i]]: actualPrice });
  }, {});

export default async function () {
  // const getData = (): Promise<RawNFT[]> =>
  //   axios
  //     .get("https://api.mucitadel.io/v1/nft/listnfts?page=1&per_page=100")
  //     .then((res) => res.data.data.data);
  // const getRates = () =>
  //   axios.get("https://dankprice.memeunity.com").then((x) => x.data);

  const getAll = (): Promise<[RawNFT[], any]> =>
    new Promise((resolve, reject) =>
      axios
        .all([
          axios.get("https://api.mucitadel.io/v1/nft/listnfts"),
          axios.get("https://dankprice.memeunity.com"),
        ])
        .then(
          axios.spread((obj1, obj2) =>
            resolve([obj1.data.data.data as RawNFT[], obj2.data as DankPrice])
          )
        )
        .catch(reject)
    );

  const [data, rates] = await getAll();

  async function processNFTs(rawNFTs: RawNFT[]): Promise<NFT[]> {
    return rawNFTs.map(function (NFT: RawNFT): NFT {
      const {
        description,
        amount,
        blockchain,
        blocked,
        collection,
        contractadd,
        created_at,
        id,
        ipfsurl,
        listdate,
        mintdate,
        name,
        owneraddress,
        price,
        s3bucketurl,
        symbol,
        tier,
        tokenid,
        trending,
        bought,
        creator,
        forsale,
        orderid,
        sold,
        updated_at,
        txhash,
      } = NFT;
      const premergePrices = price.split(",");
      const premergeSymbols = symbol.split(",");

      const mergedPrices = isNullish(price)
        ? null
        : mergePrices(premergePrices, premergeSymbols);

      const blockExplorerBaseUrl = baseUrlFromBlockchain(blockchain);

      const shortOwner = shortenAddress(owneraddress);

      if (mergedPrices?.DANK) {
        const usdPrice =
          Number(rates.dank_price_usd) * Number(mergedPrices.DANK);
        mergedPrices.USD = forceMaxTwoDecimals(usdPrice);
      } else if (mergedPrices?.ETH) {
        const usdPrice = Number(rates.eth_price) * Number(mergedPrices.ETH);
        mergedPrices.USD = forceMaxTwoDecimals(usdPrice);
      }
      return {
        name,
        description,
        id,
        ipfsurl,
        tokenid,
        listedUntil: "1985-03-31T00:00:00",
        mintDate: mintdate,
        mints: {
          forSale: Number(forsale),
          sold: Number(sold),
          totalMints: Number(amount),
          available: (Number(amount) || 0) - (Number(sold) || 0),
        },
        owner: owneraddress,
        price: mergedPrices,
        tier,
        trending: Number(trending),
        url: "https://ipfs.io/ipfs/" + ipfsurl,
        shortOwner,
        blockchain,
        contractAddress: contractadd,
        blockExplorerBaseUrl,
        creator: NFT.creator === "true",
        listDate: listdate,
      };
    });
  }
  return processNFTs(data);
}
