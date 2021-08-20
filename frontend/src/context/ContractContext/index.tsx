import { ethers, providers } from "ethers";
import React, { ReactNode } from "react";
import { getProvider } from "../../provider";
import { useWallet } from "../WalletContext";
import { gameReducer } from "./reducer";
import { initialState } from "./state";
import { getContractAddress } from "../../helpers";
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
  // TODO: add winner to state
  // TODO: Update entire state on winner event
  // TODO: Replay should reset the game if gamestage is completed
  // TODO: How do you handle draw event? What are the things you want to update
  // TODO: How do you update the ui on revealed? Opps! you won and Opps you lost

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

export const useContract = () => React.useContext(ContractContext);
