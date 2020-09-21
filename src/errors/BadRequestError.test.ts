import BadRequestError from './BadRequestError';
import HttpError from './HttpError';

describe('BadRequestError', () => {
  it('should have status, message and reason', () => {
    const err = new BadRequestError('My Reason');

    expect(err.status).toEqual(400);
    expect(err.message).toEqual('Bad Request Error');
    expect(err.reason).toEqual('My Reason');
  });

  it('should use message as reason, when reason is undefined', () => {
    const err = new BadRequestError();

    expect(err.status).toEqual(400);
    expect(err.message).toEqual('Bad Request Error');
    expect(err.reason).toEqual('Bad Request Error');
  });

  it('should be instance of HttpError', () => {
    const instance = new BadRequestError();
    expect(instance).toBeInstanceOf(HttpError);
  });
});
