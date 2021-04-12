export default function Button(props: { [key: string]: any; children: any }) {
  return (
    <button
      {...props}
      className={
        "bg-mupurple hover:bg-mupurple-hover active:bg-mupurple-active " +
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
