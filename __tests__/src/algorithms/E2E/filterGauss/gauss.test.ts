import { skipTestOnCondition } from '../../../../testHelpers/skipTestOnCondition';
import { AlgorithmApplier } from '../../../../../src/loaders/algorithmLoader/algorithmApplier/algorithmApplier';
//import { removeDirContents } from '../../../../testHelpers/helper';
import { existsSync } from 'fs';

describe('ImageJ Gauss Run', () => {

  const outputFolder = '/home/marcm/Documents/Projects/imageJ/cellCounter/__tests__/img/filterGauss/output/';
  const isImageJInstallPathSet :boolean = process.env.IMAGEJ_DIRECTORY_INSTALLED? true : false;
  const isFlagE2Eup :boolean = process.env.RUN_E2E_TESTS === 'true';

  skipTestOnCondition(
    !(isImageJInstallPathSet && isFlagE2Eup)
  );

  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.clearAllMocks()
    process.env = { ...OLD_ENV };
  });

  /*afterEach(()=> {
    removeDirContents(outputFolder);
  });
  */

  afterAll(() => {
    process.env = OLD_ENV;
  });
  

  it('filter gauss should apply a filter gauss and save the image', () => {
    
    process.env.INPUT_IMAGE_FOLDER='/home/marcm/Documents/Projects/imageJ/cellCounter/__tests__/img/filterGauss/input/'
    process.env.OUTPUT_FOLDER='/home/marcm/Documents/Projects/imageJ/cellCounter/__tests__/img/filterGauss/output/'

    expect(existsSync(outputFolder + 'blurry.png')).toBeFalsy();
    const imageJLoader = new AlgorithmApplier('FilterGauss');
    imageJLoader.runWithConfig();
    expect(existsSync(outputFolder + 'blurry.png')).toBeTruthy();

  });

});
