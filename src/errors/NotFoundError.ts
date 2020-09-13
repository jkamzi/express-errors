import HttpError from './HttpError';

export default class NotFoundError extends HttpError {
  constructor(reason?: string) {
    super(404, 'Not Found Error', reason);

    this.name = 'NotFoundError';
  }
}
