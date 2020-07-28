import { EventEmitter } from 'events';
import { addToClassPath } from './helper';
import { IConfigurationApp } from '../../common/types';
import NodeJavaCore = require('java');

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
        promisify: require('when/node').lift
      }
      event.emit('booting')

      const System = NodeJavaCore.import('java.lang.System')
      System.setProperty('java.awt.headless', 'true')
      let ImageJObject;
      try {
        ImageJObject = NodeJavaCore.import('net.imagej.ImageJ');
      } catch (e) {
        
          // eslint-disable-next-line no-debugger
          debugger;
          console.error(e.message);
          throw new Error('IMAGEJ_DIRECTORY_INSTALLED path on config did not lead to a valid folder where imageJ is installed');
      }   
      event.emit('ready', ImageJObject())
  }
}

export {ImageJLoader};