import { AlgorithmClassFetcher } from '../algorithmClassFetcher';
import { testFooAlgorithmClass } from '../../../../../__tests__/testHelpers/types/algorithmClassFetcherTypes';
import { AlgorithmToRun } from '../../../../algorithms/algorithmToRun';

jest.mock('../algorithmClassRepository', () => {

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const algorithmToRun = require('../../../../algorithms/algorithmToRun');
  class testFooAlgorithmClass extends algorithmToRun.AlgorithmToRun {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    start(_ij: string): void {
      throw new Error('Method not implemented.');
    }
  }
  return {
    classes: {testFooAlgorithmClass}
  }
});

describe('AlgorithmClassFetcher testing with classes extending from AlgorithmToRun', () => {

  let classFetcher: AlgorithmClassFetcher;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the expected algorithmToRun class by the class string name given', () => {
    classFetcher = new AlgorithmClassFetcher('testFooAlgorithmClass', 'fooName');
    expect(classFetcher).toBeInstanceOf( AlgorithmToRun )
    expect(classFetcher).toEqual(new testFooAlgorithmClass('fooName'));
  });

});
