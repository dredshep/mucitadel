import CurrencySelector from './CurrencySelector'
import SortPicker from './SortPicker'

export default function Toolbar() {
  return (
    <div className="mx-0 lgish:mx-10 2xl:mx-auto 2xl:w-full mt-0 lgish:mt-10 rounded-none lgish:rounded-xl box-border overflow-hidden lgish:max-w-6xl">
      <div className="flex bg-asidebg h-44 lgish:h-16">
        {/* margin container */}
        <div className="mx-0 tiny:mx-auto h-full flex items-center lgish:justify-between">
          {/* Currency section */}
          <div className="h-full flex items-center justify-center flex-col lgish:flex-row">
            <div className="font-semibold font-title text-secondary mx-0 lgish:mr-4">
              CURRENCY
            </div>
            <div className="flex w-32 mt-2 lgish:my-auto justify-center flex-wrap">
              <CurrencySelector />
            </div>
          </div>
          {/* Sort section */}
          <div className="h-full flex flex-col lgish:flex-row items-center justify-center lgish:justify-between w-auto lgish:w-96 ml-0 lgish:ml-20">
            <div className="font-semibold font-title text-secondary">SORT</div>
            <div>
              <SortPicker />
            </div> 
          </div>
        </div>
      </div>
    </div>
  );
}
