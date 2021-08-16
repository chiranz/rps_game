import React, { ReactElement } from "react";
import { joinClasses } from "../helpers";

export enum GameStage {
  Open,
  BetsDeposited,
  MovesSubmitted,
  MoveRevealed,
  Completed,
}
const getGameStatusText = (id: number): string => {
  const gameStateToText: { [key: number]: string } = {
    0: "Open",
    1: "Bets Deposited",
    2: "Moves Submitted",
    3: "Moves Revealed",
    4: "Completed",
  };
  return gameStateToText[id];
};

export default function GameStatsCard({
  gameStage,
  betAmount,
}: {
  gameStage: any;
  betAmount: string | null;
}): ReactElement {
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
        <div>Bet: {betAmount} ETH</div>
        <h3>Game Stage</h3>
        <button>{getGameStatusText(gameStage)}</button>
      </div>
    </div>
  );
}
