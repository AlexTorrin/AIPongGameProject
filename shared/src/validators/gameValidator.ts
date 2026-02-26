import { z } from 'zod';

/**
 * Game validators using Zod
 * Single Responsibility: Validate game data
 */

// Vector2D validation
export const Vector2DSchema = z.object({
  x: z.number().finite(),
  y: z.number().finite(),
});

// Game config validation
export const GameConfigSchema = z.object({
  canvasWidth: z.number().positive(),
  canvasHeight: z.number().positive(),
  paddleWidth: z.number().positive(),
  paddleHeight: z.number().positive(),
  ballRadius: z.number().positive(),
  ballInitialSpeed: z.number().positive(),
  ballMaxSpeed: z.number().positive(),
  paddleSpeed: z.number().positive(),
  computerSpeed: z.number().positive(),
  winScore: z.number().positive().int(),
});

// Game state validation
export const GameStateSchema = z.object({
  playerScore: z.number().nonnegative().int(),
  computerScore: z.number().nonnegative().int(),
  gameRunning: z.boolean(),
  gameOver: z.boolean(),
  winner: z.enum(['player', 'computer']).nullable(),
  timestamp: z.number().positive(),
});

// Paddle state validation
export const PaddleStateSchema = z.object({
  x: z.number(),
  y: z.number(),
  width: z.number().positive(),
  height: z.number().positive(),
});

// Ball state validation
export const BallStateSchema = z.object({
  x: z.number(),
  y: z.number(),
  velocityX: z.number(),
  velocityY: z.number(),
  radius: z.number().positive(),
});

// Game snapshot validation
export const GameSnapshotSchema = z.object({
  id: z.string().uuid(),
  gameState: GameStateSchema,
  playerPaddle: PaddleStateSchema,
  computerPaddle: PaddleStateSchema,
  ball: BallStateSchema,
  timestamp: z.number().positive(),
});

// Game event validation
export const GameEventSchema = z.object({
  type: z.enum(['PADDLE_MOVE', 'SCORE', 'GAME_START', 'GAME_END', 'RESET']),
  payload: z.record(z.unknown()),
  timestamp: z.number().positive(),
});

// Type exports for TypeScript inference
export type GameConfig = z.infer<typeof GameConfigSchema>;
export type GameState = z.infer<typeof GameStateSchema>;
export type PaddleState = z.infer<typeof PaddleStateSchema>;
export type BallState = z.infer<typeof BallStateSchema>;
export type GameSnapshot = z.infer<typeof GameSnapshotSchema>;
export type GameEvent = z.infer<typeof GameEventSchema>;
export type Vector2D = z.infer<typeof Vector2DSchema>;