
jest.mock('../../../src/loaders/algorithmLoader/algorithmApplier/algorithmApplier', () => {
  return {
    AlgorithmApplier : jest.fn().mockImplementation(
      () => { return {
        runWithConfig(): void { 
            console.log('AlgorithmApplier.runWithConfig() was called'); 
        }
    }})
  }
});

describe('Main', () => {
 
  beforeEach(() => {
    console.log = jest.fn(log => {
      return log;
    });
  })

  afterEach(() => {
    jest.clearAllMocks();
  });
    
  it('runWithConfig should be run when executing main.ts', () => {
      
    require('../../../src/main');
    expect(console.log).toBeCalledWith('AlgorithmApplier.runWithConfig() was called');
  });

});
