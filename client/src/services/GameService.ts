import { GameApiClient } from '../api/GameApiClient';
import { GameStore } from '../store/GameStore';
import { StartGameRequest } from '@pong/shared';

/**
 * Game Service - Bridge between UI and API
 * SRP: Orchestrates game-related operations
 * DIP: Depends on GameApiClient and GameStore abstractions
 */
export class GameService {
  constructor(
    private apiClient: GameApiClient,
    private store: GameStore,
  ) {}

  async startNewGame(playerId: string, difficulty?: 'easy' | 'medium' | 'hard'): Promise<string> {
    try {
      const request: StartGameRequest = { playerId, difficulty };
      const response = await this.apiClient.startGame(request);

      if (!response.success) {
        throw new Error(response.error || 'Failed to start game');
      }

      const sessionId = response.data?.sessionId;
      if (!sessionId) {
        throw new Error('No session ID returned from server');
      }

      this.store.setSessionId(sessionId);
      return sessionId;
    } catch (error) {
      console.error('Failed to start game:', error);
      throw error;
    }
  }

  async updateGameState(playerPaddleY: number): Promise<void> {
    const sessionId = this.store.getSessionId();
    if (!sessionId) {
      throw new Error('No active game session');
    }

    try {
      const response = await this.apiClient.updateGameState({
        sessionId,
        playerPaddleY,
        timestamp: Date.now(),
      });

      if (!response.success) {
        throw new Error(response.error || 'Failed to update game state');
      }
    } catch (error) {
      console.error('Failed to update game state:', error);
      throw error;
    }
  }

  async endGame(finalScore: { player: number; computer: number }): Promise<void> {
    const sessionId = this.store.getSessionId();
    if (!sessionId) {
      throw new Error('No active game session');
    }

    try {
      const response = await this.apiClient.endGame({
        sessionId,
        finalScore,
      });

      if (!response.success) {
        throw new Error(response.error || 'Failed to end game');
      }

      this.store.resetGame();
    } catch (error) {
      console.error('Failed to end game:', error);
      throw error;
    }
  }
}