export enum GameStage {
  Open,
  BetsDeposited,
  MovesSubmitted,
  MoveRevealed,
  Completed,
}
enum Move {
  None,
  Rock,
  Paper,
  Scissors,
}
interface Player {
  move: Move;
  hashedMove: string;
  balance: string;
  addr: string;
  submitted: boolean;
  revealed: boolean;
}
interface GameState {
  currentPlayer: Player | null;
  opponent: Player | null;
  gameState: GameStage | null;
  betAmount: string | null;
}
