import { GameObject } from './GameObject';
import { Vector2D } from '@pong/shared';

export class Ball extends GameObject {
  private radius: number;
  private maxSpeed: number;

  constructor(
    x: number,
    y: number,
    radius: number,
    initialSpeed: number,
    maxSpeed: number,
  ) {
    super({ x, y }, { x: initialSpeed, y: initialSpeed * 0.5 });
    this.radius = radius;
    this.maxSpeed = maxSpeed;
  }

  update(): void {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = '#00ff41';
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  getRadius(): number {
    return this.radius;
  }

  bounceY(): void {
    this.velocity.y = -this.velocity.y;
  }

  bounceX(): void {
    this.velocity.x = -this.velocity.x;
  }

  resetPosition(centerX: number, centerY: number): void {
    this.position.x = centerX;
    this.position.y = centerY;
    this.resetVelocity();
  }

  private resetVelocity(): void {
    const angle = Math.random() * Math.PI * 0.4 - Math.PI * 0.2;
    const direction = Math.random() > 0.5 ? 1 : -1;
    this.velocity = {
      x: Math.cos(angle) * 5 * direction,
      y: Math.sin(angle) * 5,
    };
  }

  addSpin(paddleContactPoint: number): void {
    this.velocity.y += paddleContactPoint * 0.1;
  }

  increaseSpeed(): void {
    const currentSpeed = Math.sqrt(
      this.velocity.x ** 2 + this.velocity.y ** 2,
    );
    if (currentSpeed < this.maxSpeed) {
      const speedIncrease = 0.5;
      const newSpeed = Math.min(currentSpeed + speedIncrease, this.maxSpeed);
      const ratio = newSpeed / currentSpeed;
      this.velocity.x *= ratio;
      this.velocity.y *= ratio;
    }
  }
}