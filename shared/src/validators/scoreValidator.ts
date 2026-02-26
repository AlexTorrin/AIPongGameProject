import { z } from 'zod';

/**
 * Score and player validators using Zod
 * Single Responsibility: Validate scoring data
 */

// Player validation
export const PlayerSchema = z.object({
  id: z.string().uuid(),
  username: z.string().min(3).max(50),
  elo: z.number().nonnegative().default(1000),
  wins: z.number().nonnegative().int().default(0),
  losses: z.number().nonnegative().int().default(0),
  joinedAt: z.date(),
});

// Game session validation
export const GameSessionSchema = z.object({
  id: z.string().uuid(),
  playerId: z.string().uuid(),
  finalScore: z.object({
    player: z.number().nonnegative().int(),
    computer: z.number().nonnegative().int(),
  }),
  winner: z.enum(['player', 'computer']),
  duration: z.number().positive(),
  createdAt: z.date(),
  completedAt: z.date(),
});

// Leaderboard entry validation
export const LeaderboardEntrySchema = z.object({
  rank: z.number().positive().int(),
  player: PlayerSchema,
  totalWins: z.number().nonnegative().int(),
  totalGames: z.number().nonnegative().int(),
  winRate: z.number().min(0).max(1),
});

// Player statistics validation
export const PlayerStatsSchema = z.object({
  playerId: z.string().uuid(),
  totalGames: z.number().nonnegative().int(),
  totalWins: z.number().nonnegative().int(),
  totalLosses: z.number().nonnegative().int(),
  winRate: z.number().min(0).max(1),
  averageGameDuration: z.number().nonnegative(),
  longestWinStreak: z.number().nonnegative().int(),
});

// Type exports
export type Player = z.infer<typeof PlayerSchema>;
export type GameSession = z.infer<typeof GameSessionSchema>;
export type LeaderboardEntry = z.infer<typeof LeaderboardEntrySchema>;
export type PlayerStats = z.infer<typeof PlayerStatsSchema>;