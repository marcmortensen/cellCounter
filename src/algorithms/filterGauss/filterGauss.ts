
import { AlgorithmToRun } from '../algorithmToRun';

export class FilterGauss extends AlgorithmToRun {

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  start(ij: any): void {

      this.config.inputImagesPath.forEach((pathImage) => {
        const source = pathImage;
        console.log('==> Loading image: ' + source);
        const dataset = ij.io().open(source);
        console.log('==> Processing image');
        const filtered = ij.op().run('filter.gauss', dataset, [8, 10, 1]);
        const out = this.config.outputPath +'blurry-clown.png';
        console.log('==> Saving image: ' + out);
        ij.scifio().datasetIO().save(filtered, out);
        console.log('==> Goodbye!');
        ij.context().dispose();
      });
  }

}


