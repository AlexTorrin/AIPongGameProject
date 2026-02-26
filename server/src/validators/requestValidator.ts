import { z } from 'zod';
import {
  StartGameRequest,
  UpdateGameStateRequest,
  EndGameRequest,
  UpdatePlayerProfileRequest,
} from '@pong/shared';

/**
 * Request validators for server
 * SRP: Validate incoming requests
 */

export const StartGameRequestSchema = z.object({
  playerId: z.string().uuid(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
});

export const UpdateGameStateRequestSchema = z.object({
  sessionId: z.string().uuid(),
  playerPaddleY: z.number(),
  timestamp: z.number(),
});

export const EndGameRequestSchema = z.object({
  sessionId: z.string().uuid(),
  finalScore: z.object({
    player: z.number().nonnegative().int(),
    computer: z.number().nonnegative().int(),
  }),
});

export const UpdatePlayerProfileRequestSchema = z.object({
  playerId: z.string().uuid(),
  username: z.string().min(3).max(50).optional(),
});

// Validator function
export function validateRequest<T>(schema: z.ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Validation error: ${error.errors.map((e) => e.message).join(', ')}`);
    }
    throw error;
  }
}