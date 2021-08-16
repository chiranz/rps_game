import React, { ReactElement } from "react";
import { Player } from "../context/ContractContext/contractContext";
import { getTruncatedAddress, joinClasses } from "../helpers";

interface PlayerWithTag extends Player {
  tag: "player" | "opponent" | "audience";
  betAmount: string | null;
}

export default function PlayerCard({
  addr,
  balance,
  move,
  hashedMove,
  revealed,
  submitted,
  tag,
  betAmount,
}: PlayerWithTag): ReactElement {
  console.log(addr);
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
        <h2 className="text-xl">
          {tag === "player" ? "Player" : "Opponent"}:{" "}
          {getTruncatedAddress(addr)}
        </h2>
        <h3 className="text-gray-400">Balance: {balance} ETH</h3>
      </div>
      <div id="content" className="mt-4">
        <h3>
          Deposited:{" "}
          <span>
            {parseFloat(balance || "0") >= parseFloat(betAmount || "0")
              ? "✅"
              : "❌"}{" "}
          </span>{" "}
        </h3>
        <h3 className="mt-2">
          Move Submitted: <span>{submitted ? "✅" : "❌"} </span>{" "}
        </h3>
        <h3 className="mt-2">
          Move Revealed: <span>{submitted ? "✅" : "❌"} </span>
        </h3>
      </div>
    </div>
  );
}
