
export interface IConfigurationApp {
    imageJ: {
      // Where is imageJ app located on your machine
      dir: string
      // What algorithm is gonna run on all the input files
      algorithmToRun: string
    }
  }

export abstract class AlgorithmToRun {
    name: string;
    
    constructor(name: string) {
        this.name = name;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    abstract start(any): void;
}