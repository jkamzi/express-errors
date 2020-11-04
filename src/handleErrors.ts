/**
 * Handles errors that is not `HttpError`
 */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import HttpError from './errors/HttpError';
import isHttpError from './isHttpError';
import type { ErrorType } from './types';

export type HandleErrors = {
  [key: string]: (err: Error) => HttpError;
};

/**
 * Handle unhandled errors such as SyntaxError or errors from
 * vendor packages.
 *
 * The error handler looks at the name of the error and attempt
 * to match it to a defined error.
 *
 * @param errors
 */
export default function handleErrors(
  errors: HandleErrors,
): ErrorRequestHandler {
  return (
    err: ErrorType,
    req: Request,
    res: Response,
    next: NextFunction,
  ): void => {
    if (isHttpError(err)) {
      return next(err);
    }

    /**
     * Check if the error should be transformed
     */
    if ('name' in err) {
      const known = Object.keys(errors);
      if (known.includes(err.name)) {
        const newErr = errors[err.name](err);
        return next(newErr);
      }
    }

    return next(err);
  };
}
