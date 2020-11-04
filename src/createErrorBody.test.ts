import createErrorBody from './createErrorBody';
import { HttpError } from './errors';

describe('createErrorBody', () => {
  it('createErrorBody() returns error object', () => {
    expect(
      createErrorBody(new HttpError(400, 'Bad Request', 'Who knows')),
    ).toMatchSnapshot();
  });
});
