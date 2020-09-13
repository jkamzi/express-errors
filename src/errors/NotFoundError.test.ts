import NotFoundError from './NotFoundError';
import HttpError from './HttpError';

describe('NotFoundError', () => {
  it('should have status, message and reason', () => {
    const err = new NotFoundError('My Reason');

    expect(err.status).toEqual(404);
    expect(err.message).toEqual('Not Found Error');
    expect(err.reason).toEqual('My Reason');
  });

  it('should use message as reason, when reason is undefined', () => {
    const err = new NotFoundError();

    expect(err.status).toEqual(404);
    expect(err.message).toEqual('Not Found Error');
    expect(err.reason).toEqual('Not Found Error');
  });

  it('should be instance of HttpError', () => {
    const instance = new NotFoundError();
    expect(instance).toBeInstanceOf(HttpError);
  });
});
