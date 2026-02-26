import { InputHandler } from './InputHandler';
import { Paddle } from '../entities/Paddle';

/**
 * Composite input handler combining multiple input sources
 * SRP: Orchestrates multiple input handlers
 */
export class CompositeInputHandler extends InputHandler {
  private handlers: InputHandler[] = [];

  addHandler(handler: InputHandler): void {
    this.handlers.push(handler);
  }

  removeHandler(handler: InputHandler): void {
    this.handlers = this.handlers.filter((h) => h !== handler);
  }

  update(paddle: Paddle): void {
    this.handlers.forEach((handler) => handler.update(paddle));
  }
}