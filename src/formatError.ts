import { createErrorBody } from '.';
import { HttpError } from './errors';
import type { Formatter } from './types';

export default function formatError<T>(err: HttpError, formatter?: Formatter) {
  const body = formatter ? formatter(err) : createErrorBody(err);

  return body;
}
