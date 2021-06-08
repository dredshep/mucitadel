import { useState } from "react";

type tabs = {
  headers: string[];
  activeClassName: string;
  inactiveClassName: string;
};

export default function Tabs(props: { tabs?: tabs; children: any }) {
  const [activeTab, setActiveTab] = useState(1);
  const defaultTabTexts = ["Description", "Details"];
  const defaultTabActiveClass = "";
  const defaultTabInactiveClass = "";

  if (!props.tabs) {
  }

  const handleClick = (index: number) =>
    index !== activeTab && setActiveTab(index);

  function TabTemplate(props: {
    className: string;
    children: any;
    index: number;
  }) {
    return (
      <div
        className={
          (props.index > 0 ? "pl-5 " : "") +
          "border-b-2 w-40 h-full flex items-center box-content" +
          (props.className ? " " + props.className : "")
        }
        key={props.index}
        onClick={() => handleClick(props.index)}
      >
        {props.children}
      </div>
    );
  }

  const allTabs = defaultTabTexts.map((text, i) => (
    <TabTemplate
      className={
        i === activeTab
          ? " border-mupurple"
          : " border-inputbg cursor-pointer hover:border-inputbg-hover hover:text-secondary-hover"
      }
      key={`tab-${i}`}
      index={i}
    >
      {text}
    </TabTemplate>
  ));

  return (
    <div>
      <div className="flex h-12 text-base font-body mt-2 text-secondary">
        {allTabs}
        {/* <div className="border-b-2 border-inputbg w-40 h-full flex items-center box-content">
        Description
      </div>
      <div className="border-b-2 border-mupurple h-full flex items-center w-full box-content pl-5">
        Details
      </div> */}
      </div>
      <div className="text-white">{props.children[activeTab]}</div>
    </div>
  );
}
