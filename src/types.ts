import HttpError from './errors/HttpError';

export type ErrorType = Error | HttpError;

export type Logger = (err: HttpError) => Promise<void> | void;

export type Options = Readonly<{
  logger?: Logger;
}>;

export type ErrorResponse = Readonly<{
  error: {
    message: string;
    reason: string;
    status: number;
  };
}>;
