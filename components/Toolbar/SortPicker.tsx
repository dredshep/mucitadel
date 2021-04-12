import {
  faSortAmountDown,
  faSortAmountUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const sortSelectors = "price,name,tier,mint date,trending"
  .split(",")
  .map((key, i) => (
    <div
      className={
        (i === 3
          ? "opacity-100 cursor-default"
          : "opacity-60 hover:opacity-80 cursor-pointer") +
        " rounded-xl bg-mupurple px-2 mt-0.5 mb-0.5 mx-0.5 h-6 flex justify-around items-center font-semibold select-none"
      }
      key={key}
    >
      <div className="pb-1 pt-px px-px">{key}</div>
    </div>
  ));

faSortAmountUp;
faSortAmountDown;

const ascendingDescending = (
  <div className="flex mx-0 mt-2 lg:my-auto lg:ml-4 text-xl justify-between w-24">
    <div className="bg-mupurple p-1 h-10 w-10 rounded-full flex justify-around items-center opacity-60 hover:opacity-80 cursor-pointer">
      {/* <i className="fas fa-sort-amount-up"></i> */}
      <FontAwesomeIcon icon={faSortAmountUp} />
    </div>
    <div className="bg-mupurple p-1 h-10 w-10 rounded-full ml-2 flex justify-around items-center opacity-100 cursor-default">
      {/* <i className="fas fa-sort-amount-down"></i> */}
      <FontAwesomeIcon icon={faSortAmountDown} />
    </div>
  </div>
);

export default function SortPicker() {
  return (
    <div className="flex flex-col lg:flex-row w-full items-center">
      <div className="flex mt-2 lg:mt-0 lg:mx-auto mx-0 lg:ml-4 w-48 justify-center flex-wrap">
        {sortSelectors}
      </div>
      <div>{ascendingDescending}</div>
    </div>
  );
}
