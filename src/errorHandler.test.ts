import { Request, Response } from 'express';
import type { Logger } from './types';
import errorHandler from './errorHandler';
import HttpError from './errors/HttpError';

describe('errorHandler', () => {
  it('should call next() when error is not HttpError', () => {
    const next = jest.fn();
    const err = new Error('Error');

    errorHandler()(err, {} as Request, {} as Response, next);

    expect(next).toHaveBeenCalledWith(err);
  });

  it('should be possible to replace error output format', () => {
    const next = jest.fn();
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const err = new HttpError(400, 'Bad Request', 'Who knows');

    errorHandler({
      formatter: (err: HttpError) => ({
        error: {
          message: err.message,
          stack: err.stack,
        },
      }),
    })(err, {} as Request, res as Response, next);
    expect(res.json).toHaveBeenCalledWith({
      error: {
        message: err.message,
        stack: err.stack,
      },
    });
  });

  it('should return response when error is HttpError', () => {
    const next = jest.fn();
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const err = new HttpError(400, 'Bad Request', 'Who knows');

    errorHandler()(err, {} as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: {
        message: err.message,
        reason: err.reason,
        status: err.status,
      },
    });
    expect(next).not.toHaveBeenCalled();
  });

  /**
   * Not sure if this is the best way to test this.
   */
  describe('logger', () => {
    it('should accept async logger', () => {
      const next = jest.fn();
      const logger = jest.fn();
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const err = new HttpError(400, 'Bad Request', 'Who knows');
      const asyncLogger: Logger = async (err: HttpError): Promise<void> => {
        return new Promise((resolve) => {
          logger();
          return resolve();
        });
      };

      errorHandler({
        logger: asyncLogger,
      })(err, {} as Request, res as Response, next);

      expect(logger).toHaveBeenCalled();
    });

    it('should accept sync logger', () => {
      const next = jest.fn();
      const logger = jest.fn();
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const err = new HttpError(400, 'Bad Request', 'Who knows');
      const syncLogger: Logger = (err: HttpError): void => {
        logger();
      };

      errorHandler({
        logger: syncLogger,
      })(err, {} as Request, res as Response, next);

      expect(logger).toHaveBeenCalled();
    });
  });
});
