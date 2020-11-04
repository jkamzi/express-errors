import { NextFunction, Request, Response } from 'express';
import createErrorBody from './createErrorBody';
import { NotFoundError } from './errors';

export default function handleNotFoundError(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const httpError = new NotFoundError('Not Found Error');

  const response = createErrorBody(httpError);

  return res.status(404).json(response);
}
