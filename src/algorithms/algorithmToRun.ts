import { IConfigRun } from '../common/types';
import { loadImagesFromPath } from '../loaders/imageLoader/imageLoader';

export abstract class AlgorithmToRun {
    
    name: string;
    config: IConfigRun;
    
    constructor(name: string) {
        this.name = name;
    }

    hasValidInputConfig(): boolean {
        return (process.env.INPUT_IMAGE_FOLDER!= '' 
        && process.env.OUTPUT_FOLDER!= '');
    }

    loadConfig(): void {
      this.config = { 
        inputImagesPath: loadImagesFromPath(process.env.INPUT_IMAGE_FOLDER),
        outputPath: process.env.OUTPUT_FOLDER
      };
  }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    abstract start(imageJObject: any): void;
}