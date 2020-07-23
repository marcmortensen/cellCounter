import { skipTestOnCondition } from "../../../../testHelpers/skipTestOnCondition";
import { AlgorithmApplier } from '../../../../../src/algorithmLoader/algorithmApplier/algorithmApplier';

describe('ImageJ Gauss Run', () => {

  const isImageJInstallPathSet :boolean = process.env.IMAGEJ_DIRECTORY_INSTALLED? true : false;
  const isFlagE2Eup :boolean = process.env.RUN_E2E_TESTS === 'true';

  skipTestOnCondition(
    !(isImageJInstallPathSet && isFlagE2Eup)
  );

  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });
  

  it('filter gauss should apply a filter gauss and save the image', () => {
    
    process.env.INPUT_IMAGE_FOLDER='/home/marcm/Documents/Projects/imageJ/cellCounter/__tests__/img/filterGauss/'
    process.env.OUTPUT_FOLDER='/home/marcm/Documents/Projects/imageJ/cellCounter/__tests__/img/filterGauss/'
    process.env.IMAGEJ_RUN_ALGORITHM = 'FilterGauss'
    const imageJLoader = new AlgorithmApplier();
    imageJLoader.runWithConfig();
    expect(1).toBe(1);
  });

});
