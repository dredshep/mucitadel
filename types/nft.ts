export type NFT = {
  id: string;
  ipfsurl: string;
  name: string;
  owner: string;
  tier: string;
  url: string;
  description: string;
  tokenid: string;
  mints: {
    sold: number;
    totalMints: number;
    forSale: number;
    available: number;
  };
  price: null | {
    [key: string]: number;
  };
  // mintDate: string;
  listedUntil: string;
  trending: number;
  // currency?: string;
  className?: string;
  shortOwner: string;
  blockchain: string;
  contractAddress: string;
  blockExplorerBaseUrl: string;
  creator: boolean;
  listDate: string;
  mintDate: string;
};

// prettier-ignore
export interface RawNFT {
  id:           string;
  owneraddress: string;
  ipfsurl:      string;
  s3bucketurl:  string;
  name:         string;
  tier:         string;
  description:  string;
  amount:       string;
  price:        string;
  symbol:       string;
  blockchain:   string;
  trending:     string;
  blocked:      string;
  collection:   string;
  tokenid:      string;
  contractadd:  string;
  txhash:       string;
  sold:         string;
  bought:       string;
  creator:      string;
  forsale:      string;
  orderid:      string;
  mintdate:     string;
  listdate:     string;
  created_at:   string;
  updated_at:   string;
  className?: string;
}

// export interface RawNFT {
//   id: string;
//   owneraddress: string;
//   ipfsurl: string;
//   s3bucketurl: string;
//   name: string;
//   tier: string;
//   description: string;
//   amount: string;
//   price: string;
//   symbol: string;
//   blockchain: string;
//   trending: string;
//   blocked: boolean;
//   collection: string;
//   tokenid: string;
//   contractadd: string;
//   mintdate: string;
//   listdate: string;
//   created_at: string;
//   updated_at: string;
//   className?: string;
// }
