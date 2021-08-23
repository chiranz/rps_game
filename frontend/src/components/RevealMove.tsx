import React, { ReactElement } from "react";
import { useRPSGameContract } from "../context/RPSGameContractContext";
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
  const { revealMove, currentPlayer, opponent, isPlayer, winner, resetGame } =
    useRPSGameContract();
  const handleMoveReveal = () => {
    if (move === 0) {
      alert("Move must be selected!!");
      return;
    }
    if (revealMove && move) {
      revealMove(move, salt);
    }
  };
  const handleResetGame = () => {
    if (resetGame) {
      resetGame();
    }
  };
  const getGameResultText = (): string => {
    if (winner === "0x0000000000000000000000000000000000000000") {
      return "Game Draw";
    }
    if (currentPlayer?.addr === winner) {
      if (isPlayer) {
        return "You Won!!";
      } else {
        return "Player1 Won!!";
      }
    } else {
      if (isPlayer) {
        return "You Lost!!";
      } else {
        return "Player2 Won!!";
      }
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
                <div className="">Waiting for the opponent to reveal move</div>
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
                    disabled={!isPlayer}
                  />
                  <select
                    className={joinClasses(
                      "w-full",
                      "block",
                      "p-2",
                      "border",
                      "rounded",
                      "bg-white",
                      "mt-4"
                    )}
                    value={move}
                    onChange={(e) => setMove(+e.target.value)}
                    disabled={!isPlayer}
                  >
                    <option value={0}>None</option>
                    <option value={1}>Rock</option>
                    <option value={2}>Paper</option>
                    <option value={3}>Scissors</option>
                  </select>
                </div>
                <Button
                  disabled={!isPlayer}
                  color="primary"
                  className="block mt-4 text-center"
                  onClick={handleMoveReveal}
                >
                  Reveal Move
                </Button>
              </React.Fragment>
            )}
            {currentPlayer.revealed && opponent?.revealed && (
              <React.Fragment>
                <h1 className="text-2xl">{getGameResultText()}</h1>
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
              {isPlayer ? "Opponent Pick" : "Player2 Pick"}
            </h2>
            {opponent?.revealed && opponent.move ? (
              getOptionButton(options[opponent.move - 1])
            ) : (
              <HiddenMove />
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
