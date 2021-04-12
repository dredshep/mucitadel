export default function Explainer(props: { hidden: boolean; children: any }) {
  return (
    <div
      className={
        props.hidden
          ? "hidden"
          : "py-1 px-2 text-sm bg-explanation1 text-white absolute top-14 right-4 rounded-md min-w-max"
      }
    >
      {props.children}
    </div>
  );
}
