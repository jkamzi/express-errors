# express-errors

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

## Http Error Class

The [Http Error Class](https://github.com/jkamzi/express-errors/blob/master/src/errors/HttpError.ts) is the base class for all errors. This clas takes three paramter:

```js
new HttpError(HTTP_STATUS_CODE, ERROR_MESSAGE, REASON);
```

The third argument `REASON` is optional and can provide the user with more details.

## Handling third-party errors

## Formatting errors

## Not Found and catch all (Internal Server Error) handler

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
