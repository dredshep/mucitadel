import { CURRENCIES } from "../../constant";

const CurrencySelector = (props: {
  selectedCurrency: string;
  onSelectCurrency: any;
}) => {
  return (
    <>
      {CURRENCIES.map((currency, i) => (
        <div
          onClick={() => props.onSelectCurrency(currency)}
          className={
            (props.selectedCurrency === currency
              ? "opacity-100 cursor-default"
              : "opacity-60 hover:opacity-80 cursor-pointer") +
            " rounded-xl bg-mupurple pb-0.5 mt-0.5 mb-0.5 mx-0.5 h-6 flex justify-around items-center font-semibold select-none"
          }
          key={`currency-${i}`}
        >
          <div className="px-2 py-1 mt-px">{currency}</div>
        </div>
      ))}
    </>
  );
};

export default CurrencySelector;
