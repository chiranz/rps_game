export enum ActionType {
  DepositFund,
  SubmitMove,
  RevealMove,
  WithdrawBalance,
}

export interface DepositBet {
  type: ActionType.DepositFund;
  payload: { amount: string };
}
export interface SubmitMove {
  type: ActionType.SubmitMove;
  payload: { hashedMove: string };
}
export interface RevealMove {
  type: ActionType.RevealMove;
  payload: { move: number; salt: string };
}
export interface WithdrawBalance {
  type: ActionType.WithdrawBalance;
}

export type GameActions =
  | DepositBet
  | SubmitMove
  | RevealMove
  | WithdrawBalance;
