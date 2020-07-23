import { AlgorithmToRun, IConfigurationApp } from '../../../../src/common/types';
import {EventEmitter} from 'events';
import { AlgorithmApplier } from '../../../../src/algorithmLoader/algorithmApplier/algorithmApplier';

const consoleLog = jest
  .spyOn(console, 'log')
  .mockImplementation((s :string) => {
    return s;
  });

class DummyAlgorithmClass extends AlgorithmToRun {
  start(ij: string): void {
    console.log('some code to execute with the help of out freind ' + ij);
  }
} 

const algorithmDummyClass = new DummyAlgorithmClass('DummyClass');
const mockAlgorithmClassStartFn = jest.spyOn(algorithmDummyClass, 'start')

jest.mock('../../../../src/algorithmLoader/algorithmClassFetcher/algorithmClassFetcher', () => {
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
          event.emit('booting');
          event.emit('ready', 'ImageJObject');
        }

      }})
  }
});

describe('Algorithm Applier', () => {
 
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Upon event ready a dummy code should run', () => {

    const applier = new AlgorithmApplier();
    applier.runWithConfig()
    expect(consoleLog).toBeCalledWith('==> Starting ImageJ');
    expect(mockAlgorithmClassStartFn).toBeCalled();
    expect(consoleLog).toBeCalledWith('some code to execute with the help of out freind ImageJObject');
  });

});
