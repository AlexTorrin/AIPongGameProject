import { Ball } from '../entities/Ball';
import { Paddle } from '../entities/Paddle';
import { GameState } from '../types/GameState';
import { GameConfig } from '../types/GameConfig';
import { RenderConfig, DEFAULT_RENDER_CONFIG } from './RenderConfig';

/**
 * Renderer for drawing game elements
 * SRP: Only responsible for rendering
 * DIP: Depends on abstractions
 */
export class Renderer {
  private ctx: CanvasRenderingContext2D;
  private renderConfig: RenderConfig;

  constructor(
    private canvas: HTMLCanvasElement,
    private config: GameConfig,
    renderConfig: RenderConfig = DEFAULT_RENDER_CONFIG,
  ) {
    const context = this.canvas.getContext('2d');
    if (!context) {
      throw new Error('Could not get 2D context from canvas');
    }
    this.ctx = context;
    this.renderConfig = renderConfig;
  }

  render(
    playerPaddle: Paddle,
    computerPaddle: Paddle,
    ball: Ball,
    gameState: GameState,
  ): void {
    this.clearCanvas();
    this.drawCenterLine();
    this.drawPaddle(playerPaddle);
    this.drawPaddle(computerPaddle);
    this.drawBall(ball);
  }

  private clearCanvas(): void {
    this.ctx.fillStyle = this.renderConfig.backgroundColor;
    this.ctx.fillRect(
      0,
      0,
      this.config.canvasWidth,
      this.config.canvasHeight,
    );
  }

  private drawCenterLine(): void {
    this.ctx.strokeStyle = this.renderConfig.centerLineColor;
    this.ctx.setLineDash(this.renderConfig.centerLineDashPattern);
    this.ctx.beginPath();
    this.ctx.moveTo(this.config.canvasWidth / 2, 0);
    this.ctx.lineTo(this.config.canvasWidth / 2, this.config.canvasHeight);
    this.ctx.stroke();
    this.ctx.setLineDash([]);
  }

  private drawPaddle(paddle: Paddle): void {
    paddle.draw(this.ctx);
  }

  private drawBall(ball: Ball): void {
    ball.draw(this.ctx);
  }

  drawScore(playerScore: number, computerScore: number): void {
    const scoreElement = document.getElementById('scoreBoard');
    if (scoreElement) {
      scoreElement.textContent = `Player: ${playerScore} | Computer: ${computerScore}`;
    }
  }

  drawGameOver(winner: 'player' | 'computer'): void {
    const message =
      winner === 'player' ? 'You Win!' : 'Computer Wins!';
    const messageElement = document.getElementById('gameOverMessage');
    if (messageElement) {
      messageElement.textContent = message;
      messageElement.style.display = 'block';
    }
  }
}