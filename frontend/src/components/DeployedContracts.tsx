import { ethers } from "ethers";
import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useRPSGameFactory } from "../context/RPSGameFactoryContext";
import { useWallet } from "../context/WalletContext";
import { joinClasses } from "../helpers";
import Button from "./Button";
import InputField from "./InputField";

export default function DeployedContracts(): ReactElement {
  const { walletAddress } = useWallet();
  const { deployedGames, createGame, selectGame } = useRPSGameFactory();
  const [opponent, setOpponent] = React.useState("");
  const [betAmount, setBetAmount] = React.useState("");

  const handleCreateGame = () => {
    // Check if opponent address length is addr length
    if (opponent.length !== 42) {
      alert("Opponent address is invalid!!");
      return;
    }
    if (!parseFloat(betAmount)) {
      alert("Please submit a valid bet e.g. '0.1' ETH");
      return;
    }
    if (createGame) {
      createGame(betAmount, opponent);
    }
    setOpponent("");
    setBetAmount("");
  };

  return (
    <div className="mt-8">
      {!walletAddress ? (
        <div className={joinClasses("text-xl", "my-8")}>
          Please connect to your metamask wallet
        </div>
      ) : null}
      <div className="flex flex-col justify-center">
        <InputField
          placeholder="Opponent address"
          value={opponent}
          onChange={(e) => setOpponent(e.target.value)}
        />

        <InputField
          className="mt-4"
          placeholder="Bet amount in ETH (0.1)"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
        />
        <Button
          onClick={handleCreateGame}
          className="block mt-4"
          color="primary"
          disabled={!walletAddress}
        >
          Deploy New Game
        </Button>
      </div>

      {deployedGames.length > 0 ? (
        <ul className="mt-8">
          <h1 className="my-8 text-xl">Deployed Games</h1>
          {deployedGames.map((game, index) => (
            <li className="flex justify-between py-2 " key={index}>
              {game.gameAddress}
              <div
                className={joinClasses(
                  "text-gray-500 ",
                  "bg-gray-300",
                  "px-2",
                  "py-2",
                  "block",
                  "rounded-full"
                )}
                title="Bet Amount"
              >
                {ethers.utils.formatEther(game.betAmount)} ETH
              </div>

              <Link
                to="/game"
                onClick={() => selectGame && selectGame(game.gameAddress)}
              >
                {walletAddress === game.player ||
                walletAddress === game.opponent ? (
                  <Button color="primary" disabled={!walletAddress}>
                    Connect
                  </Button>
                ) : (
                  <Button disabled={!walletAddress}>Watch Game</Button>
                )}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex items-center justify-center h-full">
          <h2>No deployed games!</h2>
        </div>
      )}
    </div>
  );
}
