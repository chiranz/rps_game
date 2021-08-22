import { ethers } from "ethers";
import React, { ReactNode } from "react";
import { RPSGameFactory } from "../../RPSGameFactory";
import { abi as rpsFactoryAbi } from "../../abis/RPSGameFactory.json";
import { getProvider } from "../../provider";
import { getRPSGameFactoryAddress } from "../../helpers";
import { useWallet } from "../WalletContext";
import { useTransaction } from "../TransactionContext";

const initialState: FactoryState = {
  deployedGames: [],
  selectedGameAddress: "",
};

const RPSGameFactoryContext = React.createContext<FactoryState>(initialState);
interface Game {
  gameAddress: string;
  player: string;
  opponent: string;
  betAmount: ethers.BigNumber;
  0: string;
  1: string;
  2: string;
  3: ethers.BigNumber;
}

interface FactoryState {
  deployedGames: Game[];
  createGame?: (betAmount: string, address: string) => void;
  selectedGameAddress: string;
  selectGame?: (address: string) => void;
}

type ProviderProps = {
  children: ReactNode;
};
export const RPSGameFactoryProvider = ({ children }: ProviderProps) => {
  const { setPending } = useTransaction();
  const { walletAddress } = useWallet();
  const [selectedGameAddress, setSelectedGameAddress] = React.useState("");
  const [deployedGames, setDeployedGames] = React.useState<Game[]>([]);
  const [contract, setContract] = React.useState<RPSGameFactory>();

  React.useEffect(() => {
    async function init() {
      const _provider = await getProvider();
      const signer = _provider.getSigner();
      const _contract = new ethers.Contract(
        getRPSGameFactoryAddress(),
        rpsFactoryAbi,
        signer
      ) as unknown as RPSGameFactory;
      setContract(_contract);
      const _deployedGames = await _contract.getDeployedGames();
      setDeployedGames(_deployedGames);
    }
    if (walletAddress) {
      init();
    }
  }, [walletAddress]);

  async function deployNewGame(betAmount: string, opponent: string) {
    if (contract) {
      const tx = await contract.createGame(
        ethers.utils.parseEther(betAmount),
        opponent
      );
      setPending(true);
      await tx.wait();
      setPending(false);
    }
  }
  if (contract) {
    contract.on("RPSGameCreated", (game: Game) => {
      if (
        !deployedGames.find(
          (_game: Game) => _game.gameAddress === game.gameAddress
        )
      ) {
        setDeployedGames([game, ...deployedGames]);
      }
    });
  }

  return (
    <RPSGameFactoryContext.Provider
      value={{
        deployedGames,
        selectedGameAddress,
        selectGame: setSelectedGameAddress,
        createGame: deployNewGame,
      }}
    >
      {children}
    </RPSGameFactoryContext.Provider>
  );
};

export const useRPSGameFactory = () => React.useContext(RPSGameFactoryContext);
