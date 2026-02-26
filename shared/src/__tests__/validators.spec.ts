import {
  GameConfigSchema,
  GameStateSchema,
  GameSnapshotSchema,
  BallStateSchema,
  PaddleStateSchema,
} from '../validators/gameValidator';

/**
 * Validator tests
 * SRP: Test validation logic
 */
describe('Game Validators', () => {
  describe('GameConfigSchema', () => {
    it('should validate correct game config', () => {
      const validConfig = {
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

      const result = GameConfigSchema.safeParse(validConfig);
      expect(result.success).toBe(true);
    });

    it('should reject config with negative values', () => {
      const invalidConfig = {
        canvasWidth: -800,
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

      const result = GameConfigSchema.safeParse(invalidConfig);
      expect(result.success).toBe(false);
    });
  });

  describe('GameStateSchema', () => {
    it('should validate correct game state', () => {
      const validState = {
        playerScore: 5,
        computerScore: 3,
        gameRunning: true,
        gameOver: false,
        winner: null,
        timestamp: Date.now(),
      };

      const result = GameStateSchema.safeParse(validState);
      expect(result.success).toBe(true);
    });

    it('should reject negative scores', () => {
      const invalidState = {
        playerScore: -5,
        computerScore: 3,
        gameRunning: true,
        gameOver: false,
        winner: null,
        timestamp: Date.now(),
      };

      const result = GameStateSchema.safeParse(invalidState);
      expect(result.success).toBe(false);
    });
  });

  describe('BallStateSchema', () => {
    it('should validate correct ball state', () => {
      const validBall = {
        x: 400,
        y: 200,
        velocityX: 5,
        velocityY: 3,
        radius: 6,
      };

      const result = BallStateSchema.safeParse(validBall);
      expect(result.success).toBe(true);
    });

    it('should reject zero radius', () => {
      const invalidBall = {
        x: 400,
        y: 200,
        velocityX: 5,
        velocityY: 3,
        radius: 0,
      };

      const result = BallStateSchema.safeParse(invalidBall);
      expect(result.success).toBe(false);
    });
  });

  describe('PaddleStateSchema', () => {
    it('should validate correct paddle state', () => {
      const validPaddle = {
        x: 10,
        y: 160,
        width: 10,
        height: 80,
      };

      const result = PaddleStateSchema.safeParse(validPaddle);
      expect(result.success).toBe(true);
    });
  });

  describe('GameSnapshotSchema', () => {
    it('should validate complete game snapshot', () => {
      const validSnapshot = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        gameState: {
          playerScore: 5,
          computerScore: 3,
          gameRunning: true,
          gameOver: false,
          winner: null,
          timestamp: Date.now(),
        },
        playerPaddle: {
          x: 10,
          y: 160,
          width: 10,
          height: 80,
        },
        computerPaddle: {
          x: 780,
          y: 160,
          width: 10,
          height: 80,
        },
        ball: {
          x: 400,
          y: 200,
          velocityX: 5,
          velocityY: 3,
          radius: 6,
        },
        timestamp: Date.now(),
      };

      const result = GameSnapshotSchema.safeParse(validSnapshot);
      expect(result.success).toBe(true);
    });
  });
});