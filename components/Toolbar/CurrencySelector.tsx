export default function CurrencySelector() {
  return (
    <>
      {"ETH SOUL USD".split(" ").map((key, i) => (
        <div
          className={
            (i === 1
              ? "opacity-100 cursor-default"
              : "opacity-60 hover:opacity-80 cursor-pointer") +
            " rounded-xl bg-mupurple pb-0.5 mt-0.5 mb-0.5 mx-0.5 h-6 flex justify-around items-center font-semibold select-none"
          }
          key={key}
        >
          <div className="px-2 py-1 mt-px">{key}</div>
        </div>
      ))}
    </>
  );
}
