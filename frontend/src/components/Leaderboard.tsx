import React, { ReactElement } from "react";
import { useRPSGameContract } from "../context/RPSGameContractContext";
import { joinClasses } from "../helpers";
import GameStatsCard from "./GameStatsCard";
import PlayerCard from "./PlayerCard";

export default function Leaderboard(): ReactElement {
  const { currentPlayer, betAmount, opponent, isPlayer } = useRPSGameContract();
  console.log({ isPlayer });
  return (
    <div
      className={joinClasses("flex", "justify-between", "items-center", "mt-4")}
    >
      <PlayerCard {...currentPlayer} tag="player" betAmount={betAmount} />
      <GameStatsCard betAmount={betAmount} />
      <PlayerCard {...opponent} tag="opponent" betAmount={betAmount} />
    </div>
  );
}
