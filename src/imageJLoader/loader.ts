import {EventEmitter} from 'events';
import {IConfigurationApp} from '../common/types';
import NodeJavaCore = require('java');
import {addToClassPath} from './helper';

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
      
      const ImageJObject = NodeJavaCore.import('net.imagej.ImageJ')
      event.emit('ready', ImageJObject(), config.imageJ.algorithmToRun)
  }
}

export {ImageJLoader};