import { ethers, providers } from "ethers";
import React, { ReactNode } from "react";
import { getProvider } from "../../provider";
import { useWallet } from "../WalletContext";
import { gameReducer } from "./reducer";
import { initialState } from "./state";
import { getContractAddress } from "../../helpers";
// RPS Game Contract ABI
import { abi as rpsGameAbi } from "../../abis/RPSGame.json";
import { depositBet, fetchGameState, StateActionType } from "./actions";
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
      const _provider = await getProvider();
      setProvider(_provider);
      const signer = _provider.getSigner();
      const _contract = new ethers.Contract(
        getContractAddress(),
        rpsGameAbi,
        signer
      ) as unknown as RPSGame;
      setContract(_contract);
      const gameState = await fetchGameState(_contract, walletAddress);
      dispatch({
        type: StateActionType.UpdateGameState,
        payload: gameState,
      });
    }
    init();
  }, [walletAddress, dispatch]);
  async function handleDeposit() {
    if (contract) {
      depositBet(contract);
    }
  }

  return (
    <ContractContext.Provider value={{ ...state, depositBet: handleDeposit }}>
      {children}
    </ContractContext.Provider>
  );
};

export const useContract = () => React.useContext(ContractContext);
