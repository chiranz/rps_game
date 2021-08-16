import React, { ReactElement } from "react";
import { useContract } from "../context/ContractContext";
import { useWallet } from "../context/WalletContext";
import { joinClasses } from "../helpers";
import Button from "./Button";

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
  const { walletAddress } = useWallet();
  const { opponent, currentPlayer, depositBet } = useContract();
  const isPlayer =
    walletAddress === opponent?.addr || walletAddress === currentPlayer?.addr;
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
          <h3>Game Stage</h3>
          <button>{getGameStatusText(gameStage)}</button>
        </div>
      </div>
      <div id="actions" className="mt-6">
        {isPlayer ? (
          <Button className="border-green-300" onClick={depositBet}>
            Deposit Bet
          </Button>
        ) : (
          <Button disabled color="warning">
            You are an audience
          </Button>
        )}
      </div>
    </div>
  );
}
