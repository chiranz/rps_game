import { ActionType, GameActions } from "./actions";
import { GameState } from "./contractContext";

export function gameReducer(state: GameState, action: GameActions): GameState {
  switch (action.type) {
    case ActionType.DepositFund:
      //   Todo: Deposit bet
      // Set Global transaction status depositing
      //
      return { ...state };
    case ActionType.SubmitMove:
      //   Show transaction pending loader
      //   Call submitmove with data
      return { ...state };
    case ActionType.RevealMove:
      // Show transaction pending loader
      // call reveal move with payload hash and loader
      return { ...state };

    default:
      return state;
  }
}
