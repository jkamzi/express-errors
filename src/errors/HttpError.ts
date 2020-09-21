export default class HttpError extends Error {
  public status: number;

  public reason: string;

  /**
   * Temporary fix for:
   * https://github.com/jkamzi/express-errors/issues/1
   */
  public isHttpError = true;

  constructor(status: number, message: string, reason?: string) {
    super(message);
    this.status = status;
    this.reason = reason || message;

    this.name = 'HttpError';
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
