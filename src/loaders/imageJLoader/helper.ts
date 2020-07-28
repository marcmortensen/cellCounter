import { readdirSync, lstatSync } from 'fs';
import { join } from 'path';
import NodeJavaCore = require('java');

const addToClassPath = (dir: string) :void => {
    const files = readdirSync(dir)
    files.forEach(function (file) {
  
      const fullPath = join(dir, file)
      if (lstatSync(fullPath).isDirectory()){
        addToClassPath(fullPath)
      }
      if (fullPath.endsWith('.jar')){
        NodeJavaCore.classpath.push(fullPath)
      }
    })
  }

  export {addToClassPath};