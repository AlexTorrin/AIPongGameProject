import { Game } from './game/Game';
import { DEFAULT_GAME_CONFIG } from './types/GameConfig';

/**
 * Application entry point
 */
function main(): void {
  const canvas = document.getElementById('pongCanvas') as HTMLCanvasElement;

  if (!canvas) {
    console.error('Canvas element not found');
    return;
  }

  // Initialize and start the game
  const game = new Game(canvas, DEFAULT_GAME_CONFIG);

  // Setup reset button
  const resetButton = document.getElementById('resetButton');
  if (resetButton) {
    resetButton.addEventListener('click', () => game.reset());
  }

  // Start the game
  game.start();
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}