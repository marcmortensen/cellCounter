import { EventEmitter } from 'events';
import { AlgorithmToRun } from '../../../../../src/algorithms/algorithmToRun';
import { IConfigurationApp } from '../../../../../src/common/types';
import { AlgorithmApplier } from '../../../../../src/loaders/algorithmLoader/algorithmApplier/algorithmApplier';
import { IImageJ } from '../../../../../src/common/imageJTypes';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const loadImagesFromPath = require('../../../../../src/loaders/imageLoader/imageLoader');

loadImagesFromPath.loadImagesFromPath = jest.fn().mockReturnValue([]);

class DummyAlgorithmClass extends AlgorithmToRun {
  start(ij: IImageJ): void {
    console.log('some code to execute with the help of out freind ' + ij);
  }
  hasValidInputConfig():boolean { return true;}

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

describe('Algorithm Applier, with all the needed algorithToRun config!', () => {
 
  beforeEach( () => {
    console.log = jest.fn(log => {
      return log;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Upon event ready the code should run', () => {

    const applier = new AlgorithmApplier('foo');
    applier.runWithConfig()
    expect(console.log).toBeCalledWith('==> Starting ImageJ');
    expect(mockAlgorithmClassHasValidInputConfigFn).toBeCalled();
    expect(mockAlgorithmClassLoadConfigFn).toBeCalled();
    expect(mockAlgorithmClassStartFn).toBeCalled();
    expect(console.log).toBeCalledWith('some code to execute with the help of out freind ImageJObject');
  });

});
