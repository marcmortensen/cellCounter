import { ImageJLoader } from '../../imageJLoader/loader';
import { EventEmitter } from 'events';
import { AlgorithmClassFetcher } from '../algorithmClassFetcher/algorithmClassFetcher';
import { AlgorithmToRun } from '../../../algorithms/algorithmToRun';
import { IConfigurationApp } from '../../../common/types';
import { IImageJ } from '../../../common/imageJTypes';
import { NodeAPI } from 'java';

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
  
    this.event.on('ready', async (ij : IImageJ, nodeJavaCore: NodeAPI ) =>  {
  
      try {
        this.algorithm.start(ij, nodeJavaCore);
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