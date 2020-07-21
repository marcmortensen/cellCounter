/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { AlgorithmApplier } from "../../../../src/algorithm/algorithmApplier/algorithmApplier";
import { AlgorithmToRun, IConfigurationApp } from '../../../../src/common/types';
import {EventEmitter} from 'events';

class DummyAlgorithmClass extends AlgorithmToRun {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  start(ij: string): void {
    console.log('some code to execute with the help of out freind ' + ij);
  }
} 

const algorithmDummyClass = new DummyAlgorithmClass('DummyClass');
const mockAlgorithmClassStartFn = jest.spyOn(algorithmDummyClass, 'start')

jest.mock('../../../../src/algorithm/algorithmClassFetcher/algorithmClassFetcher', () => {
  return {
    AlgorithmClassFetcher : jest.fn().mockImplementation(
      () => { return algorithmDummyClass })
  }
});

jest.mock('../../../../src/imageJLoader/loader', () => {
  return {
    ImageJLoader : jest.fn().mockImplementation(
      () => { return  {
        load(_config: IConfigurationApp, event: EventEmitter): void {
          
          event.emit('booting')
          event.emit('ready', 'ImageJObject')
        }

      }})
  }
});



describe('Algorithm Applier', () => {

  let applier: AlgorithmApplier;
  beforeEach(() => {

    //applier = new AlgorithmApplier();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it('Upon event ready a dummy code should run', () => {

    applier = new AlgorithmApplier();
    applier.runWithConfig()
    expect(mockAlgorithmClassStartFn).toBeCalled();
  });

});
