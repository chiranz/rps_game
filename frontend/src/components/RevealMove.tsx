import React, { ReactElement } from "react";
import { useContract } from "../context/ContractContext";
import { useWallet } from "../context/WalletContext";
import { joinClasses } from "../helpers";
import Button from "./Button";
import HiddenMove from "./HiddenMove";
import InputField from "./InputField";
import Loader from "./Loader";
import { getOptionButton, options } from "./Playground";

interface RevealMoveProps {
  salt: string;
  move: number;
  setSalt: React.Dispatch<React.SetStateAction<string>>;
  setMove: React.Dispatch<React.SetStateAction<number>>;
}

export default function RevealMove({
  salt,
  move,
  setSalt,
  setMove,
}: RevealMoveProps): ReactElement {
  const { walletAddress } = useWallet();
  const { revealMove, currentPlayer, opponent, isPlayer, winner, resetGame } =
    useContract();
  const handleMoveReveal = () => {
    console.log("I am trying");
    if (revealMove && move) {
      revealMove(move, salt);
    }
  };
  const handleResetGame = () => {
    if (resetGame) {
      resetGame();
    }
  };
  return (
    <React.Fragment>
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
            <h2 className="text-3xl">
              {isPlayer ? "Your Pick" : "Player1 Pick"}
            </h2>
            {currentPlayer?.revealed && currentPlayer.move ? (
              getOptionButton(options[currentPlayer.move - 1])
            ) : (
              <HiddenMove />
            )}
          </div>
          <div
            className={joinClasses(
              "flex",
              "flex-col",
              "items-center",
              "w-full"
            )}
          >
            {currentPlayer.revealed && !opponent?.revealed && (
              <React.Fragment>
                <Loader />
                <div className="">Waiting for opponent to reveal move</div>
              </React.Fragment>
            )}
            {!currentPlayer.revealed && (
              <React.Fragment>
                <div>
                  <InputField
                    value={salt}
                    placeholder="salt"
                    type="text"
                    onChange={(e) => setSalt(e.target.value)}
                  />
                  <InputField
                    value={move}
                    onChange={(e) => setMove(+e.target.value)}
                    placeholder="move"
                    type="number"
                    className="my-2"
                  />
                </div>
                <Button
                  disabled={!isPlayer}
                  color="primary"
                  className="block text-center"
                  onClick={handleMoveReveal}
                >
                  Reveal Move
                </Button>
              </React.Fragment>
            )}
            {currentPlayer.revealed && opponent?.revealed && (
              <React.Fragment>
                <h1 className="text-2xl">
                  {winner === walletAddress ? "You won!!" : "You lost!"}
                </h1>
                <Button
                  disabled={!isPlayer}
                  color="primary"
                  className="block text-center"
                  onClick={handleResetGame}
                >
                  Play Again
                </Button>
              </React.Fragment>
            )}
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
            <h2 className="text-3xl">
              {isPlayer ? "Oponent Pick" : "Player2 Pick"}
            </h2>
            {opponent?.revealed && opponent.move ? (
              getOptionButton(options[opponent.move - 1])
            ) : (
              <HiddenMove />
            )}
            {}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}