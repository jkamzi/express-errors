# express-errors

Makes error handling easy.

## Basic Example

```js
const express = require('express');
const { errorHandler, NotFoundError } = require('@jkamzi/express-errors');

const app = express();

app.get('/', (req, res, next) => {
  return next(new NotFoundError('I will never work!'));
});

app.use(errorHandler());

app.listen(3000);
```

Visiting http://localhost:3000:

```
curl http://localhost:3000/
{
  "error": {
    "message": "Not Found Error",
    "reason": "I will never work!",
    "status": 404
  }
}
```

## Handling third-party errors

Errors from third-party can be handled by using the `handleErrors()` function. For example [`passport`](https://github.com/jaredhanson/passport/blob/master/lib/errors/authenticationerror.js) authentication error can be handled the following way:

```js
const {
  errorHandler,
  handleErrors,
  UnauthorizedError,
  HttpError,
} = require('@jkamzi/express-errors');

app.use(
  handleErrors({
    AuthenticationError: (err: Error) => {
      // return new UnauthorizedError();
      return new HttpError(
        401,
        'Unauthorized Error',
        'Converted Passport Error',
      );
    },
  }),
);
app.use(errorHandler());
```

This would trigger the following error whenever passport throws authentication error:

```json
{
  "error": {
    "message": "Unauthorized Error",
    "reason": "Converted Passport Error",
    "status": 401
  }
}
```

## Not Found and catch all (Internal Server Error) handler

To handle `Not Found Errors` and to catch all unhandled errors the following handlers are available:

```js
const express = require('express');
const {
  errorHandler,
  handleInternalServerError,
  handleNotFoundError,
  NotFoundError,
} = require('@jkamzi/express-errors');

const app = express();

app.get('/', (req, res, next) => {
  return next(new NotFoundError('I will never work!'));
});

app.use(errorHandler());
app.use(handleInternalServerError(/** formatter */));
app.use(handleNotFoundError(/** formatter */));

app.listen(3000);
```

## Formatting errors

By default errors are returned like this:

```json
{
  "error": {
    "message": "ERROR MESSAGE",
    "reason": "PROVIDED REASON",
    "status": HTTP STATUS CODE
  }
}
```

This can be changed by provider a formatter.

The formatter should be the following signature:

```js
/**
 * @param error HttpError
 */
function formatter(error) {
  /** */
}
```

The formatter can be passed to `errorHandler`, `handleInternalServerError` and `handleNotFoundError`.

For example:

```js
const express = require('express');
const {
  errorHandler,
  handleInternalServerError,
  handleNotFoundError,
  NotFoundError,
} = require('@jkamzi/express-errors');

const app = express();

app.get('/', (req, res, next) => {
  return next(new NotFoundError('I will never work!'));
});

function myFormatter(error) {
  return {
    error: error.message,
  };
}

app.use(errorHandler({
  formatter: myFormatter,
}));
app.use(handleInternalServerError(myFormatter));
app.use(handleNotFoundError(myFormatter);

app.listen(3000);
```

Visiting http://localhost:3000:

```
curl http://localhost:3000/
{
  "error": 'Not Found Error'
}
```

## Available errors

Check `src/errors/index.ts`

| Error Status Code | Error Name          | Error Message         |
| ----------------- | ------------------- | --------------------- |
| 400               | BadRequestError     | Bad Request Error     |
| 401               | UnauthorizedError   | Unauthorized Error    |
| 403               | ForbiddenError      | Forbidden Error       |
| 404               | NotFoundError       | Not Found Error       |
| 500               | InternalServerError | Internal Server Error |

# Developing

```
git clone https://github.com/jkamzi/express-errors.git
cd express-errors
npm install
```

### Creating new error

```
node create-error.js [ERROR NAME] [HTTP STATUS CODE] [ERROR MESSAGE]
```

> Use "quotes" around the message if it is more than one word

Example: Creating `http not found error`:

```
node create-error.js NotFoundError 404 "Not Found Error"
```

# Test

```
npm test
```
