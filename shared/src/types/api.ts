/**
 * API request/response types
 * Single Responsibility: Define API contracts
 */

// Game Endpoints

export interface GetGameStateRequest {
  sessionId: string;
}

export interface GetGameStateResponse {
  success: boolean;
  data?: {
    gameState: Record<string, unknown>;
    config: Record<string, unknown>;
  };
  error?: string;
}

export interface UpdateGameStateRequest {
  sessionId: string;
  playerPaddleY: number;
  timestamp: number;
}

export interface UpdateGameStateResponse {
  success: boolean;
  data?: Record<string, unknown>;
  error?: string;
}

export interface StartGameRequest {
  playerId: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface StartGameResponse {
  success: boolean;
  data?: {
    sessionId: string;
    config: Record<string, unknown>;
  };
  error?: string;
}

export interface EndGameRequest {
  sessionId: string;
  finalScore: {
    player: number;
    computer: number;
  };
}

export interface EndGameResponse {
  success: boolean;
  data?: {
    gameSession: Record<string, unknown>;
  };
  error?: string;
}

// Player Endpoints

export interface GetPlayerStatsRequest {
  playerId: string;
}

export interface GetPlayerStatsResponse {
  success: boolean;
  data?: {
    player: Record<string, unknown>;
    stats: Record<string, unknown>;
  };
  error?: string;
}

export interface UpdatePlayerProfileRequest {
  playerId: string;
  username?: string;
}

export interface UpdatePlayerProfileResponse {
  success: boolean;
  data?: Record<string, unknown>;
  error?: string;
}

// Generic API Response

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: number;
}