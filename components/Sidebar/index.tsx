import React from "react";
import FilterByCurrency from "./FilterByCurrency";
import FilterByPrice from "./FilterByPrice";
import FilterByTier from "./FilterByTier";

export default function Sidebar(props: {
  minPrice: Number;
  maxPrice: Number;
  tier: string;
  currency: string;
  onSetPriceRange: any;
  onSelectTierFilter: any;
  onSelectCurrency: any;
}) {
  const [sidebarIsHidden, showSidebar] = React.useState(true);

  function showSidebarCommand() {
    // toastify(sidebarIsHidden)
    if (sidebarIsHidden === false) {
      console.log("showing");
      showSidebar(true);
      document.body.style.overflowY = "scroll";
      document.body.style.maxHeight = "100%";
      document.body.style.position = "relative";
    } else if (sidebarIsHidden === true) {
      console.log("hiding");
      showSidebar(false);
      document.body.style.maxHeight = "100vh";
      document.body.style.position = "fixed";
      document.body.style.overflow = "hidden";
    }
  }
  // const wrapperRef = useRef(null)
  // useOutsideAlerter(wrapperRef, showSidebar)
  return (
    <>
      <div
        onClick={showSidebarCommand}
        className={"absolute origin-top-left top-0 left-0 lg:hidden h-16 w-20"}
      ></div>
      <aside
        className={
          (sidebarIsHidden
            ? "hidden lg:flex lg:relative"
            : "flex absolute lg:relative") +
          " flex-shrink-0 flex-grow-0 min-h-screen max-h-full bg-asidebg py-4 overflow-y-auto z-10 overflow-x-hidden no-scrollbar"
        }
      >
        <div
          className={
            "flex w-64 flex-col items-start flex-shrink-0 min-h-screen"
          }
        >
          <div className="sticky top-0 ">
            <FilterByCurrency
              selectedCurrency={props.currency}
              onSelectCurrency={props.onSelectCurrency}
            />
            <FilterByPrice
              minPrice={props.minPrice}
              maxPrice={props.maxPrice}
              onSetPriceRange={props.onSetPriceRange}
            />
            <FilterByTier
              selectedTier={props.tier}
              onSetTierFilter={props.onSelectTierFilter}
            />
          </div>
        </div>
      </aside>
      <div
        onClick={showSidebarCommand}
        className={
          sidebarIsHidden
            ? "hidden"
            : "absolute lg:hidden left-72 opacity-25 top-0 h-full w-full bg-mupurple z-10"
        }
      ></div>
    </>
  );
}
