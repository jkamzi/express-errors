import HttpError from './HttpError';

describe('HttpError', () => {
  it('should have status, message and reason', () => {
    const err = new HttpError(401, 'Unauthorized Error', 'My Reason');

    expect(err.status).toEqual(401);
    expect(err.message).toEqual('Unauthorized Error');
    expect(err.reason).toEqual('My Reason');
  });

  it('should use message as reason, when reason is undefined', () => {
    const err = new HttpError(401, 'Unauthorized Error');

    expect(err.status).toEqual(401);
    expect(err.message).toEqual('Unauthorized Error');
    expect(err.reason).toEqual('Unauthorized Error');
  });

  it('should be instance of HttpError', () => {
    const instance = new HttpError(401, 'Unauthorized Error', 'My Reason');
    expect(instance).toBeInstanceOf(HttpError);
  });
});
