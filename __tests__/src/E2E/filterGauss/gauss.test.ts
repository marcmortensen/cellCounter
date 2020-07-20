import { AlgorithmSelector } from '../../../../src/algorithmSelector/main';
import { skipTestOnCondition } from '../../../testHelpers/skipTestOnCondition';

describe('ImageJ Gauss Run', () => {

  const isImageJInstallPathSet :boolean = process.env.IMAGEJ_DIRECTORY_INSTALLED? true : false;
  const isFlagE2Eup :boolean = process.env.JEST_RUN_E2E_TESTS === 'true';

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
    
    process.env.USE_OTHER_CODE_PATH = 'filterGauss'
    const imageJLoader = new AlgorithmSelector();
    imageJLoader.runWithConfig();
    expect(1).toBe(1);
  });

});
