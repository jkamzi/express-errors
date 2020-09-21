import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import HttpError from './errors/HttpError';
import isHttpError from './isHttpError';

import type { Options, ErrorResponse } from './types';

export function createErrorBody(err: HttpError): ErrorResponse {
  return {
    error: {
      message: err.message,
      reason: err.reason,
      status: err.status,
    },
  };
}

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

      const response = defaultOptions.formatter
        ? defaultOptions.formatter(err)
        : createErrorBody(err);

      return res.status(err.status).json(response);
    }

    return next(err);
  };
}
