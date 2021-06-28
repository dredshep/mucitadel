import { NFT } from "../../types/nft";

const filterByBeingSold = (list: NFT[]) =>
  list.filter((card) => card.mints.forSale > 0);
export default filterByBeingSold;
