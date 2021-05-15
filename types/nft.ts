export type NFT = {
  name: string;
  owner: string;
  tier: string;
  url: string;
  description: string;
  mints: {
    sold: number;
    totalMints: number;
  };
  price: number;
  mintDate: string;
  listedUntil: string;
  trending: number;
  currency: string;
  className?: string;
};
