import axios from "axios"
import { NFT, RawNFT } from "../types/nft"

export default async function () {
	const data = await axios.get('https://api.mucitadel.io/v1/nft/listnfts?page=1&per_page=100').then(res => res.data.data.data) as RawNFT[]
	
	function processNFTs (rawNFTs: RawNFT[]): NFT[] {
		return rawNFTs.map(function (NFT: RawNFT): NFT {
			const {description,amount,blockchain,blocked,collection,contractadd,created_at,id,ipfsurl,listdate,mintdate,name,owneraddress,price,s3bucketurl,symbol,tier,tokenid,trending} = NFT
			const premergePrices = price.split(',')
			const premergeSymbols = symbol.split(',')
			const mergedPrices: {[key:string]:number} = premergePrices.reduce((prices, price, i)=>{
				const _symbol = premergeSymbols[i]
				const isEthy = (s:string) => "ETH,DANK,BNB,MIA,MUU".split(',').includes(s)
				const actualPrice = isEthy(_symbol) ? Number(price) / 1e18 : price
				return Object.assign(prices, {
					[premergeSymbols[i]]: Number(actualPrice)
				})
			}, {})
			return {
				// currency: "nothing yet",
				description,
				id,
				listedUntil: "1985-03-31T00:00:00",
				mintDate: mintdate,
				mints: {
					sold: 0,
					totalMints: Number(amount)
				},
				name: name,
				owner: owneraddress,
				price: mergedPrices,
				tier,
				trending: Number(trending),
				url: "https://ipfs.io/ipfs/" + ipfsurl,
			}
		})
	}
	return processNFTs(data)
	
  // return axios.get('https://api.mucitadel.io/v1/nft/listnfts?page=1&per_page=100').then(res => res.data.data.data)
}