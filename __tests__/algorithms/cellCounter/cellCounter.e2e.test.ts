import { rootPath as path } from '../../testHelpers/rootPathLoader/rootPathLoader';
import { existsSync } from 'fs';
import { skipTestOnCondition } from '../../testHelpers/skipTestOnCondition';
import { removeDirContents } from '../../testHelpers/removeDirContents';
import { AlgorithmApplier } from '../../../src/loaders/algorithmLoader/algorithmApplier/algorithmApplier';

const rootPath = path();
describe('ImageJ-CellCounter-Run', () => {

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
    removeDirContents(outputFolder + 'csv/');
    removeDirContents(outputFolder);
  })
  
  afterAll(() => {
    process.env = OLD_ENV;
  });


  it('CellCounter should count the cells and return an image with cells numered and a csv with the data', () => {
    
    process.env.INPUT_IMAGE_FOLDER = rootPath + '/__tests__/img/cellCounter/input/4CellsWithNoise/'
    process.env.OUTPUT_FOLDER = rootPath + '/__tests__/img/cellCounter/output/'

    const imageJLoader = new AlgorithmApplier('CellCounter');
    imageJLoader.runWithConfig();

    expect(existsSync(outputFolder + '4_cellsWithNoise.png')).toBeTruthy();
    expect(existsSync(outputFolder + 'csv/cellsWithNoise.csv')).toBeTruthy();

  });

});
