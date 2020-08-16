import { EventEmitter } from 'events';
import { ImageJLoader } from '../loader';
import { IConfigurationApp } from '../../../common/types';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodeJavaCore = require('java');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const addToClassPath = require('../helper');

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
      imageJ: {
        dir: 'fooDirectory',
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
    expect(eventEmit).toBeCalledWith('ready', dummyImageJClassLoaded, nodeJavaCore);
  });

  it('loadImageJ should throw an error if cant load java class imageJ', () => {

    const config: IConfigurationApp = { 
      imageJ: {
        dir: 'fooDirectory',
      }
    };
    addToClassPath.addToClassPath = jest.fn();
    const event = new EventEmitter();

    const eventEmit = jest.spyOn(event, 'emit');
    const javaLangSystemImportedClass = {
      setProperty: () => jest.fn()
    };

    const javaSystem = jest.spyOn(javaLangSystemImportedClass, 'setProperty');

    const importJavaClassFn = jest.spyOn(nodeJavaCore, 'import')
      .mockReturnValueOnce(javaLangSystemImportedClass)
      .mockImplementation(() => {throw new Error('cant load imageJ java class')});

    expect(() => {
      imageJLoader.load(config, event)
    }).toThrow('IMAGEJ_DIRECTORY_INSTALLED path on config did not lead to a valid folder where imageJ is installed');

    expect(javaSystem).toBeCalledWith('java.awt.headless', 'true')

    expect(importJavaClassFn).toHaveBeenCalledTimes(2);
    expect(importJavaClassFn).toBeCalledWith('java.lang.System');

    expect(eventEmit).toBeCalledWith('booting');
    expect(eventEmit).toHaveBeenCalledTimes(1);
  });
  
});
