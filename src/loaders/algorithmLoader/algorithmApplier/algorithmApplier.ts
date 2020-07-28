import { ImageJLoader } from '../../imageJLoader/loader';
import { EventEmitter } from 'events';
import { AlgorithmClassFetcher } from '../algorithmClassFetcher/algorithmClassFetcher';
import { AlgorithmToRun } from '../../../algorithms/algorithmToRun';
import { IConfigurationApp } from '../../../common/types';

class AlgorithmApplier {

  event: EventEmitter;
  algorithm: AlgorithmToRun;

  constructor(algorithmToRun: string) {

    this.event = new EventEmitter();
    this.algorithm = new AlgorithmClassFetcher(algorithmToRun, algorithmToRun) as AlgorithmToRun;
    
    if (!this.algorithm.hasValidInputConfig()){
      throw new Error(algorithmToRun + ': Has invalid configuration, please do follow the readme to see what params are expected.')
    }
    this.algorithm.loadConfig();

    this.event.on('booting', () => {
      console.log('==> Starting ImageJ');
    });
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.event.on('ready', async (ij : any) =>  {
  
      try {
        this.algorithm.start(ij);
      } catch (e) {
          console.error(e);
      }   
    });

  }

  runWithConfig(): void {

    const config: IConfigurationApp = { 
      imageJ:{
        dir: process.env.IMAGEJ_DIRECTORY_INSTALLED
      }
    };

    const imageJLoader = new ImageJLoader();
    imageJLoader.load(config, this.event);
  }

}

export {AlgorithmApplier};