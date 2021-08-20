import React, { ReactElement } from "react";
import { joinClasses } from "../helpers";
import Loader from "./Loader";

interface Props {
  message: string;
  loader?: boolean;
}

export default function GameActionInfoCard({
  message,
  loader,
}: Props): ReactElement {
  return (
    <div
      className={joinClasses(
        "flex",
        "flex-col",
        "items-center",
        "justify-center",
        "w-full",
        "h-full",
        "border",

        "border-blue-500",
        "py-4",
        "rounded"
      )}
    >
      {loader && <Loader />}
      <h2 className="mt-4 text-xl font-semibold">{message}</h2>
    </div>
  );
}
