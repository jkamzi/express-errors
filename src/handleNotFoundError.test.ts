import { Request, Response } from 'express';
import handleNotFoundError from './handleNotFoundError';

describe('handleNotFoundError', () => {
  it('should respond with 404 error', () => {
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    handleNotFoundError({} as Request, res as Response, jest.fn());

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
