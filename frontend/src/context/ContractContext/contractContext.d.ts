export enum GameStage {
  Open,
  BetsDeposited,
  MovesSubmitted,
  MoveRevealed,
  Completed,
}
export enum Move {
  None,
  Rock,
  Paper,
  Scissors,
}
export interface Player {
  move?: Move;
  hashedMove?: string;
  balance?: string;
  addr?: string;
  submitted?: boolean;
  revealed?: boolean;
}
export interface GameState {
  currentPlayer: Player | null;
  opponent: Player | null;
  gameStage: GameStage | null;
  betAmount: string | null;
  isPlayer?: boolean;
}
