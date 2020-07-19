/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

const start = (ij: any) :void => {
    const source = '/home/marcm/Documents/Projects/imageJ/cellCounter/__tests__/img/clown.jpg';
    console.log('==> Loading image: ' + source);
    const dataset = ij.io().open(source);
    console.log('==> Processing image');
    const filtered = ij.op().run('filter.gauss', dataset, [8, 10, 1]);
    const outPath = 'blurry-clown.png';
    console.log('==> Saving image: ' + outPath);
    ij.scifio().datasetIO().save(filtered, outPath);
    console.log('==> Goodbye!');
    ij.context().dispose();
  }

  export {start};


