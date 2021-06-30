export interface MintFormValues {
  Name: string
  Description: string
  Tier: string
  Blockchain: string
  ForSale: boolean
  Currencies: {
    Price: string
    Currency: string
  }[]
  Amount: number
}
