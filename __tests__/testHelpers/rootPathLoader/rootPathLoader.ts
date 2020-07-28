// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const rootPath = (): string =>  {
  return path.resolve(process.cwd());
};

export {rootPath}