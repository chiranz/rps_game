import React, { ReactElement } from "react";
import { joinClasses } from "../helpers";
import GameStatsCard from "./GameStatsCard";
import Player from "./Player";

export default function Leaderboard(): ReactElement {
  return (
    <div className={joinClasses("flex justify-between items-center mt-4")}>
      <Player />
      <GameStatsCard />
      <Player />
    </div>
  );
}
