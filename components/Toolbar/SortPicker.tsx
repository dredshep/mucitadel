import {
  faSortAmountDown,
  faSortAmountUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ORDER_TYPES, SORT_TYPES } from "../../constant";

const SortSelector = (props: { sortType: string; onChangeSortType: any }) => {
  return (
    <>
      {SORT_TYPES.map((sortItem) => (
        <div
          className={
            (sortItem.value === props.sortType
              ? "opacity-100 cursor-default"
              : "opacity-60 hover:opacity-80 cursor-pointer") +
            " rounded-full bg-mupurple px-2 mt-0.5 mb-0.5 mx-0.5 h-8 flex justify-around items-center font-semibold select-none"
          }
          onClick={() => props.onChangeSortType(sortItem.value)}
          key={sortItem.value}
        >
          <div className="pb-1 pt-px px-px whitespace-nowrap">
            {sortItem.label}
          </div>
        </div>
      ))}
    </>
  );
};

const OrderSelector = (props: {
  orderType: string;
  onChangeOrderType: any;
}) => {
  return (
    <div className="flex mx-0 mt-2 lg:my-auto text-xl justify-between w-24">
      <div
        onClick={() => props.onChangeOrderType(ORDER_TYPES.ASCENDING)}
        className={`bg-mupurple p-1 h-10 w-10 rounded-full flex justify-around items-center ${
          props.orderType === ORDER_TYPES.ASCENDING
            ? "opacity-100 cursor-default"
            : "opacity-60 hover:opacity-80 cursor-pointer"
        }`}
      >
        <FontAwesomeIcon icon={faSortAmountUp} />
      </div>
      <div
        onClick={() => props.onChangeOrderType(ORDER_TYPES.DESCENDING)}
        className={`bg-mupurple p-1 h-10 w-10 rounded-full ml-2 flex justify-around items-center ${
          props.orderType === ORDER_TYPES.DESCENDING
            ? "opacity-100 cursor-default"
            : "opacity-60 hover:opacity-80 cursor-pointer"
        }`}
      >
        <FontAwesomeIcon icon={faSortAmountDown} />
      </div>
    </div>
  );
};

const SortPicker = (props: {
  sortType: string;
  orderType: string;
  onChangeSortType: any;
  onChangeOrderType: any;
}) => {
  return (
    <div className="flex flex-col lg:flex-row w-full items-center">
      <OrderSelector
        orderType={props.orderType}
        onChangeOrderType={props.onChangeOrderType}
      />
      <div className="flex mt-2 lg:mt-0 lg:mx-auto mx-0 lg:ml-4 w-auto justify-center">
        <SortSelector
          sortType={props.sortType}
          onChangeSortType={props.onChangeSortType}
        />
      </div>
    </div>
  );
};

export default SortPicker;
