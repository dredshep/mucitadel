const TIERS = ["Common", "Uncommon", "Rare", "Epic", "Legendary", "Nani"];

const CURRENCIES = ["ETH", "SOUL", "USD"];

const SORT_TYPES = [
  { label: "price", value: "price" },
  { label: "name", value: "name" },
  { label: "tier", value: "tier" },
  { label: "mint date", value: "mintDate" },
  { label: "trending", value: "trending" },
];

const ORDER_TYPES = {
  ASCENDING: "ascending",
  DESCENDING: "descending",
};

export { TIERS, CURRENCIES, SORT_TYPES, ORDER_TYPES };
