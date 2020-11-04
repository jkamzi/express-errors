import { NextFunction, Request, Response } from 'express';
import createErrorBody from './createErrorBody';
import { InternalServerError } from './errors';

export default function handleInternalServerError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const httpError = new InternalServerError(err.message);

  const response = createErrorBody(httpError);

  return res.status(500).json(response);
}
