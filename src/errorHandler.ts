import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import HttpError from './errors/HttpError';
import isHttpError from './isHttpError';
import type { Options } from './types';
import formatError from './formatError';

export default function errorHandler(options?: Options): ErrorRequestHandler {
  const defaultOptions: Options = {
    logger: undefined,
    ...options,
  };
  return async (
    err: Error | HttpError,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    if (isHttpError(err)) {
      if (defaultOptions.logger) {
        await defaultOptions.logger(err);
      }

      const response = formatError(err, defaultOptions.formatter);

      return res.status(err.status).json(response);
    }

    return next(err);
  };
}
