import { GameState, GameConfig } from '@pong/shared';

/**
 * Game State Store
 * SRP: Manages game state
 * OCP: Can be extended with new state management features
 */
export interface StoreObserver {
  onStateChanged(state: GameState): void;
}

export class GameStore {
  private gameState: GameState;
  private gameConfig: GameConfig;
  private observers: Set<StoreObserver> = new Set();
  private sessionId: string | null = null;

  constructor(initialState: GameState, config: GameConfig) {
    this.gameState = { ...initialState };
    this.gameConfig = { ...config };
  }

  // State getters
  getState(): GameState {
    return { ...this.gameState };
  }

  getConfig(): GameConfig {
    return { ...this.gameConfig };
  }

  getSessionId(): string | null {
    return this.sessionId;
  }

  // State setters
  setState(state: Partial<GameState>): void {
    this.gameState = { ...this.gameState, ...state };
    this.notifyObservers();
  }

  setSessionId(sessionId: string): void {
    this.sessionId = sessionId;
  }

  updateScore(player: 'player' | 'computer'): void {
    if (player === 'player') {
      this.gameState.playerScore++;
    } else {
      this.gameState.computerScore++;
    }
    this.notifyObservers();
  }

  resetGame(): void {
    this.gameState.playerScore = 0;
    this.gameState.computerScore = 0;
    this.gameState.gameRunning = true;
    this.gameState.gameOver = false;
    this.gameState.winner = null;
    this.notifyObservers();
  }

  // Observer pattern
  subscribe(observer: StoreObserver): () => void {
    this.observers.add(observer);
    return () => this.observers.delete(observer);
  }

  private notifyObservers(): void {
    this.observers.forEach((observer) => observer.onStateChanged(this.getState()));
  }
}