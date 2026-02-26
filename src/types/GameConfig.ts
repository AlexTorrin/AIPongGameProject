/**
 * Game configuration constants
 * SRP: Only responsible for storing configuration
 */
export interface GameConfig {
  canvasWidth: number;
  canvasHeight: number;
  paddleWidth: number;
  paddleHeight: number;
  ballRadius: number;
  ballInitialSpeed: number;
  ballMaxSpeed: number;
  paddleSpeed: number;
  computerSpeed: number;
  winScore: number;
}

export const DEFAULT_GAME_CONFIG: GameConfig = {
  canvasWidth: 800,
  canvasHeight: 400,
  paddleWidth: 10,
  paddleHeight: 80,
  ballRadius: 6,
  ballInitialSpeed: 5,
  ballMaxSpeed: 8,
  paddleSpeed: 6,
  computerSpeed: 5,
  winScore: 11,
};