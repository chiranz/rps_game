import React, { ReactElement, useState } from "react";
import rock from "../images/icon-rock.svg";
import paper from "../images/icon-paper.svg";
import scissors from "../images/icon-scissors.svg";
import Button from "./Button";
import OptionButton from "./OptionButton";
import { joinClasses } from "../helpers";
import { useContract } from "../context/ContractContext";

type Option = {
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

export default function Playground(): ReactElement {
  // If the game stage is Bets Submitted
  // User should be able to select move
  // User should be able to set salt
  // User should be able to submit move
  // ON SUBMISSION
  // User should be show reveal move component
  // Reveal move can only be clicked if gameStage is Moves submitted
  // Once Winner event is emitted update the UI with you won or lost
  const { gameStage, submitMove, currentPlayer, isPlayer } = useContract();
  const [userChoice, setUserChoice] = useState<Option | null>(null);
  const [salt, setSalt] = useState("");
  const handleOptionChoose = (e: React.MouseEvent<HTMLDivElement>) => {
    const _choice = e.currentTarget.getAttribute("data-choice");
    options.forEach((option) => {
      if (option.value === _choice) {
        setUserChoice(option);
      }
    });
  };
  const getOptionButton = (
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
  console.log(gameStage);

  const handleMoveSubmit = () => {
    if (userChoice && submitMove) {
      submitMove(userChoice?.key, salt);
    }
  };

  return (
    <div className="py-4 mt-8 border rounded">
      {gameStage === 1 && !currentPlayer?.submitted && !userChoice && (
        <main className="flex flex-wrap justify-center mx-auto align-center w-96">
          <h1 className="text-4xl font-medium text-green-600">
            Select Your Choice
          </h1>
          {options.map((option) => getOptionButton(option, handleOptionChoose))}
        </main>
      )}
      {userChoice && (
        <div className="flex items-center justify-around w-full">
          <div>
            <h1>
              Your Choice:{" "}
              <span className="font-bold capitalize">{userChoice.value}</span>{" "}
            </h1>
            {getOptionButton(userChoice)}
            <Button
              disabled={!isPlayer}
              className="block"
              onClick={() => setUserChoice(null)}
            >
              Change Move
            </Button>
          </div>
          <div>
            <input
              className={joinClasses("block", "p-2", "border", "rounded")}
              type="text"
              name="salt"
              id="salt"
              placeholder="salt"
              value={salt}
              onChange={(e) => setSalt(e.target.value)}
            />
            <Button
              className="block float-right mt-4"
              color="success"
              onClick={handleMoveSubmit}
              disabled={!isPlayer}
            >
              Submit Move
            </Button>
          </div>
        </div>
      )}
      {currentPlayer?.submitted && (
        <div
          className={joinClasses(
            "flex",
            "items-center",
            "justify-between",
            "w-full",
            "h-full",
            "my-20"
          )}
        >
          <div
            className={joinClasses(
              "flex",
              "flex-col",
              "items-center",
              "w-full",
              "text-center"
            )}
          >
            <h2 className="text-3xl">Your Pick</h2>
            {getOptionButton(options[currentPlayer.move || 1])}
          </div>
          <div
            className={joinClasses(
              "flex",
              "flex-col",
              "items-center",
              "w-full"
            )}
          >
            <h1 className="text-3xl">Game Draw!</h1>
            <Button
              disabled={!isPlayer}
              color="primary"
              className="block text-center"
            >
              Play Again
            </Button>
          </div>
          <div
            className={joinClasses(
              "flex",
              "flex-col",
              "items-center",
              "w-full",
              "text-center"
            )}
          >
            <h2 className="text-3xl">Oponent Pick</h2>
            {getOptionButton(options[2])}
          </div>
        </div>
      )}
    </div>
  );
}
