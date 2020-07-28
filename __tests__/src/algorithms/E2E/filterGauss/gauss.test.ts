import { skipTestOnCondition } from '../../../../testHelpers/skipTestOnCondition';
import { AlgorithmApplier } from '../../../../../src/loaders/algorithmLoader/algorithmApplier/algorithmApplier';
import { removeDirContents } from '../../../../testHelpers/removeDirContents';
import { existsSync } from 'fs';
import { rootPath as path } from '../../../../testHelpers/rootPathLoader/rootPathLoader';

const rootPath = path();
describe('ImageJ Filter Gauss Run', () => {

  const outputFolder = rootPath + '/__tests__/img/filterGauss/output/';
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

  afterEach(() => {
    removeDirContents(outputFolder);
  })
  
  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('Filter gauss should apply a filter gauss and an image', () => {
    
    process.env.INPUT_IMAGE_FOLDER = rootPath + '/__tests__/img/filterGauss/input/'
    process.env.OUTPUT_FOLDER = rootPath + '/__tests__/img/filterGauss/output/'

    expect(existsSync(outputFolder + 'blurry.png')).toBeFalsy();
    const imageJLoader = new AlgorithmApplier('FilterGauss');
    imageJLoader.runWithConfig();
    expect(existsSync(outputFolder + 'blurry.png')).toBeTruthy();

  });

});
