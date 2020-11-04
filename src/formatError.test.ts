import { createErrorBody } from '.';
import { HttpError, InternalServerError } from './errors';
import formatError from './formatError';

describe('formatError', () => {
  it('uses createErrorBody when no formatter provided', () => {
    const err = new InternalServerError();
    const expected = createErrorBody(err);

    expect(formatError(err)).toEqual(expected);
  });

  it('uses provided formatter', () => {
    const err = new InternalServerError();
    const expected = createErrorBody(err);

    expect(
      formatError(err, (err: HttpError) => ({ err: 'Internal Server Error' })),
    ).toEqual({ err: 'Internal Server Error' });
  });
});
