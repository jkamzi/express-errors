import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from './errors';
import formatError from './formatError';
import type { Formatter } from './types';

export default function handleNotFoundError(formatter?: Formatter) {
  return (req: Request, res: Response, next: NextFunction) => {
    const httpError = new NotFoundError('Not Found Error');

    const response = formatError(httpError, formatter);

    return res.status(404).json(response);
  };
}
