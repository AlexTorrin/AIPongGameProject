import { GameStore } from '../store/GameStore';
import { GameState, GameConfig } from '@pong/shared';

/**
 * Game store tests
 * SRP: Test state management
 */
describe('GameStore', () => {
  let store: GameStore;
  let initialState: GameState;
  let config: GameConfig;

  beforeEach(() => {
    initialState = {
      playerScore: 0,
      computerScore: 0,
      gameRunning: true,
      gameOver: false,
      winner: null,
      timestamp: Date.now(),
    };

    config = {
      canvasWidth: 800,
      canvasHeight: 400,
      paddleWidth: 10,
      paddleHeight: 80,
      ballRadius: 6,
      ballInitialSpeed: 5,
      ballMaxSpeed: 8,
      paddleSpeed: 6,
      computerSpeed: 5,
      winScore: 11,
    };

    store = new GameStore(initialState, config);
  });

  describe('getState', () => {
    it('should return current game state', () => {
      const state = store.getState();
      expect(state.playerScore).toBe(0);
      expect(state.computerScore).toBe(0);
    });
  });

  describe('setState', () => {
    it('should update game state', () => {
      store.setState({ gameRunning: false });
      const state = store.getState();
      expect(state.gameRunning).toBe(false);
    });
  });

  describe('updateScore', () => {
    it('should increment player score', () => {
      store.updateScore('player');
      const state = store.getState();
      expect(state.playerScore).toBe(1);
    });

    it('should increment computer score', () => {
      store.updateScore('computer');
      const state = store.getState();
      expect(state.computerScore).toBe(1);
    });
  });

  describe('resetGame', () => {
    it('should reset all game state', () => {
      store.setState({
        playerScore: 5,
        computerScore: 3,
        gameRunning: false,
        gameOver: true,
        winner: 'player',
      });

      store.resetGame();
      const state = store.getState();

      expect(state.playerScore).toBe(0);
      expect(state.computerScore).toBe(0);
      expect(state.gameRunning).toBe(true);
      expect(state.gameOver).toBe(false);
      expect(state.winner).toBe(null);
    });
  });

  describe('subscribe', () => {
    it('should notify observers on state change', () => {
      const observer = { onStateChanged: jest.fn() };
      store.subscribe(observer);

      store.updateScore('player');

      expect(observer.onStateChanged).toHaveBeenCalled();
    });

    it('should allow unsubscribing', () => {
      const observer = { onStateChanged: jest.fn() };
      const unsubscribe = store.subscribe(observer);

      unsubscribe();
      store.updateScore('player');

      expect(observer.onStateChanged).not.toHaveBeenCalled();
    });
  });
});