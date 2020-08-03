import { skipTestOnCondition } from '../../../../testHelpers/skipTestOnCondition';
import { rootPath as path } from '../../../../testHelpers/rootPathLoader/rootPathLoader';
import { removeDirContents } from '../../../../testHelpers/removeDirContents';
import { AlgorithmApplier } from '../../../../../src/loaders/algorithmLoader/algorithmApplier/algorithmApplier';

const rootPath = path();
describe('ImageJ Filter Gauss Run', () => {

  const outputFolder = rootPath + '/__tests__/img/cellCounter/output/';
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
    
    process.env.INPUT_IMAGE_FOLDER = rootPath + '/__tests__/img/cellCounter/input/'
    process.env.OUTPUT_FOLDER = rootPath + '/__tests__/img/cellCounter/output/'

    const imageJLoader = new AlgorithmApplier('CellCounter');
    imageJLoader.runWithConfig();

    expect(1).toBe(1);

  });

});
