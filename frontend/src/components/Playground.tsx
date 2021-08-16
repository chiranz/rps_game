import React, { ReactElement, useState } from "react";
import rock from "../images/icon-rock.svg";
import paper from "../images/icon-paper.svg";
import scissors from "../images/icon-scissors.svg";
import Button from "./Button";
import OptionButton from "./OptionButton";
import { useWallet } from "../context/WalletContext";
import { ContractProvider } from "../context/ContractContext";

type Option = {
  image: string;
  value: "paper" | "scissors" | "rock";
  color: "yellow" | "red" | "blue";
  alt: string;
};
export const options: Option[] = [
  { image: paper, value: "paper", color: "blue", alt: "paper icon" },
  { image: scissors, value: "scissors", color: "yellow", alt: "scissors icon" },
  { image: rock, value: "rock", color: "red", alt: "rock icon" },
];

type GameStatus =
  | "complete"
  | "initialized"
  | "submitted"
  | "waiting"
  | "submitting"
  | "selected";
export default function Playground(): ReactElement {
  const { walletAddress } = useWallet();
  const [userChoice, setUserChoice] = useState<Option | null>(null);
  const [gameStatus, setGameStatus] = useState<GameStatus>("initialized");
  const handleOptionChoose = (e: React.MouseEvent<HTMLDivElement>) => {
    const _choice = e.currentTarget.getAttribute("data-choice");
    options.forEach((option) => {
      if (option.value === _choice) {
        setUserChoice(option);
        setGameStatus("selected");
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
  console.log(gameStatus);

  const handleMoveSubmit = () => {
    // TODO: send the transaction to the blockchain
    setGameStatus("submitting");
  };

  if (!walletAddress) {
    return (
      <div>
        <h1 className="text-xl">Please Connect your metamask first</h1>
      </div>
    );
  }

  return (
    <ContractProvider>
      <div className="mt-4">
        {gameStatus === "initialized" && (
          <main className="flex flex-wrap justify-center mx-auto align-center w-96">
            <h1 className="text-4xl font-medium text-green-600">
              Select Your Choice
            </h1>
            {options.map((option) =>
              getOptionButton(option, handleOptionChoose)
            )}
          </main>
        )}
        {gameStatus === "selected" && userChoice && (
          <div>
            <h1>Your Choice: {userChoice.value}</h1>
            {getOptionButton(userChoice)}
            <Button color="success" onClick={handleMoveSubmit}>
              Submit Move
            </Button>
            <Button
              onClick={() => setGameStatus("initialized")}
              className="w-max"
            >
              Change Move
            </Button>
          </div>
        )}
        {gameStatus === ("submitting" || "submitted") && userChoice && (
          <div className="flex items-center justify-between w-full h-full my-20">
            <div className="flex flex-col items-center w-full text-center">
              <h2 className="text-3xl">Your Pick</h2>
              {getOptionButton(userChoice)}
            </div>
            <div>
              <h1 className="text-xl">
                <Button color="warning" className="w-max">
                  {gameStatus}
                </Button>
                <br />

                <Button
                  onClick={() => setGameStatus("initialized")}
                  className="w-max"
                >
                  Restart
                </Button>
              </h1>
            </div>
            <div className="flex flex-col items-center w-full text-center">
              <h2 className="text-3xl">Oponent Pick</h2>
              {getOptionButton(userChoice)}
            </div>
          </div>
        )}
      </div>
    </ContractProvider>
  );
}
