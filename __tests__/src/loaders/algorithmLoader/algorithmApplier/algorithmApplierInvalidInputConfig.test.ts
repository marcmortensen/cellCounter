import {EventEmitter} from 'events';
import { AlgorithmToRun } from '../../../../../src/algorithms/algorithmToRun';
import { IConfigurationApp } from '../../../../../src/common/types';
import { AlgorithmApplier } from '../../../../../src/loaders/algorithmLoader/algorithmApplier/algorithmApplier';

class DummyAlgorithmClass extends AlgorithmToRun {
  start(ij: string): void {
    console.log('some code to execute with the help of out freind ' + ij);
  }
  hasValidInputConfig():boolean { return false;}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  loadConfig():void {}
} 

const algorithmDummyClass = new DummyAlgorithmClass('DummyClass');
const mockAlgorithmClassStartFn = jest.spyOn(algorithmDummyClass, 'start')
const mockAlgorithmClassHasValidInputConfigFn = jest.spyOn(algorithmDummyClass, 'hasValidInputConfig')
const mockAlgorithmClassLoadConfigFn = jest.spyOn(algorithmDummyClass, 'loadConfig')

jest.mock('../../../../../src/loaders/algorithmLoader/algorithmClassFetcher/algorithmClassFetcher', () => {
  return {
    AlgorithmClassFetcher : jest.fn().mockImplementation(
      () => { return algorithmDummyClass })
  }
});

jest.mock('../../../../../src/loaders/imageJLoader/loader', () => {
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

describe('Algorithm Applier, without the needed algorithmToRun config', () => {
 
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('When it doesnt have the right config it shoudnt run imageJ', () => {

    expect(() => {
      new AlgorithmApplier('foo')
    }).toThrow('foo: Has invalid configuration, please do follow the readme to see what params are expected.');

    expect(mockAlgorithmClassHasValidInputConfigFn).toBeCalled();
    expect(mockAlgorithmClassStartFn).not.toBeCalled();
    expect(mockAlgorithmClassLoadConfigFn).not.toHaveBeenCalled()
  });

});
