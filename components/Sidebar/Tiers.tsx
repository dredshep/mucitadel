function TierIcon(props: { path: string; tier: string }) {
  return (
    <div className="h-12 w-12 flex justify-around items-center mr-5">
      <img src={props.path} alt={props.tier} />
    </div>
  );
}

export default function Tiers() {
  const tiers = ["Common", "Uncommon", "Rare", "Epic", "Legendary", "Nani"];
  return (
    <>
      {tiers.map((tier, i) => {
        const tierFileName = `/images/tiers/${i + 1} ${tier.toLowerCase()}.png`;
        return (
          <li
            className="px-5 flex flex-row items-center pt-1 pb-1 font-semibold hover:bg-asidebg-hover cursor-pointer"
            key={i}
          >
            <TierIcon path={tierFileName} tier={tier} />
            <div>{tier}</div>
          </li>
        );
      })}
    </>
  );
}
