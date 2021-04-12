// import fs from "fs";
// import { join } from "path";
import sampleCardsJson from "../../assets/samplecards.json";
// console.log(__dirname);
// const sampleCardsJson = fs.readFileSync(
//   join(__dirname, "assets", "samplecards.json"),
//   "utf-8"
// );

export default (req, res) => {
  res.status(200).json(sampleCardsJson);
};
