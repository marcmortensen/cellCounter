import { AlgorithmClassFetcher } from '../../../../../src/loaders/algorithmLoader/algorithmClassFetcher/algorithmClassFetcher';

jest.mock('../../../../../src/loaders/algorithmLoader/algorithmClassFetcher/algorithmClassRepository', () => {
  class testFooAlgorithmClass {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    start(_ij: string): void {
      throw new Error("Method not implemented.");
    }
  }
  return {
    classes : {testFooAlgorithmClass}
  }
});

describe('AlgorithmClassFetcher testing fails', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error when the loaded class doesnt extend from AlgorithmToRun', () => {

    expect(() => {
      new AlgorithmClassFetcher('testFooAlgorithmClass', 'fooName')
    }).toThrow('All classes from algorithmClassRepository must extend from AlgorithmToRun');

  });

  it('should throw an error when the stringNameClas is empty', () => {

    expect(() => {
      new AlgorithmClassFetcher('', 'fooName')
    }).toThrow('No algorithm to run was specified in the config!');

  });

  it('should throw an error when the stringNameClas is not found on the algorithmClassRepository', () => {

    expect(() => {
      new AlgorithmClassFetcher('fooName', 'fooName')
    }).toThrow('Algorothm to run: fooName was not found in algorithmClassRepository.ts, either the name on the config is wrong or you forgot to add the new class!');

  });

});
