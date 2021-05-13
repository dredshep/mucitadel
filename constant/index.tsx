const TIERS = ["titanic", "unprecedented", "rare", "epic", "legendary", "nani"];

const CURRENCIES = ["eth", "dank", "usd"];

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
