function TierIcon(props: { path: string; tier: string }) {
  return (
    <div className="h-12 w-12 flex justify-around items-center mr-5">
      <img src={props.path} alt={props.tier} />
    </div>
  );
}

export default TierIcon;
