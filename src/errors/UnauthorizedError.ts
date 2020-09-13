import HttpError from './HttpError';

export default class UnauthorizedError extends HttpError {
  constructor(reason?: string) {
    super(401, 'Unauthorized Error', reason);

    this.name = 'UnauthorizedError';
  }
}
