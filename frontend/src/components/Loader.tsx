import React, { ReactElement } from "react";

export default function Loader(): ReactElement {
  let circleCommonClasses = "h-4 w-4 bg-gray-400 rounded-full";
  return (
    <div className="flex">
      <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
      <div className={`${circleCommonClasses} mr-1 animate-bounce200`}></div>
      <div className={`${circleCommonClasses} animate-bounce400`}></div>
    </div>
  );
}
