export default class HttpError extends Error {
  public status: number;

  public reason: string;

  constructor(status: number, message: string, reason?: string) {
    super(message);
    this.status = status;
    this.reason = reason || message;

    this.name = 'HttpError';
  }
}
