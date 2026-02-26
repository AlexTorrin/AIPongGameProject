import { Ball } from '../entities/Ball';
import { Paddle } from '../entities/Paddle';
import { Vector2D } from '../types/Vector2D';

/**
 * Handles collision detection
 * SRP: Only responsible for detecting collisions
 * DIP: Depends on abstractions (interfaces) not concrete implementations
 */
export interface CollisionResult {
  collided: boolean;
  contactPoint?: number;
}

export class CollisionDetector {
  /**
   * Detect collision between ball and paddle
   */
  detectPaddleCollision(ball: Ball, paddle: Paddle): CollisionResult {
    const ballPos = ball.getPosition();
    const ballRadius = ball.getRadius();
    const paddlePos = paddle.getPosition();
    const paddleWidth = paddle.getWidth();
    const paddleHeight = paddle.getHeight();

    // Check if ball is within paddle's horizontal and vertical bounds
    if (
      ballPos.x - ballRadius < paddlePos.x + paddleWidth &&
      ballPos.x + ballRadius > paddlePos.x &&
      ballPos.y > paddlePos.y &&
      ballPos.y < paddlePos.y + paddleHeight
    ) {
      const contactPoint =
        (ballPos.y - (paddlePos.y + paddleHeight / 2)) / (paddleHeight / 2);
      return { collided: true, contactPoint };
    }

    return { collided: false };
  }

  /**
   * Detect collision with top and bottom walls
   */
  detectWallCollision(
    ball: Ball,
    canvasHeight: number,
  ): { topCollision: boolean; bottomCollision: boolean } {
    const ballPos = ball.getPosition();
    const ballRadius = ball.getRadius();

    return {
      topCollision: ballPos.y - ballRadius < 0,
      bottomCollision: ballPos.y + ballRadius > canvasHeight,
    };
  }

  /**
   * Detect if ball is out of bounds (scoring)
   */
  detectScoringEvent(ball: Ball, canvasWidth: number): 'left' | 'right' | null {
    const ballPos = ball.getPosition();
    const ballRadius = ball.getRadius();

    if (ballPos.x - ballRadius < 0) return 'left';
    if (ballPos.x + ballRadius > canvasWidth) return 'right';
    return null;
  }

  /**
   * Clamp ball position to keep it in bounds
   */
  clampBallPosition(
    ball: Ball,
    canvasWidth: number,
    canvasHeight: number,
  ): void {
    const ballPos = ball.getPosition();
    const ballRadius = ball.getRadius();

    if (ballPos.y - ballRadius < 0) {
      ball.setPosition(new Vector2D(ballPos.x, ballRadius));
    }
    if (ballPos.y + ballRadius > canvasHeight) {
      ball.setPosition(
        new Vector2D(ballPos.x, canvasHeight - ballRadius),
      );
    }
  }
}