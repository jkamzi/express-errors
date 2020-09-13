import HttpError from './HttpError';

export default class ForbiddenError extends HttpError {
  constructor(reason?: string) {
    super(403, 'Forbidden Error', reason);

    this.name = 'ForbiddenError';
  }
}
