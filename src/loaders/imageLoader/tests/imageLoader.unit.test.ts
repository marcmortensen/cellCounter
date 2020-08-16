import { loadImagesFromPath } from '../imageLoader';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs'); 

describe('Testing loading image path function', () => {
  
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it('loadImagesFromPath should search all the imgs inside a folder return their path', () => {

    const mockReaddirSync = jest.spyOn(fs, 'readdirSync');
    mockReaddirSync
      .mockReturnValueOnce(['FolderName_1', 'image3.jpeg', 'image4.jpg'])
      .mockReturnValueOnce(['FolderName_2', 'file.txt', 'image2.tif'])
      .mockReturnValue(['image1.png']);

    const mockLastatSync = jest.spyOn(fs, 'lstatSync');

    mockLastatSync.mockImplementation((path: string) => {
      return { 
        isDirectory: (): boolean => { return !path.includes('.');} 
      };
    });

    expect(loadImagesFromPath('/fooPath')).toEqual([
      '/fooPath/FolderName_1/FolderName_2/image1.png',
      '/fooPath/FolderName_1/image2.tif',
      '/fooPath/image3.jpeg',
      '/fooPath/image4.jpg'
    ]);
  });

});
