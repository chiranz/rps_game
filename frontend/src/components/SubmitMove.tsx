import React, { ReactElement, useState } from "react";
import rock from "../images/icon-rock.svg";
import paper from "../images/icon-paper.svg";
import scissors from "../images/icon-scissors.svg";
import OptionButton from "./OptionButton";
import { useContract } from "../context/ContractContext";
import Button from "./Button";
import InputField from "./InputField";

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
interface SubmitMoveProps {
  salt: string;
  setSalt: React.Dispatch<React.SetStateAction<string>>;
  setMove: React.Dispatch<React.SetStateAction<number>>;
}

export default function SubmitMove({
  salt,
  setSalt,
  setMove,
}: SubmitMoveProps): ReactElement {
  const { gameStage, submitMove, currentPlayer, isPlayer } = useContract();
  const [userChoice, setUserChoice] = useState<Option | null>(null);
  const handleOptionChoose = (e: React.MouseEvent<HTMLDivElement>) => {
    const _choice = e.currentTarget.getAttribute("data-choice");
    options.forEach((option) => {
      if (option.value === _choice) {
        setUserChoice(option);
      }
    });
  };
  const handleMoveSubmit = () => {
    if (userChoice && submitMove) {
      submitMove(userChoice?.key, salt);
      setMove(userChoice.key);
    }
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
  return (
    <div>
      {gameStage === 1 && !currentPlayer?.submitted && !userChoice && (
        <main className="flex flex-wrap justify-center mx-auto align-center w-96">
          <h1 className="text-4xl font-medium text-green-600">
            Select Your Choice
          </h1>
          {options.map((option) => getOptionButton(option, handleOptionChoose))}
        </main>
      )}
      {userChoice && gameStage === 1 && !currentPlayer?.submitted && (
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
            <InputField
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
    </div>
  );
}
