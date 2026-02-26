import { GameState } from '../types/GameState';
import { GameConfig } from '../types/GameConfig';

/**
 * Manages game scoring
 * SRP: Only responsible for score management
 */
export interface ScoreObserver {
  onScoreChanged(playerScore: number, computerScore: number): void;
}

export class ScoreManager {
  private observers: ScoreObserver[] = [];

  constructor(
    private gameState: GameState,
    private config: GameConfig,
  ) {}

  addObserver(observer: ScoreObserver): void {
    this.observers.push(observer);
  }

  removeObserver(observer: ScoreObserver): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  playerScores(): void {
    this.gameState.playerScore++;
    this.notifyObservers();
    this.checkWinCondition();
  }

  computerScores(): void {
    this.gameState.computerScore++;
    this.notifyObservers();
    this.checkWinCondition();
  }

  private notifyObservers(): void {
    this.observers.forEach((observer) =>
      observer.onScoreChanged(
        this.gameState.playerScore,
        this.gameState.computerScore,
      ),
    );
  }

  private checkWinCondition(): void {
    if (this.gameState.playerScore >= this.config.winScore) {
      this.gameState.gameOver = true;
      this.gameState.winner = 'player';
      this.gameState.gameRunning = false;
    } else if (this.gameState.computerScore >= this.config.winScore) {
      this.gameState.gameOver = true;
      this.gameState.winner = 'computer';
      this.gameState.gameRunning = false;
    }
  }

  resetScore(): void {
    this.gameState.playerScore = 0;
    this.gameState.computerScore = 0;
    this.gameState.gameOver = false;
    this.gameState.winner = null;
    this.gameState.gameRunning = true;
    this.notifyObservers();
  }

  getScores(): { playerScore: number; computerScore: number } {
    return {
      playerScore: this.gameState.playerScore,
      computerScore: this.gameState.computerScore,
    };
  }
}