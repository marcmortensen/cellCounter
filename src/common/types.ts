
export interface IConfigurationApp {
    imageJ: {
      // Should the imageJ instance run in GUI mode
      headless: boolean,
      // Where is imageJ app located
      imageJDir: string
    };
  }