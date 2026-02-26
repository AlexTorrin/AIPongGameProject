import { Ball } from '../entities/Ball';
import { Paddle } from '../entities/Paddle';
import { CollisionDetector, CollisionResult } from './CollisionDetector';
import { GameConfig } from '../types/GameConfig';

/**
 * Physics engine for ball movement and collisions
 * SRP: Only responsible for physics calculations
 * OCP: Open for extension (can add new collision types)
 */
export class PhysicsEngine {
  private collisionDetector: CollisionDetector;

  constructor(private config: GameConfig) {
    this.collisionDetector = new CollisionDetector();
  }

  /**
   * Update ball physics and handle collisions
   */
  updateBall(
    ball: Ball,
    playerPaddle: Paddle,
    computerPaddle: Paddle,
  ): { playerScored: boolean; computerScored: boolean } {
    ball.update();

    // Wall collisions
    const wallCollision = this.collisionDetector.detectWallCollision(
      ball,
      this.config.canvasHeight,
    );
    if (wallCollision.topCollision || wallCollision.bottomCollision) {
      ball.bounceY();
    }

    // Paddle collisions
    const playerCollision = this.collisionDetector.detectPaddleCollision(
      ball,
      playerPaddle,
    );
    if (playerCollision.collided) {
      this.handlePaddleCollision(ball, playerCollision);
    }

    const computerCollision = this.collisionDetector.detectPaddleCollision(
      ball,
      computerPaddle,
    );
    if (computerCollision.collided) {
      this.handlePaddleCollision(ball, computerCollision);
    }

    // Scoring
    const scoringEvent = this.collisionDetector.detectScoringEvent(
      ball,
      this.config.canvasWidth,
    );

    this.collisionDetector.clampBallPosition(
      ball,
      this.config.canvasWidth,
      this.config.canvasHeight,
    );

    return {
      playerScored: scoringEvent === 'left',
      computerScored: scoringEvent === 'right',
    };
  }

  private handlePaddleCollision(ball: Ball, collision: CollisionResult): void {
    ball.bounceX();
    ball.addSpin(collision.contactPoint || 0);
    ball.increaseSpeed();
  }
}