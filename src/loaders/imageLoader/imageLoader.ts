import { readdirSync, lstatSync } from 'fs';
import { join } from 'path';

const loadImagesFromPath = (dir: string): Array<string>  => {
    let images: Array<string> = [];
    const files = readdirSync(dir)
    files.forEach(function (file) {
  
      const fullPath = join(dir, file)
      if (lstatSync(fullPath).isDirectory()){
        images = images.concat(loadImagesFromPath(fullPath));
      }
      if ( /\.(jpe?g|png|tif|bmp)$/i.test(fullPath) ) {
        images.push(fullPath)
      }
    })
    return images;
  }

  export {loadImagesFromPath};