// import fs from "fs";
// import { join } from "path";
// import sampleCardsJson from "../../assets/samplecards.json";
// console.log(__dirname);
// const sampleCardsJson = fs.readFileSync(
//   join(__dirname, "assets", "samplecards.json"),
//   "utf-8"
// );

import axios from "axios";

export default async (request, response) => {
  axios.get("https://api.mucitadel.io/v1/nft/listnfts?page=1&per_page=100")
    .then(result => {
      const data = result?.data?.data?.data
      if (data) {
        response.status(200).json(data)
      } else if (data.ok !== true) {
        response.status(400).json(data)
      } else {
        response.status(500).json({ok: false, reason: "Unexpected response from server."})
      }
    })
    .catch(err => response.status(500).json({ok: false, reason: "Unexpected response from server."}))
};
