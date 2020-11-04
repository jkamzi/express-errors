/**
 * Generates a list of built-in errors that can be copy pasted into the README file
 */
const fs = require('fs');
const path = require('path');

const exclude = ['index.ts', 'HttpError.ts'];

function getErrorInformation(filePath) {
  const fileContent = fs.readFileSync(
    path.join(__dirname, 'src', 'errors', filePath),
  );

  const re = /super\((\d+).*'(.*?)'/gim;
  const [, status, message] = re.exec(fileContent) || 0;

  const [name] = filePath.split('.');

  return {
    status: Number.parseInt(status, 10),
    name,
    message,
    file: filePath,
  };
}

const content = fs
  .readdirSync(path.join(__dirname, 'src', 'errors'))
  .filter((file) => {
    /**
     * Filter out tests and `index.ts`
     */
    return !file.endsWith('.test.ts') && !exclude.includes(file);
  })
  .map(getErrorInformation)
  .sort((a, b) => a.status - b.status);

console.log('|Error Status Code|Error Name|Error Message|');
console.log('|-|-|-|');
content.forEach((error) => {
  console.log(`|${error.status}|${error.name}|${error.message}|`);
});
