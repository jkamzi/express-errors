import { Request, Response } from 'express';
import HttpError from './errors/HttpError';
import UnauthorizedError from './errors/UnauthorizedError';
import handleErrors, { HandleErrors } from './handleErrors';

function createMyError(reason: string): Error {
  const err = new Error(reason);
  err.name = 'MyError';

  return err;
}

describe('handleErrors', () => {
  const handle: HandleErrors = {
    SyntaxError: (err: Error) =>
      new HttpError(500, 'Internal Server Error', err.message),
    MyError: (err: Error) => new HttpError(400, 'MyError', err.message),
  };

  describe('transforming', () => {
    it('should transform NodeJS defined error', () => {
      const next = jest.fn();
      const err = new SyntaxError('foo');

      handleErrors(handle)(err, {} as Request, {} as Response, next);

      expect(next).toHaveBeenCalledWith(
        new HttpError(500, 'Internal Server Error', 'foo'),
      );
    });

    it('should transform user defined error', () => {
      const next = jest.fn();
      const err = createMyError('reason');

      handleErrors(handle)(err, {} as Request, {} as Response, next);

      expect(next).toHaveBeenCalledWith(
        new HttpError(400, 'MyError', 'reason'),
      );
    });
  });

  it('should do nothing with an unmapped error', () => {
    const next = jest.fn();
    const err = new Error();
    err.name = 'UnknownError';

    handleErrors(handle)(err, {} as Request, {} as Response, next);
    expect(next).toHaveBeenCalledWith(err);
  });

  it('should not handle `httpError`', () => {
    const next = jest.fn();
    const err = new UnauthorizedError();

    handleErrors(handle)(err, {} as Request, {} as Response, next);

    expect(next).toHaveBeenCalledWith(err);
  });
});
