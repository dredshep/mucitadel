const TIERS = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'nani']

const CURRENCIES = ['ETH', 'DANK', 'USD', 'BNB']

const CURRENCIES_BY_BLOCKCHAIN = [
  { blockchain: 'ethereum', currencies: ['ETH', 'DANK'] },
  { blockchain: 'binance', currencies: ['BNB'] },
]

const SORT_TYPES = [
  { label: 'price', value: 'price' },
  { label: 'name', value: 'name' },
  { label: 'tier', value: 'tier' },
  { label: 'mint date', value: 'mintDate' },
  { label: 'trending', value: 'trending' },
]

const ORDER_TYPES = {
  ASCENDING: 'ascending',
  DESCENDING: 'descending',
}

const MAX_UPLOAD_SIZE = 52428800

export { TIERS, CURRENCIES, CURRENCIES_BY_BLOCKCHAIN, SORT_TYPES, ORDER_TYPES, MAX_UPLOAD_SIZE }
