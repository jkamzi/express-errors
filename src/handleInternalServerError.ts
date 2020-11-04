import { NextFunction, Request, Response } from 'express';
import { InternalServerError } from './errors';
import formatError from './formatError';
import type { Formatter } from './types';

export default function handleInternalServerError(formatter?: Formatter) {
  return (err: Error, req: Request, res: Response, next: NextFunction) => {
    const httpError = new InternalServerError(err.message);

    const response = formatError(httpError, formatter);

    return res.status(500).json(response);
  };
}
