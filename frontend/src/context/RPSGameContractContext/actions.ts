import { BigNumber, ethers } from "ethers";
import { RPSGame } from "../../RPSGame";
import { GameStage, GameState, Move, Player } from "./contractContext";
export enum StateActionType {
  UpdatePlayer,
  UpdateOpponent,
  UpdateGameStage,
  UpdateGameState,
  UpdateWinner,
}
export interface UpdateWinner {
  type: StateActionType.UpdateWinner;
  payload: string;
}
export interface UpdatePlayer {
  type: StateActionType.UpdatePlayer;
  payload: Player;
}
export interface UpdateGameState {
  type: StateActionType.UpdateGameState;
  payload: GameState;
}
export interface UpdateOpponent {
  type: StateActionType.UpdateOpponent;
  payload: Player;
}
export interface UpdateGameStage {
  type: StateActionType.UpdateGameStage;
  payload: GameStage;
}

export type StateActions =
  | UpdatePlayer
  | UpdateOpponent
  | UpdateGameStage
  | UpdateWinner
  | UpdateGameState;

export enum ActionType {
  SubmitMove,
  RevealMove,
  WithdrawBalance,
}

export interface SubmitMove {
  type: ActionType.SubmitMove;
  payload: { hashedMove: string; address?: string };
}

export interface RevealMove {
  type: ActionType.RevealMove;
  payload: { move: number; salt?: string; address?: string };
}
export interface WithdrawBalance {
  type: ActionType.WithdrawBalance;
}

export type GameActions = SubmitMove | RevealMove | WithdrawBalance;

export interface PlayerFromContract {
  move: number;
  hashedMove: string;
  balance: BigNumber;
  addr: string;
  submitted: boolean;
  revealed: boolean;
  0: number;
  1: string;
  2: BigNumber;
  3: string;
  4: boolean;
  5: boolean;
}
export function getFormattedPlayer(_player: PlayerFromContract) {
  const player: Player = {
    move: _player.move,
    hashedMove: _player.hashedMove,
    balance: ethers.utils.formatEther(_player.balance),
    addr: _player.addr,
    submitted: _player.submitted,
    revealed: _player.revealed,
  };
  return player;
}

export async function fetchGameState(
  contract: RPSGame,
  connectedAddress: string = ""
): Promise<GameState> {
  const _playerA = await contract.playerA();
  const _playerB = await contract.playerB();
  const _betAmount = await contract.betAmount();
  const _gameStage = await contract.gameStage();
  const _winner = await contract.winner();
  const betAmount_ = ethers.utils.formatEther(_betAmount);
  const playerA: Player = getFormattedPlayer(_playerA);
  const playerB: Player = getFormattedPlayer(_playerB);
  let opponent: Player;
  let player: Player;
  if (playerA.addr === connectedAddress) {
    player = playerA;
    opponent = playerB;
  } else {
    player = playerB;
    opponent = playerA;
  }
  return {
    currentPlayer: player,
    opponent,
    betAmount: betAmount_,
    gameStage: _gameStage,
    isPlayer: [player.addr, opponent.addr].includes(connectedAddress),
    winner: _winner,
  };
}

export async function withdrawFund(
  contract: RPSGame,
  setPending: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> {
  const tx = await contract.withdrawFund();
  setPending(true);
  await tx.wait();
  setPending(false);
}

const getHashedMove = (_move: Move, _salt: string) => {
  const hashedMove = ethers.utils.solidityKeccak256(
    ["uint8", "bytes32"],
    [_move, _salt]
  );
  return hashedMove;
};

export async function _submitMove(
  contract: RPSGame,
  betAmount: string,
  move: Move,
  salt: string,
  setPending: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> {
  const _bsalt = ethers.utils.id(salt);
  const hashedMove = getHashedMove(move, _bsalt);
  const tx = await contract.submitMove(hashedMove, {
    value: ethers.utils.parseEther(betAmount),
  });
  setPending(true);
  await tx.wait();
  setPending(false);
}

export async function _revealMove(
  contract: RPSGame,
  move: Move,
  salt: string,
  setPending: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> {
  const _bsalt = ethers.utils.id(salt);
  const tx = await contract.revealMove(move, _bsalt);
  setPending(true);
  await tx.wait();
  setPending(false);
}

export async function _resetGame(
  contract: RPSGame,
  setPending: React.Dispatch<React.SetStateAction<boolean>>
) {
  const tx = await contract.resetGame();
  setPending(true);
  await tx.wait();
  setPending(false);
}
