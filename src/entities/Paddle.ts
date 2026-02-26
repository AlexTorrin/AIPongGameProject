import { GameObject } from './GameObject';
import { Vector2D } from '../types/Vector2D';

/**
 * Paddle entity
 * SRP: Only responsible for paddle state and rendering
 */
export class Paddle extends GameObject {
  private width: number;
  private height: number;
  private boundaryTop: number;
  private boundaryBottom: number;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    canvasHeight: number,
  ) {
    super(new Vector2D(x, y));
    this.width = width;
    this.height = height;
    this.boundaryTop = 0;
    this.boundaryBottom = canvasHeight - height;
  }

  update(): void {
    this.position = this.position.add(this.velocity);
    this.clampPosition();
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = '#0f3460';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    ctx.strokeStyle = '#00ff41';
    ctx.lineWidth = 2;
    ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
  }

  private clampPosition(): void {
    if (this.position.y < this.boundaryTop) {
      this.position.y = this.boundaryTop;
    }
    if (this.position.y > this.boundaryBottom) {
      this.position.y = this.boundaryBottom;
    }
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  moveUp(distance: number): void {
    this.position.y -= distance;
    this.clampPosition();
  }

  moveDown(distance: number): void {
    this.position.y += distance;
    this.clampPosition();
  }

  setPositionY(y: number): void {
    this.position.y = y;
    this.clampPosition();
  }
}