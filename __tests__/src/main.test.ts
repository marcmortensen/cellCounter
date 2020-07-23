
const consoleLog = jest.spyOn(console, 'log')
    .mockImplementation((s :string) => {
        return s;
    });

jest.mock('../../src/algorithmLoader/algorithmApplier/algorithmApplier', () => {
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
 
  afterEach(() => {
    jest.clearAllMocks();
  });
    
  it('runWithConfig should be run when executing main.ts', () => {
      
    require('../../src/main');
    expect(consoleLog).toBeCalledWith('AlgorithmApplier.runWithConfig() was called');
  });

});
