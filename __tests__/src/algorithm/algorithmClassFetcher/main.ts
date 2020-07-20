import AlgorithmClassFetcher from '../../../../src/algorithm/algorithmClassFetcher/algorithmClassFetcher';
import { FilterGauss } from '../../../../src/algorithm/algorithms/filterGauss/filterGauss';
import { AlgorithmToRun } from '../../../../src/common/types';

describe('AlgorithmClass Fetcher testing', () => {

  let classFetcher: AlgorithmClassFetcher;
  
  it('should return the Gauss expected class', () => {

    classFetcher = new AlgorithmClassFetcher('FilterGauss', 'FilterGauss');
    expect( classFetcher ).toBeInstanceOf( FilterGauss )
    expect( classFetcher ).toBeInstanceOf( AlgorithmToRun )
    expect( classFetcher ).toStrictEqual(new FilterGauss('FilterGauss'))
  });

});
