import { ethers, providers } from "ethers";
import React, { ReactNode } from "react";
import { getProvider } from "../../provider";
import { useWallet } from "../WalletContext";
import { gameReducer } from "./reducer";
import { initialState } from "./state";
import { getContractAddress } from "../../helpers";
// RPS Game Contract ABI
import { abi as rpsGameAbi } from "../../abis/RPSGame.json";
import { fetchPlayers } from "./actions";
import { RPSGame } from "../../RPSGame";
import { GameState, Move } from "./contractContext";
interface ContractState extends GameState {
  submitMove?: (moveHash: string) => void;
  revealMove?: (move: Move, salt: string) => void;
  depositBet?: () => void;
  withdrawFund?: () => void;
}

export const ContractContext = React.createContext<ContractState>(initialState);

type ProviderProps = {
  children: ReactNode;
};
export const ContractProvider = ({ children }: ProviderProps) => {
  const { walletAddress } = useWallet();

  const [state, dispatch] = React.useReducer(gameReducer, initialState);
  const [contract, setContract] = React.useState<RPSGame>();
  const [provider, setProvider] = React.useState<providers.JsonRpcProvider>();

  console.log({
    walletAddress,
    contract,
    dispatch,
    provider,
  });
  React.useEffect(() => {
    async function init() {
      // TODO: Fetch Player A player B bet amount and game state
      const _provider = await getProvider();
      setProvider(_provider);
      const signer = _provider.getSigner();
      const _contract = new ethers.Contract(
        getContractAddress(),
        rpsGameAbi,
        signer
      ) as unknown as RPSGame;
      setContract(_contract);
      const players = await fetchPlayers(_contract);
      console.log(players);
    }
    init();
  }, []);

  return (
    <ContractContext.Provider value={state}>
      {children}
    </ContractContext.Provider>
  );
};
