jest.mock('../loaders/algorithmLoader/algorithmApplier/algorithmApplier', () => {
  return {
    AlgorithmApplier : jest.fn().mockImplementation(
      () => { 
        throw new Error('some error on the creation of AlgorithmApplier');
      }
    )
  }
});

describe('new AlgorithmApplier fails on main', () => {

  beforeEach( () => {
    console.error = jest.fn(error => {
      return error.message;
    });
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('if new AlgorithmApplier fails it should be captured and displayed', () => {

    require('../main');
    expect(console.error).toReturnWith('some error on the creation of AlgorithmApplier');
  });

});
