import { BigNumber } from "ethers";
import { RPSGame } from "../../RPSGame";
import { Player } from "./contractContext";

export enum ActionType {
  DepositFund,
  SubmitMove,
  RevealMove,
  WithdrawBalance,
}

export interface DepositBet {
  type: ActionType.DepositFund;
  payload: { amount: string; address?: string };
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

export type GameActions =
  | DepositBet
  | SubmitMove
  | RevealMove
  | WithdrawBalance;

interface PlayerFromContract {
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
function getFormattedPlayer(_player: PlayerFromContract) {
  const player: Player = {
    move: _player.move,
    hashedMove: _player.hashedMove,
    balance: _player.balance.toString(),
    addr: _player.addr,
    submitted: _player.submitted,
    revealed: _player.revealed,
  };
  return player;
}

export async function fetchPlayers(contract: RPSGame): Promise<Player[]> {
  const _playerA = await contract.playerA();
  const _playerB = await contract.playerB();
  const playerA: Player = getFormattedPlayer(_playerA);
  const playerB: Player = getFormattedPlayer(_playerB);
  return [playerA, playerB];
}
