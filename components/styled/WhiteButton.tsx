export default function WhiteButton(props: {
  [key: string]: any;
  children: any;
}) {
  return (
    <button
      {...props}
      className={
        "bg-white hover:bg-white-hover active:bg-white-active text-mupurple font-title " +
        "select-none rounded-lg shadow-md font-semibold text-base " +
        "cursor-pointer focus:outline-none px-4 py-2 " +
        "transition-colors duration-75 " +
        props.className
      }
    >
      {props.children}
    </button>
  );
}
