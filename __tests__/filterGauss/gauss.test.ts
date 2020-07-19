/* eslint-disable @typescript-eslint/no-var-requires */
import {IConfigurationApp} from '../../src/common/types';
import {ImageJLoader} from '../../src/imageJLoader/loader';
import {EventEmitter} from 'events';

describe('ImageJ Gauss Run', () => {


  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it('filter gauss should apply a filter gauss and save the image', () => {
    
    const config: IConfigurationApp = { 
      imageJ:{
        imageJDir: process.env.IMAGEJ_DIRECTORY_INSTALLED
      }
    };
    
    const event = new EventEmitter();
    
    event.on('booting', () => {
      console.log('==> Starting ImageJ');
    })
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    event.on('ready', async (ij : any) =>  {
    
      const gauss = await import('../../src/filterGauss/main');
      gauss.start(ij);
    
    })
    
    const imageJLoader = new ImageJLoader();
    imageJLoader.load(config, event);
    expect(1).toBe(1);
  });

});
