import React, { ReactElement } from "react";
import { joinClasses } from "../helpers";

export default function HiddenMove(): ReactElement {
  return (
    <div
      className={joinClasses(
        "flex",
        "items-center",
        "justify-center",
        "bg-gray-300",
        "rounded-full",
        "w-36",
        "h-36"
      )}
    >
      <div
        className={joinClasses(
          "z-10",
          "flex",
          "items-center",
          "justify-center",
          "w-24",
          "h-24",
          "text-gray-400",
          "bg-white",
          "rounded-full"
        )}
      >
        Not Revealed
      </div>
    </div>
  );
}
