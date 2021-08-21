import { StateActions, StateActionType } from "./actions";
import { GameState } from "./contractContext";

export function gameReducer(state: GameState, action: StateActions): GameState {
  switch (action.type) {
    case StateActionType.UpdateGameState:
      return { ...action.payload };
    case StateActionType.UpdatePlayer:
      return { ...state, currentPlayer: action.payload };
    case StateActionType.UpdateOpponent:
      return { ...state, opponent: action.payload };
    case StateActionType.UpdateGameStage:
      return { ...state, gameStage: action.payload };
    case StateActionType.UpdateWinner:
      return { ...state, winner: action.payload };

    default:
      return state;
  }
}
