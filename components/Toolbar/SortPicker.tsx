import {
  faSortAmountDown,
  faSortAmountUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ORDER_TYPES, SORT_TYPES } from "../../constant";

const SortSelector = ({ sortType, onChangeSortType }) => {
  return (
    <>
      {SORT_TYPES.map((sortItem) => (
        <div
          className={
            (sortItem.value === sortType
              ? "opacity-100 cursor-default"
              : "opacity-60 hover:opacity-80 cursor-pointer") +
            " rounded-xl bg-mupurple px-2 mt-0.5 mb-0.5 mx-0.5 h-6 flex justify-around items-center font-semibold select-none"
          }
          onClick={() => onChangeSortType(sortItem.value)}
          key={sortItem.value}
        >
          <div className="pb-1 pt-px px-px">{sortItem.label}</div>
        </div>
      ))}
    </>
  );
};

const OrderSelector = ({ orderType, onChangeOrderType }) => {
  return (
    <div className="flex mx-0 mt-2 lg:my-auto lg:ml-4 text-xl justify-between w-24">
      <div
        onClick={() => onChangeOrderType(ORDER_TYPES.ASCENDING)}
        className={`bg-mupurple p-1 h-10 w-10 rounded-full flex justify-around items-center cursor-pointer ${
          orderType === ORDER_TYPES.ASCENDING
            ? "opacity-100"
            : "opacity-60 hover:opacity-80"
        }`}
      >
        <FontAwesomeIcon icon={faSortAmountUp} />
      </div>
      <div
        onClick={() => onChangeOrderType(ORDER_TYPES.DESCENDING)}
        className={`bg-mupurple p-1 h-10 w-10 rounded-full ml-2 flex justify-around items-center cursor-default ${
          orderType === ORDER_TYPES.DESCENDING
            ? "opacity-100"
            : "opacity-60 hover:opacity-80"
        }`}
      >
        <FontAwesomeIcon icon={faSortAmountDown} />
      </div>
    </div>
  );
};

const SortPicker = ({
  sortType,
  orderType,
  onChangeSortType,
  onChangeOrderType,
}) => {
  return (
    <div className="flex flex-col lg:flex-row w-full items-center">
      <div className="flex mt-2 lg:mt-0 lg:mx-auto mx-0 lg:ml-4 w-48 justify-center flex-wrap">
        <SortSelector sortType={sortType} onChangeSortType={onChangeSortType} />
      </div>
      <OrderSelector
        orderType={orderType}
        onChangeOrderType={onChangeOrderType}
      />
    </div>
  );
};

export default SortPicker;
