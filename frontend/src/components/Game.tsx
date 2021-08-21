import React, { ReactElement } from "react";
import { ContractProvider } from "../context/RPSGameContractContext";
import Leaderboard from "./Leaderboard";
import Playground from "./Playground";
import { useWallet } from "../context/WalletContext";

export default function Game(): ReactElement {
  const { walletAddress } = useWallet();
  if (!walletAddress) {
    return (
      <div className="mt-4">
        <h1 className="text-xl">Please Connect your metamask first</h1>
      </div>
    );
  }
  return (
    <ContractProvider>
      <Leaderboard />
      <Playground />
    </ContractProvider>
  );
}
