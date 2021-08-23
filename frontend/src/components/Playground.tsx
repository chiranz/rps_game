import React, { ReactElement, useState } from "react";
import rock from "../images/icon-rock.svg";
import paper from "../images/icon-paper.svg";
import scissors from "../images/icon-scissors.svg";
import OptionButton from "./OptionButton";
import { useRPSGameContract } from "../context/RPSGameContractContext";
import GameActionInfoCard from "./GameActionInfoCard";
import SubmitMove from "./SubmitMove";
import RevealMove from "./RevealMove";

export type Option = {
  image: string;
  value: "paper" | "scissors" | "rock";
  color: "yellow" | "red" | "blue";
  alt: string;
  key: number;
};
export const options: Option[] = [
  { image: rock, key: 1, value: "rock", color: "red", alt: "rock icon" },
  { image: paper, key: 2, value: "paper", color: "blue", alt: "paper icon" },
  {
    image: scissors,
    key: 3,
    value: "scissors",
    color: "yellow",
    alt: "scissors icon",
  },
];
export const getOptionButton = (
  option: Option,
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
) => {
  return (
    <OptionButton
      src={option.image}
      bgColor={option.color}
      alt={option.alt}
      key={option.value}
      value={option.value}
      onClick={onClick}
    />
  );
};

export default function Playground(): ReactElement {
  const { gameStage, currentPlayer, opponent } = useRPSGameContract();
  const [salt, setSalt] = useState("");
  const [move, setMove] = useState(0);
  console.log(gameStage);

  return (
    <div className="py-4 mt-8 border rounded">
      {!currentPlayer?.submitted && gameStage === 0 && (
        <SubmitMove salt={salt} setSalt={setSalt} setMove={setMove} />
      )}
      {gameStage === 0 && currentPlayer?.submitted && !opponent?.submitted ? (
        <GameActionInfoCard
          message="Waiting for the opponent to submit their move"
          loader={true}
        />
      ) : (
        <RevealMove
          salt={salt}
          move={move}
          setMove={setMove}
          setSalt={setSalt}
        />
      )}
    </div>
  );
}
