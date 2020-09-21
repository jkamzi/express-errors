import * as errors from './errors';
import isHttpError from './isHttpError';

/**
 * Very ugly, but it works.
 */
describe('isHttpError', () => {
  it("HttpError should be 'HttpError'", () => {
    expect(isHttpError(new errors.HttpError(400, 'Bad Request'))).toEqual(true);
  });

  const keys = Object.keys(errors);
  for (let i = 0; i < keys.length; i += 1) {
    const Ctor = errors[keys[i]];
    if (Ctor.name === 'HttpError') {
      continue;
    }

    it(`${Ctor.name} should be 'HttpError'`, () => {
      const instance = new Ctor();
      expect(isHttpError(instance)).toEqual(true);
    });
  }
});
