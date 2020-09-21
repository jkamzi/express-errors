import HttpError from './HttpError';

export default class BadRequestError extends HttpError {
  constructor(reason?: string) {
    super(400, 'Bad Request Error', reason);

    this.name = 'BadRequestError';
  }
}