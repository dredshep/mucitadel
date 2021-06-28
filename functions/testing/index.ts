import getCardsFromAPI from "../getCardsFromAPI";
import filterByBeingSold from "../utils/filterByBeingSold";

filterByBeingSold;

async function main() {
  const allCards = await getCardsFromAPI();
  const beingSold = filterByBeingSold(allCards);
  console.log({ total: allCards.length, sold: beingSold.length });
}
main();
export default {};
