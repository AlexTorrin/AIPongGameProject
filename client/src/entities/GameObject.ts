import { Vector2D } from '@pong/shared';

export abstract class GameObject {
  protected position: Vector2D;
  protected velocity: Vector2D;

  constructor(position: Vector2D, velocity: Vector2D = { x: 0, y: 0 }) {
    this.position = { ...position };
    this.velocity = { ...velocity };
  }

  abstract update(): void;
  abstract draw(ctx: CanvasRenderingContext2D): void;

  getPosition(): Vector2D {
    return { ...this.position };
  }

  setPosition(position: Vector2D): void {
    this.position = { ...position };
  }

  getVelocity(): Vector2D {
    return { ...this.velocity };
  }

  setVelocity(velocity: Vector2D): void {
    this.velocity = { ...velocity };
  }
}