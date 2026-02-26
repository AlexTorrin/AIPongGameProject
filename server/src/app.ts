import express, { Express } from 'express';
import cors from 'cors';
import { GameSessionService } from './services/GameSessionService';
import { createGameRoutes } from './routes/gameRoutes';
import { ErrorHandler } from './middleware/errorHandler';

/**
 * Express app configuration
 * SRP: Setup Express application
 */
export function createApp(): Express {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Services
  const gameSessionService = new GameSessionService();

  // Routes
  app.use('/api/games', createGameRoutes(gameSessionService));

  // Health check
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: Date.now() });
  });

  // Error handling
  app.use(ErrorHandler.handle.bind(ErrorHandler));

  return app;
}