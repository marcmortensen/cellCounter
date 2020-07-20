import { AlgorithmApplier } from "../../../../src/algorithm/algorithmApplier/algorithmApplier";


describe('Algorithm Applier', () => {

  let applier: AlgorithmApplier;
  beforeEach(() => {

    applier = new AlgorithmApplier();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it('Upon event ready a dummy code should run', () => {

    expect(1).toBe(1);
  });

});
