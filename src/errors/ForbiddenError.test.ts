import ForbiddenError from './ForbiddenError';
import HttpError from './HttpError';

describe('ForbiddenError', () => {
  it('should have status, message and reason', () => {
    const err = new ForbiddenError('My Reason');

    expect(err.status).toEqual(403);
    expect(err.message).toEqual('Forbidden Error');
    expect(err.reason).toEqual('My Reason');
  });

  it('should use message as reason, when reason is undefined', () => {
    const err = new ForbiddenError();

    expect(err.status).toEqual(403);
    expect(err.message).toEqual('Forbidden Error');
    expect(err.reason).toEqual('Forbidden Error');
  });

  it('should be instance of HttpError', () => {
    const instance = new ForbiddenError();
    expect(instance).toBeInstanceOf(HttpError);
  });
});
