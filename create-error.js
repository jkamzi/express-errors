const fs = require('fs');
const path = require('path');
/**
 * usage:
 *  node create-error.js [Name] [Code] [Reason?]
 *
 *  node create-error.js InternalServerError 500
 */

/**
 *
 */
const DIRECTORY = path.join(__dirname, 'src', 'errors');
const [, , name, status, ...rest] = process.argv;
const message = rest.join(' ');

const testTemplate = `import {NAME} from './{NAME}';
import HttpError from './HttpError';

describe('{NAME}', () => {
  it('should have status, message and reason', () => {
    const err = new {NAME}('My Reason');

    expect(err.status).toEqual({STATUS});
    expect(err.message).toEqual('{MESSAGE}');
    expect(err.reason).toEqual('My Reason');
  });

  it('should use message as reason, when reason is undefined', () => {
    const err = new {NAME}();

    expect(err.status).toEqual({STATUS});
    expect(err.message).toEqual('{MESSAGE}');
    expect(err.reason).toEqual('{MESSAGE}');
  });

  it('should be instance of HttpError', () => {
    const instance = new {NAME}();
    expect(instance).toBeInstanceOf(HttpError);
  });
});
`;

const errorTemplate = `/**
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/{STATUS}
 */
import HttpError from './HttpError';

export default class {NAME} extends HttpError {
  constructor(reason?: string) {
    super({STATUS}, '{MESSAGE}', reason);

    this.name = '{NAME}';
  }
}`;

function replaceAll(str, name, status, message) {
  return str
    .replace(/\{NAME\}/g, name)
    .replace(/\{STATUS\}/g, status)
    .replace(/\{MESSAGE\}/g, message);
}

/**
 * Check if this error exists, if it does cancel
 */
function createPath(filename) {
  return path.join(DIRECTORY, filename);
}

const errorFileOutput = createPath(`${name}.ts`);
const errorTestFileOuptut = createPath(`${name}.test.ts`);

if (fs.existsSync(errorFileOutput) || fs.existsSync(errorTestFileOuptut)) {
  throw new Error(`Error ${name} exists.`);
}

const parsedErrorTemplate = replaceAll(errorTemplate, name, status, message);
const parsedTestTemplate = replaceAll(testTemplate, name, status, message);
fs.writeFileSync(errorFileOutput, parsedErrorTemplate, {
  encoding: 'utf-8',
});
fs.writeFileSync(errorTestFileOuptut, parsedTestTemplate, {
  encoding: 'utf-8',
});

console.log(`Created error: ${name} :: ${status} :: ${message}`);

/**
 * Update src/errors/index.ts to export the new error.  This is annoying.
 */
const exportStatements = [];
const importStatements = [];
fs.readdirSync(DIRECTORY).filter(name => {
  return /Error\.ts/.test(name);
}).sort((a, b) => a > b).map(file => {
  const name = file.split('.')[0];

  importStatements.push(`import ${name} from './${name}';`);
  exportStatements.push(`  ${name},`);
});

const indexTemplate = `{IMPORT}

export {
{EXPORT}
};`.replace('{IMPORT}', importStatements.join('\n')).replace('{EXPORT}', exportStatements.join('\n'));

fs.writeFileSync(path.join(DIRECTORY, 'index.ts'), indexTemplate);
