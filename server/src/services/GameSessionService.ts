import { v4 as uuid } from 'uuid';
import { GameSessionData, GameResult } from '../types/index';

/**
 * Game Session Service
 * SRP: Manages game sessions
 * OCP: Open for extending session features
 */
export class GameSessionService {
  private sessions: Map<string, GameSessionData> = new Map();
  private results: GameResult[] = [];

  createSession(playerId: string, difficulty: 'easy' | 'medium' | 'hard' = 'medium'): string {
    const sessionId = uuid();
    const session: GameSessionData = {
      id: sessionId,
      playerId,
      startTime: Date.now(),
      lastUpdateTime: Date.now(),
      playerScore: 0,
      computerScore: 0,
      isActive: true,
      difficulty,
    };

    this.sessions.set(sessionId, session);
    return sessionId;
  }

  getSession(sessionId: string): GameSessionData | undefined {
    return this.sessions.get(sessionId);
  }

  updateSession(sessionId: string, updates: Partial<GameSessionData>): void {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    Object.assign(session, updates, { lastUpdateTime: Date.now() });
  }

  endSession(
    sessionId: string,
    playerScore: number,
    computerScore: number,
  ): GameResult {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    const duration = Date.now() - session.startTime;
    const winner = playerScore > computerScore ? 'player' : 'computer';

    const result: GameResult = {
      sessionId,
      playerId: session.playerId,
      playerScore,
      computerScore,
      winner,
      duration,
      difficulty: session.difficulty,
      timestamp: new Date(),
    };

    this.results.push(result);
    session.isActive = false;

    return result;
  }

  deleteSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  getResults(): GameResult[] {
    return [...this.results];
  }

  getPlayerResults(playerId: string): GameResult[] {
    return this.results.filter((r) => r.playerId === playerId);
  }
}