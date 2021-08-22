import { ethers } from "ethers";
import React, { ReactNode } from "react";
import { getProvider } from "../../provider";
import { useWallet } from "../WalletContext";
import { gameReducer } from "./reducer";
import { initialState } from "./state";
import { abi as rpsGameAbi } from "../../abis/RPSGame.json";
import {
  depositBet,
  fetchGameState,
  getFormattedPlayer,
  _revealMove,
  StateActionType,
  _submitMove,
  _resetGame,
} from "./actions";
import { RPSGame } from "../../RPSGame";
import { GameState, Move } from "./contractContext";
import { useMessage } from "../MessageContext";
import { useRPSGameFactory } from "../RPSGameFactoryContext";
interface ContractState extends GameState {
  submitMove?: (move: Move, salt: string) => void;
  revealMove?: (move: Move, salt: string) => void;
  depositBet?: () => void;
  withdrawFund?: () => void;
  resetGame?: () => void;
}

export const ContractContext = React.createContext<ContractState>(initialState);

type ProviderProps = {
  children: ReactNode;
};
export const ContractProvider = ({ children }: ProviderProps) => {
  const { selectedGameAddress } = useRPSGameFactory();
  const { walletAddress } = useWallet();
  const { setGlobalMessage } = useMessage();

  const [state, dispatch] = React.useReducer(gameReducer, initialState);
  const [contract, setContract] = React.useState<RPSGame>();

  React.useEffect(() => {
    async function init() {
      const _provider = await getProvider();
      const signer = _provider.getSigner();
      const _contract = new ethers.Contract(
        selectedGameAddress,
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
  }, [walletAddress, dispatch, selectedGameAddress]);
  async function handleDeposit() {
    if (contract) {
      // Set loading
      await depositBet(contract, state.betAmount || "");
      // Refetch Player on action and opponent on event
    }
  }
  async function handleMoveSubmit(move: Move, salt: string) {
    if (contract) {
      // Set loading
      await _submitMove(contract, move, salt);
      // Refetch Player on action and opponent on event
    }
  }
  async function handleRevealMove(move: Move, salt: string) {
    if (contract) {
      await _revealMove(contract, move, salt);
    }
  }
  async function handleResetGame() {
    if (contract) {
      await _resetGame(contract);
    }
  }
  if (contract) {
    // GAMESTAGECHANGED EVENT
    contract.on("GameStageChanged", (gameStage) => {
      dispatch({
        type: StateActionType.UpdateGameStage,
        payload: gameStage,
      });

      setGlobalMessage({
        message: "Game Stage changed",
        type: "info",
      });
      setTimeout(() => {
        setGlobalMessage({});
      }, 3000);
    });

    // WINNER EVENT
    contract.on("Winner", (winner) => {
      dispatch({
        type: StateActionType.UpdateWinner,
        payload: winner,
      });
    });

    // Fetch Player
    const fetchPlayer = async (address: string) => {
      const player = await contract.getPlayer(address);
      const formattedPlayer = getFormattedPlayer(player);
      if (address === walletAddress) {
        dispatch({
          type: StateActionType.UpdatePlayer,
          payload: formattedPlayer,
        });
      } else {
        dispatch({
          type: StateActionType.UpdateOpponent,
          payload: formattedPlayer,
        });
      }
    };
    contract.on("Deposit", async (address) => {
      fetchPlayer(address);
    });
    contract.on("SubmitMove", async (address) => {
      fetchPlayer(address);
    });
    contract.on("RevealMove", async (address) => {
      fetchPlayer(address);
    });
    contract.on("ResetGame", async () => {
      const gameState = await fetchGameState(contract, walletAddress);
      dispatch({
        type: StateActionType.UpdateGameState,
        payload: gameState,
      });
    });
  }
  // TODO: How do you handle draw event? What are the things you want to update

  return (
    <ContractContext.Provider
      value={{
        ...state,
        depositBet: handleDeposit,
        submitMove: handleMoveSubmit,
        revealMove: handleRevealMove,
        resetGame: handleResetGame,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export const useRPSGameContract = () => React.useContext(ContractContext);
