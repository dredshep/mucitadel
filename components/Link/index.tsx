import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Link(props: {
  icon: IconDefinition;
  href?: string;
  children: string;
  className?: string;
}) {
  return (
    <a
      className={
        "flex flex-column text-base hover:bg-mainbg cursor-pointer" +
        (" " + props.className || "")
      }
    >
      <div className="flex items-center py-3 px-5">
        <FontAwesomeIcon icon={props.icon} className="mr-5" />
        <div>{props.children}</div>
      </div>
    </a>
  );
}
