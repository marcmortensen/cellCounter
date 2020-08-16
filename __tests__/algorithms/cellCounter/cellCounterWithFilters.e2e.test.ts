import { rootPath as path } from '../../testHelpers/rootPathLoader/rootPathLoader';
import { existsSync } from 'fs';
import { skipTestOnCondition } from '../../testHelpers/skipTestOnCondition';
//import { removeDirContents } from '../../testHelpers/removeDirContents';

const rootPath = path();
describe('ImageJ-CellCounter-Run', () => {

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
  
  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('CellCounter should count the cells applying the filters', () => {
    
    process.env.INPUT_IMAGE_FOLDER = rootPath + '/__tests__/img/cellCounter/input/4CellsWithoutNoise/';
    process.env.OUTPUT_FOLDER = rootPath + '/__tests__/img/cellCounter/output/s2/';
    process.env.FILTER_MIN_SIZE = '1800';
    process.env.IMAGEJ_RUN_ALGORITHM = 'CellCounter';
    process.env.THRESHOLD_ALGORITHM_NAME = 'Huang2';
    process.env.FILTER_GAUSS_SIGMA = '3';


    require('../../../src/main');
    
    expect(existsSync(rootPath + '/__tests__/img/cellCounter/output/s2/3_cells.png')).toBeTruthy();
    expect(existsSync(rootPath + '/__tests__/img/cellCounter/output/s2/csv/cells.csv')).toBeTruthy();

    //removeDirContents(rootPath + '/__tests__/img/cellCounter/output/s2/csv');
    //removeDirContents(rootPath + '/__tests__/img/cellCounter/output/s2')

  });

});
