import { IConfigurationApp } from './common/types';
import ImageJ = require("./imageJ")


const config: IConfigurationApp = { 
  imageJ:{
    headless: true,
    imageJDir: '/home/marcm/Documents/Projects/imageJ/fiji-linux64/Fiji.app'
  }
};

console.log('==> Starting ImageJ')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const imagej = ImageJ(config)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
imagej.on('ready', function(ij : any) {
  const source = 'https://imagej.net/images/clown.jpg'
  console.log('==> Loading image: ' + source)
  const dataset = ij.io().open(source)
  console.log('==> Processing image')
  const filtered = ij.op().run('filter.gauss', dataset, [8, 10, 1])
  const outPath = 'blurry-clown.png'
  console.log('==> Saving image: ' + outPath)
  ij.scifio().datasetIO().save(filtered, outPath)
  console.log('==> Goodbye!')
  ij.context().dispose()
})