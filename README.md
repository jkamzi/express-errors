# express-errors

## Usage

```js
import express from 'express';
import { errorHandler, NotFoundError } from '@jkamzi/express-error';

const app = express();

app.get('/', (req, res, next) => {
  return next(new NotFoundError('I will never work!'));
});

app.use(errorHandler());

app.listen(3000);
```

Visiting `http://localhost:3000`:

```bash
curl -O http://localhost:3000/
{
  "error": {
    "message": "Not Found Error",
    "reason": "I will never work!",
    "status": 404
  }
}
```

## Convert errors to HttpError

It is possible to take an error (Must have `err.name` set) and change it into a `HttpError`:

> Important: Internally a function called `isHttpError` is used to detect `HttpError` type. It does this by checking for `err.reason`. Thus, if the error to be converted contains that key it will be considered a `HttpError` and the error will not be converted.

```js
import express from 'express';
import { errorHandler, NotFoundError } from '@jkamzi/express-error';

const app = express();

app.get('/', (req, res, next) => {
  const err = new Error('Could not find that user');
  err.name = 'EntityNotFound';

  return next(err);
});

app.use(handleErrors({
  EntityNotFound: (err: Error) => {
    return new NotFoundError(err.message);
  },
));
app.use(errorHandler());

app.listen(3000);
```

Visiting `http://localhost:3000`:

```bash
curl -O http://localhost:3000/
{
  "error": {
    "message": "Not Found Error",
    "reason": "Could not find that user",
    "status": 404
  }
}
```

## Available errors

Check `src/errors/index.ts`

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
