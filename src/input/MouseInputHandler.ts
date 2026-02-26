import { InputHandler } from './InputHandler';
import { Paddle } from '../entities/Paddle';

/**
 * Mouse input handler
 * SRP: Only handles mouse input
 */
export class MouseInputHandler extends InputHandler {
  private canvas: HTMLCanvasElement;
  private mouseY: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.setupMouseListener();
  }

  private setupMouseListener(): void {
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseY = e.clientY - rect.top;
    });
  }

  update(paddle: Paddle): void {
    const paddleHeight = paddle.getHeight();
    const targetY = this.mouseY - paddleHeight / 2;
    paddle.setPositionY(targetY);
  }
}