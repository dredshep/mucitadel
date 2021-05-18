import moment from "moment";
import React from "react";
import Link from "../components/styled/Link";
import Tabs from "../components/Tabs";

export default function TabTest() {
  const keyTextClass = "text-secondary font-semibold font-title";
  const valueTextClass = "text-white font-body";
  const props = {
    owner: "big guy",
    mintDate: new Date(),
    listedUntil: new Date(),
  };
  return (
    <div className="App text-white bg-asidebg min-h-screen overflow-y-hidden font-body">
      <Tabs>
        <div className="mt-5">
          This is the description of the card, which is nothing too fancy, but
          also nothing too unfancy.
        </div>
        {/* CHILD 2 */}
        <div className="flex flex-col space-y-3 mt-5 pr-5">
          {/* Row 1 */}
          <div className="flex flex-row justify-between font-body">
            <div className={keyTextClass}>Owner</div>
            <div className="text-white">
              <Link className="text-mupurple">{props.owner}</Link>
            </div>
          </div>
          {/* Row 2 */}
          <div className="flex flex-row justify-between font-body">
            <div className={keyTextClass}>Mint date</div>
            <div className="text-white">
              {moment.utc(props.mintDate).format("MMM DD, YYYY")}
            </div>
          </div>
          {/* Row 3 */}
          <div className="flex flex-row justify-between font-body">
            <div className={keyTextClass}>Listed until</div>
            <div className="text-white">
              {moment.utc(props.listedUntil).format("MMM DD, YYYY")}
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
