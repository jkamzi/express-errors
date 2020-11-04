import { Request, Response } from 'express';
import { HttpError } from './errors';
import handleNotFoundError from './handleNotFoundError';

describe('handleNotFoundError', () => {
  let res: Partial<Response>;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    res = null;
  });

  it('should format error', () => {
    handleNotFoundError((e: HttpError) => ({ error: 'Not Found' }))(
      {} as Request,
      res as Response,
      jest.fn(),
    );

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Not Found' });
  });

  it('should respond with 404 error', () => {
    handleNotFoundError()({} as Request, res as Response, jest.fn());

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: {
        message: 'Not Found Error',
        reason: 'Not Found Error',
        status: 404,
      },
    });
  });
});
