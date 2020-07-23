
import {ImageJLoader} from '../../../src/imageJLoader/loader';
import { IConfigurationApp } from '../../../src/common/types';
import {EventEmitter} from 'events';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodeJavaCore = require('java');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const addToClassPath = require('../../../src/imageJLoader/helper');

describe('ImageJ loader', () => {

  let imageJLoader: ImageJLoader;

  beforeEach(() => {
    imageJLoader = new ImageJLoader();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it('loadImageJ should throw an emit with the object ImageJLoaded', () => {

    const config: IConfigurationApp = { 
      imageJ:{
        dir: 'fooDirectory',
        algorithmToRun: 'FooAlgorithm'
      }
    };
    addToClassPath.addToClassPath = jest.fn();
    const event = new EventEmitter();

    const eventEmit = jest.spyOn(event, 'emit');
    const javaLangSystemImportedClass = {
      setProperty: () => jest.fn()
    };

    const javaSystem = jest.spyOn(javaLangSystemImportedClass, 'setProperty');

    const dummyImageJClassLoaded = { 
        foo: 'I have successfully loaded the java class imageJ' 
    };

    const importJavaClassFn = 
      jest.spyOn(nodeJavaCore, 'import')
      .mockReturnValueOnce(javaLangSystemImportedClass)
      .mockReturnValueOnce(() => {return dummyImageJClassLoaded})

    imageJLoader.load(config, event);
    expect(javaSystem).toBeCalledWith('java.awt.headless', 'true')

    expect(importJavaClassFn).toHaveBeenCalledTimes(2);
    expect(importJavaClassFn).toBeCalledWith('java.lang.System');
    expect(importJavaClassFn).toBeCalledWith('net.imagej.ImageJ');

    expect(eventEmit).toHaveBeenCalledTimes(2);
    expect(eventEmit).toBeCalledWith('booting');
    expect(eventEmit).toBeCalledWith('ready', dummyImageJClassLoaded, 'FooAlgorithm');
  });

});
