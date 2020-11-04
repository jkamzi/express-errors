import { Request, Response } from 'express';
import handleInternalServerError from './handleInternalServerError';

describe('handleInternalServerError', () => {
  it('should respond with 500 error', () => {
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    handleInternalServerError(
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
