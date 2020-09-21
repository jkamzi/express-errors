import HttpError from './errors/HttpError';
import type { ErrorType } from './types';

export default function isHttpError(err: ErrorType): err is HttpError {
  return (err as HttpError).isHttpError;
}
