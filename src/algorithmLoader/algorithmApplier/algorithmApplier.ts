import {IConfigurationApp, AlgorithmToRun} from '../../common/types';
import {ImageJLoader} from '../../imageJLoader/loader';
import {EventEmitter} from 'events';
import { AlgorithmClassFetcher } from '../algorithmClassFetcher/algorithmClassFetcher';

class AlgorithmApplier {

  event: EventEmitter;

  constructor() {
    this.event = new EventEmitter();
    this.event.on('booting', () => {
      console.log('==> Starting ImageJ');
    });
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.event.on('ready', async (ij : any, algorithmToRun: string) =>  {
  
      try {
          const code = new AlgorithmClassFetcher(algorithmToRun, algorithmToRun) as AlgorithmToRun;
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

export {AlgorithmApplier};