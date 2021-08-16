import React, { ReactElement } from "react";
import { useContract } from "../context/ContractContext";
import { joinClasses } from "../helpers";
import GameStatsCard from "./GameStatsCard";
import PlayerCard from "./PlayerCard";

export default function Leaderboard(): ReactElement {
  const { currentPlayer, betAmount, opponent, gameStage } = useContract();
  return (
    <div
      className={joinClasses("flex", "justify-between", "items-center", "mt-4")}
    >
      <PlayerCard {...currentPlayer} tag="player" betAmount={betAmount} />
      <GameStatsCard gameStage={gameStage} betAmount={betAmount} />
      <PlayerCard {...opponent} tag="opponent" betAmount={betAmount} />
    </div>
  );
}
