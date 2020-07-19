import {ImageJLoader} from '../src/imageJLoader/imageJ';
import { IConfigurationApp } from '../src/common/types';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs'); 
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodeJavaCore = require('java');
import {EventEmitter} from 'events';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const addToClassPath = require('../src/imageJLoader/helper');


interface ImockedImageJClass {
    a: string;
}

describe('ImageJ2 loader', () => {

  let imageJLoader: ImageJLoader;
  beforeEach(() => {
    imageJLoader = new ImageJLoader();
  });

  it('addToClasspath Should search all the jars inside a folder and insert them into nodeJava', () => {

    const mockReaddirSync = jest.spyOn(fs, 'readdirSync');
    mockReaddirSync
      .mockReturnValueOnce(['FolderName_1', 'README.md', 'JWlz-1.4.0.jar'])
      .mockReturnValueOnce(['FolderName_2', 'file.txt', 'OMEVisual-1.1.2.jar'])
      .mockReturnValue(['fooBar-12.1.jar']);

    const mockLastatSync = jest.spyOn(fs, 'lstatSync');

    mockLastatSync.mockImplementation((path: string) => {
      return { 
        isDirectory: (): boolean => { return !path.includes('.');} 
      };
    });

    const pushJarIntoJavaFn = jest.spyOn(nodeJavaCore.classpath, 'push');

    addToClassPath.addToClassPath('/fooPath');
    expect(pushJarIntoJavaFn).toHaveBeenCalledTimes(3);
    expect(pushJarIntoJavaFn).toBeCalledWith('/fooPath/FolderName_1/FolderName_2/fooBar-12.1.jar');
    expect(pushJarIntoJavaFn).toBeCalledWith('/fooPath/FolderName_1/OMEVisual-1.1.2.jar');
    expect(pushJarIntoJavaFn).toBeCalledWith('/fooPath/JWlz-1.4.0.jar');
  });


  it('loadImageJ should throw an emit with the object ImageJLoaded', () => {

    const config: IConfigurationApp = { 
      imageJ:{
        imageJDir: 'fooDirectory'
      }
    };
    addToClassPath.addToClassPath = jest.fn();
    const event = new EventEmitter();

    const eventEmit = jest.spyOn(event, 'emit');
    const javaLangSystemImportedClass = {
      setProperty: () => jest.fn()
    };

    const javaSystem = jest.spyOn(javaLangSystemImportedClass, 'setProperty');

    const dummyImageJClassLoaded: ImockedImageJClass = { 
        a: 'I have successfully loaded the java class imageJ' 
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
    expect(eventEmit).toBeCalledWith('ready', dummyImageJClassLoaded);
  });

});
