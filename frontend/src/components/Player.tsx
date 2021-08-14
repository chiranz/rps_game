import React, { ReactElement } from "react";
import { joinClasses } from "../helpers";
import Button from "./Button";

// TODO: Action text should be deposit bet or Add more fund

export default function Player(): ReactElement {
  return (
    <div
      className={joinClasses(
        "py-4",
        "px-8",
        "border",
        "rounded",
        "text-left",
        "border-green-300"
      )}
    >
      <div id="heading">
        <h2 className="text-xl">Player: 0xb1...e1</h2>
        <h3 className="text-gray-400">Balance: 0.1 ETH</h3>
      </div>
      <div id="content" className="mt-4">
        <h3>
          Deposited: <span>✅ </span>{" "}
        </h3>
        <h3 className="mt-2">
          Move Submitted: <span>❌ </span>{" "}
        </h3>
        <h3 className="mt-2">
          Move Revealed: <span>❌ </span>
        </h3>
      </div>
      <div id="actions" className="mt-6">
        <Button className="border-green-300">Deposit Bet</Button>
      </div>
    </div>
  );
}
