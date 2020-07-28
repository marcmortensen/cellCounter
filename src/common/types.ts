export interface IConfigurationApp {
    imageJ: {
      // Where is imageJ app located on the user machine
      dir: string
    }
  }

export interface IConfigRun {
    inputImagesPath: Array<string>;
    outputPath: string;
}