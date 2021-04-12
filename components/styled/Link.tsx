export default function Link(props: {
  [key: string]: any;
  className?: string;
  target?: string;
  href?: string;
}) {
  return (
    <a
      {...props}
      className={
        "text-mupurple hover:text-mupurple-hover active:text-mupurple-active transition-colors duration-75 cursor-pointer" +
        (" " + props.className || "")
      }
    ></a>
  );
}
