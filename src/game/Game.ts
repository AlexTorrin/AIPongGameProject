import { Ball } from '../entities/Ball';
import { Paddle } from '../entities/Paddle';
import { PhysicsEngine } from '../services/PhysicsEngine';
import { CollisionDetector } from '../services/CollisionDetector';
import { ScoreManager, ScoreObserver } from '../services/ScoreManager';
import { AIController, BasicAIStrategy } from '../services/AIController';
import { Renderer } from '../rendering/Renderer';
import { CompositeInputHandler } from '../input/CompositeInputHandler';
import { MouseInputHandler } from '../input/MouseInputHandler';
import { KeyboardInputHandler } from '../input/KeyboardInputHandler';
import {
  DEFAULT_GAME_CONFIG,
  GameConfig,
} from '../types/GameConfig';
import {
  INITIAL_GAME_STATE,
  GameState,
} from '../types/GameState';

/**
 * Main game class - Facade pattern
 * Orchestrates all game systems
 * SRP: Coordinates game logic
 */
export class Game implements ScoreObserver {
  private config: GameConfig;
  private gameState: GameState;
  private playerPaddle: Paddle;
  private computerPaddle: Paddle;
  private ball: Ball;
  private physicsEngine: PhysicsEngine;
  private scoreManager: ScoreManager;
  private aiController: AIController;
  private renderer: Renderer;
  private inputHandler: CompositeInputHandler;
  private canvas: HTMLCanvasElement;
  private isRunning: boolean = false;

  constructor(
    canvas: HTMLCanvasElement,
    config: GameConfig = DEFAULT_GAME_CONFIG,
  ) {
    this.canvas = canvas;
    this.config = config;
    this.gameState = { ...INITIAL_GAME_STATE };

    // Initialize entities
    this.playerPaddle = new Paddle(
      10,
      this.config.canvasHeight / 2 - this.config.paddleHeight / 2,
      this.config.paddleWidth,
      this.config.paddleHeight,
      this.config.canvasHeight,
    );

    this.computerPaddle = new Paddle(
      this.config.canvasWidth - this.config.paddleWidth - 10,
      this.config.canvasHeight / 2 - this.config.paddleHeight / 2,
      this.config.paddleWidth,
      this.config.paddleHeight,
      this.config.canvasHeight,
    );

    this.ball = new Ball(
      this.config.canvasWidth / 2,
      this.config.canvasHeight / 2,
      this.config.ballRadius,
      this.config.ballInitialSpeed,
      this.config.ballMaxSpeed,
    );

    // Initialize services
    this.physicsEngine = new PhysicsEngine(this.config);
    this.scoreManager = new ScoreManager(this.gameState, this.config);
    this.scoreManager.addObserver(this);
    this.aiController = new AIController(new BasicAIStrategy());
    this.renderer = new Renderer(canvas, this.config);
    this.inputHandler = new CompositeInputHandler();

    // Setup input handlers
    this.setupInputHandlers();
  }

  private setupInputHandlers(): void {
    this.inputHandler.addHandler(new MouseInputHandler(this.canvas));
    this.inputHandler.addHandler(new KeyboardInputHandler());
  }

  /**
   * Start the game loop
   */
  start(): void {
    this.isRunning = true;
    this.gameLoop();
  }

  /**
   * Stop the game
   */
  stop(): void {
    this.isRunning = false;
  }

  /**
   * Reset the game
   */
  reset(): void {
    this.scoreManager.resetScore();
    this.ball.resetPosition(
      this.config.canvasWidth / 2,
      this.config.canvasHeight / 2,
    );
  }

  /**
   * Main game loop
   */
  private gameLoop = (): void => {
    if (!this.isRunning) return;

    // Update input
    this.inputHandler.update(this.playerPaddle);

    // Update physics
    if (this.gameState.gameRunning) {
      const scoring = this.physicsEngine.updateBall(
        this.ball,
        this.playerPaddle,
        this.computerPaddle,
      );

      if (scoring.playerScored) {
        this.scoreManager.playerScores();
        this.ball.resetPosition(
          this.config.canvasWidth / 2,
          this.config.canvasHeight / 2,
        );
      }

      if (scoring.computerScored) {
        this.scoreManager.computerScores();
        this.ball.resetPosition(
          this.config.canvasWidth / 2,
          this.config.canvasHeight / 2,
        );
      }

      // Update AI
      this.aiController.update(
        this.computerPaddle,
        this.ball,
        this.config.computerSpeed,
      );
      this.computerPaddle.update();
    }

    // Render
    this.renderer.render(
      this.playerPaddle,
      this.computerPaddle,
      this.ball,
      this.gameState,
    );

    requestAnimationFrame(this.gameLoop);
  };

  /**
   * ScoreObserver implementation
   */
  onScoreChanged(playerScore: number, computerScore: number): void {
    this.renderer.drawScore(playerScore, computerScore);

    if (this.gameState.gameOver && this.gameState.winner) {
      this.renderer.drawGameOver(this.gameState.winner);
    }
  }
}