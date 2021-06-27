import { NFT } from "../../types/nft";

export default (list: NFT[]) => list.filter((card) => card.mints.forSale);
