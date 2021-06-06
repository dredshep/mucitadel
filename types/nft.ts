export type NFT = {
  id: string;
  name: string;
  owner: string;
  tier: string;
  url: string;
  description: string;
  mints: {
    sold: number;
    totalMints: number;
  };
  price: {
    [key: string]: number;
  };
  mintDate: string;
  listedUntil: string;
  trending: number;
  // currency?: string;
  className?: string;
};

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
  blocked:      boolean;
  collection:   string;
  tokenid:      string;
  contractadd:  string;
  mintdate:     string;
  listdate:     string;
  created_at:   string;
  updated_at:   string;
  className?: string;
}
