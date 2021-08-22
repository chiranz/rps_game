import React, { ReactElement } from "react";
import { joinClasses } from "../../helpers";

export default function Footer(): ReactElement {
  return (
    <div className={joinClasses("py-4", "border-t-2", "mt-4")}>
      Made by{" "}
      <a
        className="text-blue-600 hover:underline"
        href="https://github.com/chiranz"
        target="_blank"
        rel="noreferrer"
      >
        Chiranjibi
      </a>
    </div>
  );
}
