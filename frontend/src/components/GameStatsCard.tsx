import React, { ReactElement } from "react";
import { useRPSGameContract } from "../context/RPSGameContractContext";
import { joinClasses } from "../helpers";
import Button from "./Button";

export enum GameStage {
  Open,
  BetsDeposited,
  MovesSubmitted,
  MoveRevealed,
  Completed,
}
export const getGameStatusText = (id: number): string => {
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
  betAmount,
}: {
  betAmount: string | null;
}): ReactElement {
  const { depositBet, isPlayer, gameStage, withdrawFund, currentPlayer } =
    useRPSGameContract();

  console.log({ balance: parseFloat(currentPlayer?.balance || "") });
  return (
    <div
      className={joinClasses(
        "mx-4",
        "p-4",
        "w-5/12",
        "flex",
        "flex-col",
        "justify-between",
        "items-center",
        "border",
        "rounded",
        "text-left",
        "border-blue-300"
      )}
    >
      <div className={joinClasses("flex", "justify-between", "items-center")}>
        <h1 className="text-2xl font-medium">
          <span className="block">Rock</span>
          <span className="block">Paper</span>
          <span className="block">Scissors</span>
        </h1>
        <div className="flex flex-col text-center">
          <div>Bet Amt: {betAmount} ETH</div>
        </div>
      </div>
      <div className="w-full mt-6">
        <h2 className="text-xl font-bold text-center">
          {isPlayer ? "Player" : "Audience"}
        </h2>
        <div className="flex justify-between w-full">
          <Button
            disabled={
              !isPlayer ||
              gameStage === 1 ||
              gameStage === 2 ||
              parseFloat(currentPlayer?.balance || "") <= 0
            }
            onClick={withdrawFund}
          >
            Withdraw
          </Button>
          <Button disabled={!isPlayer} color="primary" onClick={depositBet}>
            Deposit bet
          </Button>
        </div>
      </div>
    </div>
  );
}
