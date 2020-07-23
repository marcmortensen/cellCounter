import { AlgorithmToRun, IConfigurationApp } from '../../../../src/common/types';
import {EventEmitter} from 'events';
import { AlgorithmApplier } from '../../../../src/algorithmLoader/algorithmApplier/algorithmApplier';

class DummyAlgorithmClass extends AlgorithmToRun {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  start(_: string): void {
    throw new Error('An error was thrown on the start method!');
  }
} 

const consoleSpy = jest
  .spyOn(console, 'error')
  .mockImplementation((s :Error) => {
    return s.message;
  });

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
          event.emit('ready', 'ImageJObject')
        }

      }})
  }
});

describe('Algorithm Applier when algortihmClassFetcher fails', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });
 
  it('Should catch exeception and display it', () => {

    const applier = new AlgorithmApplier();
    applier.runWithConfig()
    expect(mockAlgorithmClassStartFn).toBeCalled();
    expect(mockAlgorithmClassStartFn).toThrowError('An error was thrown on the start method!');
    expect(consoleSpy).toReturnWith('An error was thrown on the start method!');
  });

});
