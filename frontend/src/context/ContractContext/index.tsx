import { ethers, providers } from "ethers";
import React, { ReactNode } from "react";
import { getProvider } from "../../provider";
import { useWallet } from "../WalletContext";
import { gameReducer } from "./reducer";
import { initialState } from "./state";
import { getContractAddress, getTruncatedAddress } from "../../helpers";
// RPS Game Contract ABI
import { abi as rpsGameAbi } from "../../abis/RPSGame.json";
import {
  depositBet,
  fetchGameState,
  getFormattedPlayer,
  revealMove,
  StateActionType,
  submitMove,
} from "./actions";
import { RPSGame } from "../../RPSGame";
import { GameState, Move } from "./contractContext";
import { useMessage } from "../MessageContext";
interface ContractState extends GameState {
  submitMove?: (move: Move, salt: string) => void;
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
  const { setGlobalMessage } = useMessage();

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
      // Set loading
      await depositBet(contract);
      // Refetch Player on action and opponent on event
    }
  }
  async function handleMoveSubmit(move: Move, salt: string) {
    if (contract) {
      // Set loading
      await submitMove(contract, move, salt);
      // Refetch Player on action and opponent on event
    }
  }
  async function handleRevealMove(move: Move, salt: string) {
    if (contract) {
      await revealMove(contract, move, salt);
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
      const message =
        winner === walletAddress
          ? "You won the game!"
          : `${getTruncatedAddress(winner)} won the game!`;
      if (winner === walletAddress) {
        setGlobalMessage({
          message,
          type: "info",
        });
      } else {
      }
    });

    // UPDATE PLAYER
    contract.on("Deposit", async (address) => {
      // Fetch the player
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
    });
    contract.on("SubmitMove", async (address) => {
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
    });
    contract.on("RevealMove", async (address) => {
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
    });
  }

  return (
    <ContractContext.Provider
      value={{
        ...state,
        depositBet: handleDeposit,
        submitMove: handleMoveSubmit,
        revealMove: handleRevealMove,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export const useContract = () => React.useContext(ContractContext);
