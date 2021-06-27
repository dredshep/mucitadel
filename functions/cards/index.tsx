import { NFT } from "../../types/nft";

const isOwner = (nft: NFT, owner: string) => nft.owner === owner;
const isForSale = (nft: NFT) => nft.mints.forSale > 0;
const isCreatorEdition = (nft: NFT) => nft.creator;
const filterByCreator = (nfts: NFT[], creator: string) =>
  nfts.filter((nft) => isCreatorEdition(nft) && isOwner(nft, creator));
const filterByOnlyCreatorNFTs = (nfts: NFT[]) => nfts.filter(isCreatorEdition);
const filterByOnlyForSale = (nfts: NFT[]) => nfts.filter(isForSale);
const filterBySoldByAddress = (nfts: NFT[], owner: string) =>
  nfts.filter((nft) => isForSale(nft) && isOwner(nft, owner));

export default {
  isOwner,
  isForSale,
  isCreatorEdition,
  filterByCreator,
  filterByOnlyCreatorNFTs,
  filterByOnlyForSale,
  filterBySoldByAddress,
};
