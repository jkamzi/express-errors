import { HttpError } from './errors';

import type { ErrorResponse } from './types';

export default function createErrorBody(err: HttpError): ErrorResponse {
  return {
    error: {
      message: err.message,
      reason: err.reason,
      status: err.status,
    },
  };
}
