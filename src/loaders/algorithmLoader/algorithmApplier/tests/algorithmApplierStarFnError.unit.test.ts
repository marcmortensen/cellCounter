import { EventEmitter } from 'events';
import { AlgorithmToRun } from '../../../../algorithms/algorithmToRun';
import { IConfigurationApp } from '../../../../common/types';
import { AlgorithmApplier } from '../algorithmApplier';
import { IImageJ } from '../../../../common/imageJTypes';

class DummyAlgorithmClass extends AlgorithmToRun {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  start(_ij: IImageJ): void {
    throw new Error('An error was thrown on the start method!');
  }

  hasValidInputConfig(): boolean { return true;}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  loadConfig(): void {}
} 

const algorithmDummyClass = new DummyAlgorithmClass('DummyClass');
const mockAlgorithmClassStartFn = jest.spyOn(algorithmDummyClass, 'start')

jest.mock('../../../../../src/loaders/algorithmLoader/algorithmClassFetcher/algorithmClassFetcher', () => {
  return {
    AlgorithmClassFetcher: jest.fn().mockImplementation(
      () => { return algorithmDummyClass })
  }
});

jest.mock('../../../../../src/loaders/imageJLoader/loader', () => {
  return {
    ImageJLoader : jest.fn().mockImplementation(
      () => { 
        return  {
          load(_config: IConfigurationApp, event: EventEmitter): void {
            event.emit('ready', 'ImageJObject');
          }
        }})
  }
});

describe('Algorithm applier when start fails', () => {

  beforeEach( () => {
    console.error = jest.fn(err => {
      return err.message;
    });
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });
 
  it('If an expection is thrown in the start function it should be catched and displayed', () => {

    const applier = new AlgorithmApplier('foo');
    applier.runWithConfig()
    expect(mockAlgorithmClassStartFn).toBeCalled();
    expect(mockAlgorithmClassStartFn).toThrowError('An error was thrown on the start method!');
    expect(console.error).toReturnWith('An error was thrown on the start method!');
  });

});
