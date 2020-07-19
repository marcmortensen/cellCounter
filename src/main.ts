import { IConfigurationApp } from './common/types';
import {ImageJLoader} from "./imageJLoader/imageJ"
import {EventEmitter} from 'events';


const config: IConfigurationApp = { 
  imageJ:{
    imageJDir: '/home/marcm/Documents/Projects/imageJ/fiji-linux64'
  }
};

console.log('==> Starting ImageJ')
const event = new EventEmitter();


event.on('booting', () => {
  console.log('starting Fiji!');
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
event.on('ready', (ij : any) =>  {

  const source = '/home/marcm/Documents/Projects/imageJ/cellCounter/img/clown.jpg';
  console.log('==> Loading image: ' + source);
  const dataset = ij.io().open(source);
  console.log('==> Processing image');
  const filtered = ij.op().run('filter.gauss', dataset, [8, 10, 1]);
  const outPath = 'blurry-clown.png';
  console.log('==> Saving image: ' + outPath);
  ij.scifio().datasetIO().save(filtered, outPath);
  console.log('==> Goodbye!');
  ij.context().dispose();

})

const imageJLoader = new ImageJLoader();
imageJLoader.load(config, event);