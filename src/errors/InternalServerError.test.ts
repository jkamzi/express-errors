import InternalServerError from './InternalServerError';
import HttpError from './HttpError';

describe('InternalServerError', () => {
  it('should have status, message and reason', () => {
    const err = new InternalServerError('My Reason');

    expect(err.status).toEqual(500);
    expect(err.message).toEqual('Internal Server Error');
    expect(err.reason).toEqual('My Reason');
  });

  it('should use message as reason, when reason is undefined', () => {
    const err = new InternalServerError();

    expect(err.status).toEqual(500);
    expect(err.message).toEqual('Internal Server Error');
    expect(err.reason).toEqual('Internal Server Error');
  });

  it('should be instance of HttpError', () => {
    const instance = new InternalServerError();
    expect(instance).toBeInstanceOf(HttpError);
  });
});
