import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../styled/Button";
import SortPicker from "./SortPicker";

const Toolbar = (props: {
  configurations: any;
  onReleaseFilter: any;
  onChangeOrderType: any;
  onChangeSortType: any;
}) => {
  const {
    configurations,
    onReleaseFilter,
    onChangeOrderType,
    onChangeSortType,
  } = props;

  return (
    <div className="mx-0 lgish:mx-10 2xl:mx-auto 2xl:w-full mt-0 lgish:mt-10 rounded-none lgish:rounded-xl box-border overflow-hidden lgish:max-w-6xl">
      <div className="flex bg-asidebg pt-4 pb-4">
        {/* margin container */}
        <div className="h-full w-full flex flex-col items-center justify-center">
          {/* Sort section */}
          <div className="h-full flex flex-col lgish:flex-row items-center justify-center lgish:justify-between w-auto ml-0">
            <div>
              <SortPicker
                sortType={configurations.sortType}
                orderType={configurations.orderType}
                onChangeOrderType={onChangeOrderType}
                onChangeSortType={onChangeSortType}
              />
            </div>
          </div>
          <div className="h-full flex items-center justify-center min-w-100">
            {(configurations.minPrice || configurations.maxPrice) && (
              <div className="flex items-center ml-2 mr-2 mt-4">
                {configurations.minPrice && (
                  <div className="mr-2 text-lg">{`${configurations.minPrice}  <`}</div>
                )}
                <div className="text-lg">Price</div>
                {configurations.maxPrice && (
                  <div className="ml-2 text-lg">{`<  ${configurations.maxPrice}`}</div>
                )}
              </div>
            )}
            {configurations.tier && (
              <div className="flex items-center ml-2 mr-2 mt-4">
                <div className="ml-2">
                  <img
                    className="w-8"
                    src={`/images/tiers/${configurations.tier.toLowerCase()}.png`}
                    alt={configurations.tier}
                  />
                </div>
                <div className="ml-2 capitalize text-lg">
                  {configurations.tier}
                </div>
              </div>
            )}
            {(configurations.minPrice ||
              configurations.maxPrice ||
              configurations.tier) && (
              <Button
                onClick={onReleaseFilter}
                className="pl-3 pr-3 pt-1 pb-1 rounded-full mt-4 ml-4"
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
