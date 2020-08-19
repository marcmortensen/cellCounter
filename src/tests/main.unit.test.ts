
jest.mock('../loaders/algorithmLoader/algorithmApplier/algorithmApplier', () => {
  return {
    AlgorithmApplier : jest.fn().mockImplementation(
      () => { return {
        runWithConfig(): void { 
            console.log('AlgorithmApplier.runWithConfig() was called'); 
        }
    }})
  }
});

describe('Main success execution', () => {
 
  beforeEach(() => {
    console.log = jest.fn(log => {
      return log;
    });
  })

  afterEach(() => {
    jest.clearAllMocks();
  });
    
  it('runWithConfig should be run when executing main.ts', () => {
      
    require('../main');
    expect(console.log).toBeCalledWith('AlgorithmApplier.runWithConfig() was called');
  });

});
