import { IConfigurationApp } from './common/types';
import {ImageJLoader} from "./imageJLoader/loader"
import {EventEmitter} from 'events';


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

  const gauss = await import('../src/filterGauss/main');
  gauss.start(ij);

})

const imageJLoader = new ImageJLoader();
imageJLoader.load(config, event);