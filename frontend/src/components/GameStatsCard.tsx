import React, { ReactElement } from "react";
import { joinClasses } from "../helpers";

enum GameState {
  Open = "Open",
  BetsDeposited = "Bets Deposited",
  MovesSubmitted = "Moves Submitted",
  MoveRevealed = "Moves Revealed",
  Completed = "Completed",
}

export default function GameStatsCard(): ReactElement {
  return (
    <div
      className={joinClasses(
        "mx-4",
        "p-4",
        "w-5/12",
        "flex",
        "items-center",
        "justify-between",
        "border",
        "rounded",
        "text-left",
        "border-blue-300"
      )}
    >
      <h1 className="text-2xl font-medium">
        <span className="block">Rock</span>
        <span className="block">Paper</span>
        <span className="block">Scissors</span>
      </h1>
      <div className="flex flex-col text-center">
        <h3>Status</h3>
        <button>{GameState.BetsDeposited}</button>
      </div>
    </div>
  );
}
