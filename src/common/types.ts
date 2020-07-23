import { loadImagesFromPath } from '../imageLoader/imageLoader';

export interface IConfigurationApp {
    imageJ: {
      // Where is imageJ app located on your machine
      dir: string
      // What algorithm is gonna run on all the input files
      algorithmToRun: string
    }
  }

  export interface IConfigRun {
      inputImagesPath: Array<string>;
      outputPath: string;
  }

export abstract class AlgorithmToRun {
    
    name: string;
    config: IConfigRun;
    
    constructor(name: string) {
        this.name = name;
        this.config = { 
          inputImagesPath: loadImagesFromPath(process.env.INPUT_IMAGE_FOLDER),
          outputPath: process.env.OUTPUT_FOLDER ? process.env.OUTPUT_FOLDER : ''
        };
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    abstract start(any): void;
}