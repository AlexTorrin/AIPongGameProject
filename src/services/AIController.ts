import { Paddle } from '../entities/Paddle';
import { Ball } from '../entities/Ball';

/**
 * AI controller for computer paddle
 * SRP: Only responsible for AI logic
 * DIP: Depends on abstractions
 */
export interface AIStrategy {
  calculateMove(paddle: Paddle, ball: Ball, speed: number): void;
}

export class BasicAIStrategy implements AIStrategy {
  calculateMove(paddle: Paddle, ball: Ball, speed: number): void {
    const paddleCenter = paddle.getPosition().y + paddle.getHeight() / 2;
    const ballY = ball.getPosition().y;

    const deadZone = 35;

    if (ballY < paddleCenter - deadZone) {
      paddle.moveUp(speed);
    } else if (ballY > paddleCenter + deadZone) {
      paddle.moveDown(speed);
    }
  }
}

export class AIController {
  private strategy: AIStrategy;

  constructor(strategy: AIStrategy = new BasicAIStrategy()) {
    this.strategy = strategy;
  }

  setStrategy(strategy: AIStrategy): void {
    this.strategy = strategy;
  }

  update(paddle: Paddle, ball: Ball, speed: number): void {
    this.strategy.calculateMove(paddle, ball, speed);
  }
}