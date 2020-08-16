import { IConfigRun, ICellFilter } from '../../../common/types';
import { CellCounter } from '../cellCounter';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const loadImagesFromPath = require('../../../../src/loaders/imageLoader/imageLoader');

describe('Testing CellCounter class behaviour', () => {
  
  let algorithmToRun: CellCounter;
  
  const OLD_ENV = process.env;

  beforeEach(() => {
    algorithmToRun = new CellCounter('FooAlgorithm');
    process.env = { ...OLD_ENV };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  
  afterAll(() => {
    process.env = OLD_ENV;
  });
  
  it('hasValidInputConfig has valid config', () => {
    process.env.INPUT_IMAGE_FOLDER='/foo/input/folder'
    process.env.OUTPUT_FOLDER='/foo/output/folder'
    process.env.THRESHOLD_ALGORITHM_NAME='Huang2'

    expect(algorithmToRun.hasValidInputConfig()).toBeTruthy();
  });

  it('hasValidInputConfig has invalid config, missing input folder', () => {
    process.env.INPUT_IMAGE_FOLDER=''
    process.env.OUTPUT_FOLDER='/foo/output/folder'
    process.env.THRESHOLD_ALGORITHM_NAME='Huang2'
    expect(algorithmToRun.hasValidInputConfig()).toBeFalsy();
  });

  it('hasValidInputConfig has invalid config, missing output folder', () => {
    process.env.INPUT_IMAGE_FOLDER='/foo/input/folder'
    process.env.OUTPUT_FOLDER=''
    process.env.THRESHOLD_ALGORITHM_NAME='Huang2'
    expect(algorithmToRun.hasValidInputConfig()).toBeFalsy();
  });

  it('hasValidInputConfig has invalid config, missing algortihm to use', () => {
    process.env.INPUT_IMAGE_FOLDER='/foo/input/folder'
    process.env.OUTPUT_FOLDER='/foo/output/folder'
    process.env.THRESHOLD_ALGORITHM_NAME=''
    expect(algorithmToRun.hasValidInputConfig()).toBeFalsy();
  });

  it('hasValidInputConfig has invalid config, erron on algortihm name to use', () => {
    process.env.INPUT_IMAGE_FOLDER='/foo/input/folder'
    process.env.OUTPUT_FOLDER='/foo/output/folder'
    process.env.THRESHOLD_ALGORITHM_NAME='fooName'
    expect(algorithmToRun.hasValidInputConfig()).toBeFalsy();
  });

  it('hasValidInputConfig has invalid config, missing output folder and input folder', () => {
    process.env.INPUT_IMAGE_FOLDER=''
    process.env.OUTPUT_FOLDER=''
    process.env.THRESHOLD_ALGORITHM_NAME=''
    expect(algorithmToRun.hasValidInputConfig()).toBeFalsy();
  });

  it('loadconfig should load the expected data', () => {
    loadImagesFromPath.loadImagesFromPath = jest.fn().mockReturnValue(['../image1.png', '../image2.png']);

    process.env.INPUT_IMAGE_FOLDER='/foo/input/folder';
    process.env.OUTPUT_FOLDER='/foo/output/folder';
    process.env.FILTER_MIN_SIZE=null;
    process.env.FILTER_MAX_SIZE=null;
    process.env.FILTER_MIN_CIRCULARITY=null;
    process.env.FILTER_MAX_CIRCULARITY=null;
    process.env.FILTER_GAUSS_SIGMA=null;

    const exepctedConfig: IConfigRun = { 
      inputImagesPath: ['../image1.png', '../image2.png'],
      outputPath: '/foo/output/folder'
    };

    const expectedFilters: ICellFilter = { 
      gaussSigma:3,
      minSize:0,
      maxSize:10000000,
      minCircularity:0.0,
      maxCircularity:1.0
    };

    algorithmToRun.loadConfig();
    expect(algorithmToRun.config).toEqual(exepctedConfig);
    expect(algorithmToRun.filters).toEqual(expectedFilters);
  });

  it('loadconfig should load the expected data, cell filters', () => {
    loadImagesFromPath.loadImagesFromPath = jest.fn().mockReturnValue(['../image1.png', '../image2.png']);

    process.env.INPUT_IMAGE_FOLDER='/foo/input/folder';
    process.env.OUTPUT_FOLDER='/foo/output/folder';
    process.env.FILTER_MIN_SIZE='10';
    process.env.FILTER_MAX_SIZE='11';
    process.env.FILTER_MIN_CIRCULARITY='12';
    process.env.FILTER_MAX_CIRCULARITY='13';
    process.env.FILTER_GAUSS_SIGMA='14';


    const expectedFilters: ICellFilter = { 
      minSize:10,
      maxSize:11,
      minCircularity:12,
      maxCircularity:13,
      gaussSigma: 14
    };

    algorithmToRun.loadConfig();
    expect(algorithmToRun.filters).toEqual(expectedFilters);
  });

});
