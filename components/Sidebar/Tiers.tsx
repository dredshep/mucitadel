import { TIERS } from "../../constant";
import TierIcon from "../Icons/TierIcon";

const Tiers = (props: { selectedTier: string; onSelectTier: any }) => {
  return (
    <>
      {TIERS.map((tier, i) => {
        const tierFileName = `/images/tiers/${tier.toLowerCase()}.png`;
        return (
          <li
            onClick={() => props.onSelectTier(tier)}
            className={`px-5 flex flex-row items-center pt-1 pb-1 font-semibold hover:bg-asidebg-hover cursor-pointer ${
              props.selectedTier === tier ? "bg-asidebg-hover" : ""
            }`}
            key={i}
          >
            <TierIcon path={tierFileName} tier={tier} />
            <div className="capitalize">{tier}</div>
          </li>
        );
      })}
    </>
  );
};

export default Tiers;
