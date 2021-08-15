import React, { ReactElement } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { joinClasses } from "../helpers";

export default function GlobalMessage(): ReactElement {
  const { globalMessage, setGlobalMessage } = React.useContext(GlobalContext);

  const color =
    globalMessage?.type === "error"
      ? "red"
      : globalMessage?.type === "info"
      ? "blue"
      : globalMessage?.type === "warning"
      ? "yellow"
      : "green";
  const handleClose = () => {
    if (setGlobalMessage) {
      setGlobalMessage({});
    }
  };
  if (globalMessage?.message) {
    return (
      <div
        className={joinClasses(
          `bg-${color}-100`,
          "border",
          `border-${color}-700`,
          "mt-2",
          "py-4",
          "relative",
          "rounded"
        )}
      >
        {globalMessage?.message}
        <button
          className="absolute top-0 text-lg right-1"
          onClick={handleClose}
        >
          X
        </button>
      </div>
    );
  }
  return <div></div>;
}
