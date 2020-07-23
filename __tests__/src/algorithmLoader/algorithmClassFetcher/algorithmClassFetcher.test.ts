import { AlgorithmToRun } from '../../../../src/common/types';
import { AlgorithmClassFetcher } from '../../../../src/algorithmLoader/algorithmClassFetcher/algorithmClassFetcher';
import { FilterGauss } from '../../../../src/algorithms/filterGauss/filterGauss';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const loadImagesFromPath = require('../../../../src/imageLoader/imageLoader');

describe('AlgorithmClass Fetcher testing', () => {

  let classFetcher: AlgorithmClassFetcher;

  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the Gauss expected class', () => {

    loadImagesFromPath.loadImagesFromPath = jest.fn().mockReturnValue(['/foo/a', 'baz/b']);

    process.env.OUTPUT_FOLDER = 'foo/fodler';

    classFetcher = new AlgorithmClassFetcher('FilterGauss', 'FilterGauss');
    expect( classFetcher ).toBeInstanceOf( FilterGauss )
    expect( classFetcher ).toBeInstanceOf( AlgorithmToRun )
    expect( classFetcher ).toStrictEqual(new FilterGauss('FilterGauss'))
    expect( (classFetcher as FilterGauss).config.inputImagesPath).toStrictEqual(['/foo/a', 'baz/b'])
    expect( (classFetcher as FilterGauss).config.outputPath).toStrictEqual('foo/fodler')
  });

  it('should return the Gauss expected with outpath defined', () => {

    loadImagesFromPath.loadImagesFromPath = jest.fn().mockReturnValue([]);
    process.env.OUTPUT_FOLDER = undefined;

    classFetcher = new AlgorithmClassFetcher('FilterGauss', 'FilterGauss');
    expect( classFetcher ).toBeInstanceOf( FilterGauss )
    expect( classFetcher ).toBeInstanceOf( AlgorithmToRun )
    expect( classFetcher ).toStrictEqual(new FilterGauss('FilterGauss'))
    expect( (classFetcher as FilterGauss).config.inputImagesPath).toStrictEqual([])
    expect( (classFetcher as FilterGauss).config.outputPath).toStrictEqual('')
  });

});
