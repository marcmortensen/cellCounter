import { IConfigRun } from '../../../../src/common/types';
import { FilterGauss } from '../../../../src/algorithms/filterGauss/filterGauss';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const loadImagesFromPath = require('../../../../src/loaders/imageLoader/imageLoader');

describe('Testing FilterGauss class behaviour', () => {
  
  let algorithmToRun: FilterGauss;
  
  const OLD_ENV = process.env;

  beforeEach(() => {
    algorithmToRun = new FilterGauss('FooAlgorithm');
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
    expect(algorithmToRun.hasValidInputConfig()).toBeTruthy();
  });

  it('hasValidInputConfig has invalid config, missing input folder', () => {
    process.env.INPUT_IMAGE_FOLDER=''
    process.env.OUTPUT_FOLDER='/foo/output/folder'
    expect(algorithmToRun.hasValidInputConfig()).toBeFalsy();
  });

  it('hasValidInputConfig has invalid config, missing output folder', () => {
    process.env.INPUT_IMAGE_FOLDER='/foo/input/folder'
    process.env.OUTPUT_FOLDER=''
    expect(algorithmToRun.hasValidInputConfig()).toBeFalsy();
  });

  it('hasValidInputConfig has invalid config, missing output folder and input folder', () => {
    process.env.INPUT_IMAGE_FOLDER=''
    process.env.OUTPUT_FOLDER=''
    expect(algorithmToRun.hasValidInputConfig()).toBeFalsy();
  });

  it('loadconfig should load the expected data', () => {
    loadImagesFromPath.loadImagesFromPath = jest.fn().mockReturnValue(['../image1.png', '../image2.png']);

    process.env.INPUT_IMAGE_FOLDER='/foo/input/folder';
    process.env.OUTPUT_FOLDER='/foo/output/folder';

    const exepctedConfig: IConfigRun = { 
      inputImagesPath: ['../image1.png', '../image2.png'],
      outputPath: '/foo/output/folder'
    };

    algorithmToRun.loadConfig();
    expect(algorithmToRun.config).toEqual(exepctedConfig);
  });


   
});
