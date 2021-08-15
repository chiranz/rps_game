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
          `${
            color === "yellow"
              ? "bg-yellow-100"
              : color === "red"
              ? "bg-red-100"
              : color === "blue"
              ? "bg-blue-100"
              : color === "green"
              ? "bg-green-100"
              : "bg-gray-100"
          }`,

          "border",
          `${
            color === "yellow"
              ? "border-yellow-500"
              : color === "red"
              ? "border-red-500"
              : color === "blue"
              ? "border-blue-500"
              : color === "green"
              ? "border-green-500"
              : "border-gray-500"
          }`,
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
