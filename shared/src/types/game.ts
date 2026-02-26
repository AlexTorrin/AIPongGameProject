/**
 * Shared game types for client and server
 * Single Responsibility: Define game domain types
 */

export interface Vector2D {
  x: number;
  y: number;
}

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

export interface GameState {
  playerScore: number;
  computerScore: number;
  gameRunning: boolean;
  gameOver: boolean;
  winner: 'player' | 'computer' | null;
  timestamp: number;
}

export interface PaddleState {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface BallState {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  radius: number;
}

export interface GameSnapshot {
  id: string;
  gameState: GameState;
  playerPaddle: PaddleState;
  computerPaddle: PaddleState;
  ball: BallState;
  timestamp: number;
}

export interface GameEvent {
  type: 'PADDLE_MOVE' | 'SCORE' | 'GAME_START' | 'GAME_END' | 'RESET';
  payload: Record<string, unknown>;
  timestamp: number;
}

export interface Player {
  id: string;
  username: string;
  elo: number;
  wins: number;
  losses: number;
  joinedAt: Date;
}

export interface GameSession {
  id: string;
  playerId: string;
  finalScore: {
    player: number;
    computer: number;
  };
  winner: 'player' | 'computer';
  duration: number;
  createdAt: Date;
  completedAt: Date;
}