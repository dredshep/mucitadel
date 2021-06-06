const TIERS = ["titanic", "unprecedented", "rare", "epic", "legendary", "nani"];

const CURRENCIES = ["ETH", "DANK", "USD"];

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

const MAX_UPLOAD_SIZE = 52428800;

export { TIERS, CURRENCIES, SORT_TYPES, ORDER_TYPES, MAX_UPLOAD_SIZE };
