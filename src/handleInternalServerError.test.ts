import { Request, Response } from 'express';
import { HttpError } from './errors';
import handleInternalServerError from './handleInternalServerError';

describe('handleInternalServerError', () => {
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
    handleInternalServerError((e: HttpError) => ({
      error: 'Internal Server Error',
    }))(
      new Error('Internal Server Error'),
      {} as Request,
      res as Response,
      jest.fn(),
    );

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });

  it('should respond with 500 error', () => {
    handleInternalServerError()(
      new Error('Internal Server Error'),
      {} as Request,
      res as Response,
      jest.fn(),
    );

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: {
        message: 'Internal Server Error',
        reason: 'Internal Server Error',
        status: 500,
      },
    });
  });
});
