import HttpError from './HttpError';

export default class InternalServerError extends HttpError {
  constructor(reason?: string) {
    super(500, 'Internal Server Error', reason);

    this.name = 'InternalServerError';
  }
}