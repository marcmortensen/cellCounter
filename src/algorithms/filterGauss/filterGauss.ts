
import { AlgorithmToRun } from '../algorithmToRun';
import { mkdirSync } from 'fs';

export class FilterGauss extends AlgorithmToRun {

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  start(ij: any): void {

      this.config.inputImagesPath.forEach((pathImage) => {
        const source = pathImage;
        console.log('==> Loading image: ' + source);
        const dataset = ij.io().open(source);
        console.log('==> Processing image');
        const filtered = ij.op().run('filter.gauss', dataset, [8, 10, 1]);
        mkdirSync(this.config.outputPath , { recursive: true });
        const out = this.config.outputPath + 'blurry.png';
        console.log('==> Saving image: ' + out);
        ij.scifio().datasetIO().save(filtered, out);
        console.log('==> Goodbye!');
        ij.context().dispose();
      });
  }

}


