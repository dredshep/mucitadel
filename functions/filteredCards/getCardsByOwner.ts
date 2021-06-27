import getCardsFromAPI from "../getCardsFromAPI";

export default (owner: string) =>
  getCardsFromAPI().then((list) => list.filter((card) => card.owner === owner));
