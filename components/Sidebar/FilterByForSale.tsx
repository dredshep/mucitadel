// import React from "react";
// import { CURRENCIES } from "../../constant";

const FilterByForSale = (props: { selectedForSale: boolean; onSelectForSale: (bool: boolean) => void }) => {
  return (
    <div className="sticky flex flex-column items-start">
      <div className="px-4 mb-4">
        {/* Section title */}
        <div className="text-left pb-5 mt-5">
          {/* <i class="fas fa-tags"></i> */}
          <span className="font-semibold font-title text-secondary">FILTER BY For Sale</span>
        </div>
        <div className="flex w-full mt-2 lgish:my-auto justify-center flex-wrap">
          <div
            onClick={() => props.onSelectForSale(true)}
            className={
              (props.selectedForSale === true
                ? 'opacity-100 cursor-default'
                : 'opacity-60 hover:opacity-80 cursor-pointer') +
              ' rounded-full bg-mupurple pb-0.5 mt-0.5 mb-0.5 mx-0.5 h-8 flex justify-around items-center font-semibold select-none'
            }
            key={`true`}
          >
            <div className="px-4 py-1 mt-px uppercase">For Sale</div>
          </div>
          <div
            onClick={() => props.onSelectForSale(false)}
            className={
              (props.selectedForSale === false
                ? 'opacity-100 cursor-default'
                : 'opacity-60 hover:opacity-80 cursor-pointer') +
              ' rounded-full bg-mupurple pb-0.5 mt-0.5 mb-0.5 mx-0.5 h-8 flex justify-around items-center font-semibold select-none'
            }
            key={`false`}
          >
            <div className="px-4 py-1 mt-px uppercase">For Sale</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterByForSale
