import { GameSessionService } from '../services/GameSessionService';

/**
 * Game session service tests
 * SRP: Test session management logic
 */
describe('GameSessionService', () => {
  let service: GameSessionService;

  beforeEach(() => {
    service = new GameSessionService();
  });

  describe('createSession', () => {
    it('should create a new session', () => {
      const playerId = '550e8400-e29b-41d4-a716-446655440000';
      const sessionId = service.createSession(playerId);

      expect(sessionId).toBeDefined();
      expect(typeof sessionId).toBe('string');

      const session = service.getSession(sessionId);
      expect(session).toBeDefined();
      expect(session?.playerId).toBe(playerId);
      expect(session?.isActive).toBe(true);
    });

    it('should set difficulty when provided', () => {
      const playerId = '550e8400-e29b-41d4-a716-446655440000';
      const sessionId = service.createSession(playerId, 'hard');

      const session = service.getSession(sessionId);
      expect(session?.difficulty).toBe('hard');
    });
  });

  describe('updateSession', () => {
    it('should update session data', () => {
      const playerId = '550e8400-e29b-41d4-a716-446655440000';
      const sessionId = service.createSession(playerId);

      service.updateSession(sessionId, { playerScore: 5, computerScore: 3 });

      const session = service.getSession(sessionId);
      expect(session?.playerScore).toBe(5);
      expect(session?.computerScore).toBe(3);
    });

    it('should throw when session not found', () => {
      expect(() => {
        service.updateSession('nonexistent', { playerScore: 5 });
      }).toThrow('Session nonexistent not found');
    });
  });

  describe('endSession', () => {
    it('should end session and create result', () => {
      const playerId = '550e8400-e29b-41d4-a716-446655440000';
      const sessionId = service.createSession(playerId);

      const result = service.endSession(sessionId, 11, 8);

      expect(result.winner).toBe('player');
      expect(result.playerScore).toBe(11);
      expect(result.computerScore).toBe(8);

      const session = service.getSession(sessionId);
      expect(session?.isActive).toBe(false);
    });
  });

  describe('getPlayerResults', () => {
    it('should return only player results', () => {
      const playerId1 = '550e8400-e29b-41d4-a716-446655440000';
      const playerId2 = '550e8400-e29b-41d4-a716-446655440001';

      const session1 = service.createSession(playerId1);
      const session2 = service.createSession(playerId2);

      service.endSession(session1, 11, 5);
      service.endSession(session2, 8, 11);

      const player1Results = service.getPlayerResults(playerId1);
      expect(player1Results).toHaveLength(1);
      expect(player1Results[0].winner).toBe('player');
    });
  });
});