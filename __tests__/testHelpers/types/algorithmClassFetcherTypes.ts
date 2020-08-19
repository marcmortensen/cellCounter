import { AlgorithmToRun } from '../../../src/algorithms/algorithmToRun';
import { IImageJ } from '../../../src/common/imageJTypes';

export class testFooAlgorithmClass extends AlgorithmToRun {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  start(_ij: IImageJ): void {
    throw new Error("Method not implemented.");
  }
}