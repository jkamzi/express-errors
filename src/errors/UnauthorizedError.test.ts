import UnauthorizedError from './UnauthorizedError';
import HttpError from './HttpError';

describe('UnauthorizedError', () => {
  it('should have status, message and reason', () => {
    const err = new UnauthorizedError('My Reason');

    expect(err.status).toEqual(401);
    expect(err.message).toEqual('Unauthorized Error');
    expect(err.reason).toEqual('My Reason');
  });

  it('should use message as reason, when reason is undefined', () => {
    const err = new UnauthorizedError();

    expect(err.status).toEqual(401);
    expect(err.message).toEqual('Unauthorized Error');
    expect(err.reason).toEqual('Unauthorized Error');
  });

  it('should be instance of HttpError', () => {
    const instance = new UnauthorizedError();
    expect(instance).toBeInstanceOf(HttpError);
  });
});
