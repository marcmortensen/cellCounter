
export interface IConfigurationApp {
    imageJ: {
      // Where is imageJ app located on your machine
      dir: string
      // What algorithm is gonna run on all the input files
      algorithmToRun: string
    }
  }