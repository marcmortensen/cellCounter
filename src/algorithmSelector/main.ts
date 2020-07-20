import {IConfigurationApp} from '../common/types';
import {ImageJLoader} from '../imageJLoader/loader';
import {EventEmitter} from 'events';

class AlgorithmSelector {

  event: EventEmitter;

  constructor() {
    this.event = new EventEmitter();
    this.event.on('booting', () => {
      console.log('==> Starting ImageJ');
    });
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.event.on('ready', async (ij : any) =>  {
  
      try {
          const code = await import('../../src/' + process.env.IMAGEJ_RUN_ALGORITHM + '/main');
          code.start(ij);
      } catch (e) {
          console.error(e);
      }   
    });

  }

  runWithConfig(): void {

    const config: IConfigurationApp = { 
      imageJ:{
        dir: process.env.IMAGEJ_DIRECTORY_INSTALLED,
        algorithmToRun: process.env.IMAGEJ_RUN_ALGORITHM
      }
    };
  
    const imageJLoader = new ImageJLoader();
    imageJLoader.load(config, this.event);
  }

}

export {AlgorithmSelector};