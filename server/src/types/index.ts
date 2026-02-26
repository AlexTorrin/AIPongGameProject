/**
 * Server-specific types
 * Single Responsibility: Define server types
 */

export interface GameSessionData {
  id: string;
  playerId: string;
  startTime: number;
  lastUpdateTime: number;
  playerScore: number;
  computerScore: number;
  isActive: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface PlayerData {
  id: string;
  username: string;
  elo: number;
  totalGames: number;
  wins: number;
  losses: number;
  createdAt: Date;
}

export interface GameResult {
  sessionId: string;
  playerId: string;
  playerScore: number;
  computerScore: number;
  winner: 'player' | 'computer';
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  timestamp: Date;
}