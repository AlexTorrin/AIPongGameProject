import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@pong/shared';

/**
 * Error handling middleware
 * SRP: Handle errors consistently
 */
export class ErrorHandler {
  static handle(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
    console.error('Error:', err);

    let statusCode = 500;
    let message = 'Internal Server Error';
    let details: Record<string, unknown> | undefined;

    if (err instanceof Error) {
      message = err.message;

      // Handle validation errors
      if (message.startsWith('Validation error:')) {
        statusCode = 400;
      }
      // Handle not found errors
      else if (message.includes('not found')) {
        statusCode = 404;
      }
      // Handle unauthorized errors
      else if (message.includes('unauthorized')) {
        statusCode = 401;
      }
    }

    const response: { success: boolean; error: ApiError } = {
      success: false,
      error: {
        code: `ERROR_${statusCode}`,
        message,
        details,
        timestamp: Date.now(),
      },
    };

    res.status(statusCode).json(response);
  }
}