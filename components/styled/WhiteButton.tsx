import Button from "./Button";

export default function WhiteButton(props) {
  return (
    <Button
      {...props}
      className={
        "bg-white active:bg-white-active hover:bg-white-hover text-mupurple active:text-mupurple-active hover:text-mupurple-hover " +
        props.className
      }
    >
      {props.children}
    </Button>
  );
}
