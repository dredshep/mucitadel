import { useState } from "react";
import Explainer from ".";

export default function Explained(props: {
  children: any;
  explanation: string;
  className?: string;
}) {
  const [hidden, setHidden] = useState(true);
  const hide = () => setHidden(true);
  const show = () => setHidden(false);
  return (
    <div
      onMouseEnter={show}
      onMouseLeave={hide}
      className={
        "relative cursor-pointer px-4 h-full flex items-center justify-center hover:bg-asidebg-hover" +
        (" " + props.className || "")
      }
    >
      {props.children}
      <Explainer hidden={hidden}>{props.explanation}</Explainer>
    </div>
  );
}
