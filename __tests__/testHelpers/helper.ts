import { readdir, unlink } from 'fs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

const removeDirContents = (directory: string): void => {
    if (directory.includes('__tests__')) {
    readdir(directory, (err, files) => {
      if (err) throw err;
    
      for (const file of files) {
        unlink(path.join(directory, file), err => {
          if (err) throw err;
        });
      }
    });
  }
}

export {removeDirContents};

