import axios from "axios";
import { NFT, RawNFT } from "../types/nft";

function shortenAddress(address) {
  const firstPart = address.slice(0, 15);
  const secondPart = address.slice(address.length - 4, address.length);
  return [firstPart, secondPart].join("...");
}

export default async function () {
  const data = (await axios
    .get("https://api.mucitadel.io/v1/nft/listnfts?page=1&per_page=100")
    .then((res) => res.data.data.data)) as RawNFT[];
  const rates = (await axios.get("https://dankprice.memeunity.com")).data;

  async function processNFTs(rawNFTs: RawNFT[]): Promise<NFT[]> {
    return rawNFTs.map(function (NFT: RawNFT): NFT {
      // prettier-ignore
      const {description,amount,blockchain,blocked,collection,contractadd,created_at,id,ipfsurl,listdate,mintdate,name,owneraddress,price,s3bucketurl,symbol,tier,tokenid,trending} = NFT
      const premergePrices = price.split(",");
      const premergeSymbols = symbol.split(",");
      const mergedPrices: { [key: string]: number } = premergePrices.reduce(
        (prices, price, i) => {
          const _symbol = premergeSymbols[i];
          const isEthy = (s: string) =>
            "ETH,DANK,BNB,MIA,MUU".split(",").includes(s);
          const actualPrice = isEthy(_symbol) ? Number(price) / 1e18 : price;
          return Object.assign(prices, {
            [premergeSymbols[i]]: Number(actualPrice),
          });
        },
        {}
      );

      const blockExplorerBaseUrl = ((blockchain) => {
        if (blockchain === "ethereum") return "https://rinkeby.etherscan.io/";
        if (blockchain === "binance") return "https://testnet.bscscan.com/";
      })(blockchain);

      const shortOwner = shortenAddress(owneraddress);

      if (mergedPrices.DANK) {
        const usdPrice =
          Number(rates.dank_price_usd) * Number(mergedPrices.DANK);
        mergedPrices.USD = Number(usdPrice.toFixed(2));
      } else if (mergedPrices.ETH) {
        const usdPrice = Number(rates.eth_price) * Number(mergedPrices.ETH);
        mergedPrices.USD = Number(usdPrice.toFixed(2));
      }
      return {
        name,
        description,
        id,
        listedUntil: "1985-03-31T00:00:00",
        mintDate: mintdate,
        mints: {
          sold: 0,
          totalMints: Number(amount),
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
      };
    });
  }
  return processNFTs(data);
}
