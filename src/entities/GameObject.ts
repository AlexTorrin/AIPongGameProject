import { Vector2D } from '../types/Vector2D';

/**
 * Abstract base class for all game objects
 * LSP: All subclasses can be substituted for this base class
 */
export abstract class GameObject {
  protected position: Vector2D;
  protected velocity: Vector2D;

  constructor(position: Vector2D, velocity: Vector2D = new Vector2D()) {
    this.position = position.clone();
    this.velocity = velocity.clone();
  }

  abstract update(): void;
  abstract draw(ctx: CanvasRenderingContext2D): void;

  getPosition(): Vector2D {
    return this.position.clone();
  }

  setPosition(position: Vector2D): void {
    this.position = position.clone();
  }

  getVelocity(): Vector2D {
    return this.velocity.clone();
  }

  setVelocity(velocity: Vector2D): void {
    this.velocity = velocity.clone();
  }
}