jest.mock('../../../src/loaders/algorithmLoader/algorithmApplier/algorithmApplier', () => {
  return {
    AlgorithmApplier : jest.fn().mockImplementation(
      () => { return {
        runWithConfig(): void { 
            throw new Error('some error on the runWithConfig method in AlgorithmApplier') 
        }
    }})
  }
});

describe('Main AlgorithmApplier fails on runWithConfig', () => {

  beforeEach( () => {
    console.error = jest.fn(error => {
      return error.message;
    });
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });
    
  it('if runWithConfig throws an execption it should be catcehd and displayed', () => {

    require('../../../src/main');
    expect(console.error).toReturnWith('some error on the runWithConfig method in AlgorithmApplier');
  });

});
