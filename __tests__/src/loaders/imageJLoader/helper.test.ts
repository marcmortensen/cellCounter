import { addToClassPath } from '../../../../src/loaders/imageJLoader/helper';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs'); 
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodeJavaCore = require('java');

describe('Testing helping function used when loading imageJ', () => {
  
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it('addToClasspath should search all the jars inside a folder and insert them into nodeJava', () => {

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

    addToClassPath('/fooPath');
    expect(pushJarIntoJavaFn).toHaveBeenCalledTimes(3);
    expect(pushJarIntoJavaFn).toBeCalledWith('/fooPath/FolderName_1/FolderName_2/fooBar-12.1.jar');
    expect(pushJarIntoJavaFn).toBeCalledWith('/fooPath/FolderName_1/OMEVisual-1.1.2.jar');
    expect(pushJarIntoJavaFn).toBeCalledWith('/fooPath/JWlz-1.4.0.jar');
  });

});
