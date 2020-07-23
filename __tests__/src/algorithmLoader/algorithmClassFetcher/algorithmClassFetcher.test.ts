import { AlgorithmToRun } from '../../../../src/common/types';
import { AlgorithmClassFetcher } from '../../../../src/algorithmLoader/algorithmClassFetcher/algorithmClassFetcher';
import { FilterGauss } from '../../../../src/algorithms/filterGauss/filterGauss';

describe('AlgorithmClass Fetcher testing', () => {

  let classFetcher: AlgorithmClassFetcher;
  
  it('should return the Gauss expected class', () => {

    classFetcher = new AlgorithmClassFetcher('FilterGauss', 'FilterGauss');
    expect( classFetcher ).toBeInstanceOf( FilterGauss )
    expect( classFetcher ).toBeInstanceOf( AlgorithmToRun )
    expect( classFetcher ).toStrictEqual(new FilterGauss('FilterGauss'))
  });

});
