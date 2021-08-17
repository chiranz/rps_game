import { GameState } from "./contractContext";

export const initialState: GameState = {
  currentPlayer: null,
  opponent: null,
  gameStage: 0,
  betAmount: "",
  isPlayer: false,
};
