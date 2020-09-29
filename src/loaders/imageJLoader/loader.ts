import { EventEmitter } from 'events';
import { addToClassPath } from './addToClassPath';
import { IConfigurationApp } from '../../common/types';
import NodeJavaCore = require('java');
import { IImageJLoader } from '../../common/imageJTypes';

class ImageJLoader {

  load = (
    config: IConfigurationApp,
    event: EventEmitter
    ): void => {

      addToClassPath(config.imageJ.dir);

      NodeJavaCore.asyncOptions = {
        asyncSuffix: 'Later',
        syncSuffix: '',
        promiseSuffix: 'Promise',
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        promisify: require('util').promisify
      }
      event.emit('booting')

      const System = NodeJavaCore.import('java.lang.System')
      System.setProperty('java.awt.headless', 'true')
      let ImageJObject: IImageJLoader;
      try {
        ImageJObject = NodeJavaCore.import('net.imagej.ImageJ');
      } catch (e) {
          console.error(e.message);
          throw new Error('IMAGEJ_DIRECTORY_INSTALLED path on config did not lead to a valid folder where imageJ is installed');
      }   
      event.emit('ready', ImageJObject(), NodeJavaCore)
  }
}

export {ImageJLoader};
