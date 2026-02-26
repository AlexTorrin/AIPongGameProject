import { Router, Request, Response, NextFunction } from 'express';
import { GameSessionService } from '../services/GameSessionService';
import { validateRequest, StartGameRequestSchema, UpdateGameStateRequestSchema, EndGameRequestSchema } from '../validators/requestValidator';
import { ApiResponse } from '@pong/shared';

/**
 * Game routes
 * SRP: Handle game-related endpoints
 */
export function createGameRoutes(sessionService: GameSessionService): Router {
  const router = Router();

  // Start a new game
  router.post('/start', (req: Request, res: Response, _next: NextFunction) => {
    try {
      const validatedRequest = validateRequest(StartGameRequestSchema, req.body);
      const sessionId = sessionService.createSession(
        validatedRequest.playerId,
        validatedRequest.difficulty,
      );

      const response: ApiResponse = {
        success: true,
        data: { sessionId },
        timestamp: Date.now(),
      };

      res.json(response);
    } catch (error) {
      _next(error);
    }
  });

  // Get game state
  router.get('/:sessionId/state', (req: Request, res: Response, _next: NextFunction) => {
    try {
      const { sessionId } = req.params;
      const session = sessionService.getSession(sessionId);

      if (!session) {
        throw new Error('Session not found');
      }

      const response: ApiResponse = {
        success: true,
        data: session,
        timestamp: Date.now(),
      };

      res.json(response);
    } catch (error) {
      _next(error);
    }
  });

  // Update game state
  router.post('/:sessionId/update', (req: Request, res: Response, _next: NextFunction) => {
    try {
      const validatedRequest = validateRequest(UpdateGameStateRequestSchema, {
        sessionId: req.params.sessionId,
        ...req.body,
      });

      const session = sessionService.getSession(validatedRequest.sessionId);
      if (!session) {
        throw new Error('Session not found');
      }

      sessionService.updateSession(validatedRequest.sessionId, {
        lastUpdateTime: validatedRequest.timestamp,
      });

      const response: ApiResponse = {
        success: true,
        data: { updated: true },
        timestamp: Date.now(),
      };

      res.json(response);
    } catch (error) {
      _next(error);
    }
  });

  // End game
  router.post('/:sessionId/end', (req: Request, res: Response, _next: NextFunction) => {
    try {
      const validatedRequest = validateRequest(EndGameRequestSchema, {
        sessionId: req.params.sessionId,
        ...req.body,
      });

      const result = sessionService.endSession(
        validatedRequest.sessionId,
        validatedRequest.finalScore.player,
        validatedRequest.finalScore.computer,
      );

      const response: ApiResponse = {
        success: true,
        data: { gameSession: result },
        timestamp: Date.now(),
      };

      res.json(response);
    } catch (error) {
      _next(error);
    }
  });

  return router;
}