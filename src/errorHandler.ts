import { Request, Response, ErrorRequestHandler } from 'express';
import HttpError from './errors/HttpError';
import { NextFunction } from 'connect';

type ErrorType = Error | HttpError;

export type Logger = (err: HttpError) => Promise<void> | void;

export type Options = Readonly<{
  logger?: undefined | Logger;
}>;

export type ErrorResponse = Readonly<{
  error: {
    message: string;
    reason: string;
    status: number;
  };
}>;

function isHttpError(err: ErrorType): err is HttpError {
  if (err instanceof HttpError) {
    return true;
  }

  return false;
}

export function errorBody(err: HttpError): ErrorResponse {
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
      return res.status(err.status).json(errorBody(err));
    }

    return next(err);
  };
}
